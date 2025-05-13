const express = require('express');
const { connectToDb, getDb } = require('../db');
const cors = require('cors');
const { createServer } = require('@vercel/node');

let cachedDb = null;

const app = express();
app.use(express.json());

const corsConfig = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};
app.use(cors(corsConfig));
app.options('*', cors(corsConfig));

async function getDbConnection() {
  if (cachedDb) return cachedDb;

  return new Promise((resolve, reject) => {
    connectToDb((err) => {
      if (err) return reject(err);
      cachedDb = getDb();
      resolve(cachedDb);
    });
  });
}

app.get('/', async (req, res) => {
  const db = await getDbConnection();
  const spis = [];
  db.collection('SPIs')
    .find()
    .sort({ spi: 1 })
    .forEach((doc) => spis.push(doc))
    .then(() => res.status(200).json(spis))
    .catch(() => res.status(500).json({ error: 'Could not fetch the data' }));
});

app.get('/branches/:branch/:sem', async (req, res) => {
  const db = await getDbConnection();
  const { branch, sem } = req.params;
  let credits = [];
  let names = [];
  let previousTotalCredits = 0;

  db.collection(branch.toUpperCase())
    .find({ Semester: { $lte: sem } })
    .sort({ CourseNo: 1 })
    .forEach((doc) => {
      if (doc.Semester === sem) {
        credits.push(doc.Credits);
        names.push(doc.CourseNo);
      } else {
        previousTotalCredits += doc.Credits;
      }
    })
    .then(() => res.status(200).json({ credits, names, previousTotalCredits }))
    .catch(() => res.status(500).json({ error: 'Could not fetch the data' }));
});

app.post('/', async (req, res) => {
  const db = await getDbConnection();
  const spi = req.body;
  db.collection('SPIs')
    .insertOne(spi)
    .then(() => res.status(201).json(spi))
    .catch(() => res.status(500).json({ error: 'Could not create the SPI' }));
});

app.post('/feedback', async (req, res) => {
  const db = await getDbConnection();
  const feedback = req.body;
  db.collection('FEEDBACKS')
    .insertOne(feedback)
    .then(() => res.status(201).json(feedback))
    .catch(() => res.status(500).json({ error: 'Could not Submit the feedback' }));
});

// Export the handler for Vercel
module.exports = app;
