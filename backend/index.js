const express = require('express');
const cors = require('cors');
const {connectToDb, getDb} = require('./db');

const app = express();
let db;
const PORT = 5000;
connectToDb((err)=>{
    if(!err){
        app.listen(PORT, () => {
            console.log("Server is running on port 5000");
        });
        db = getDb();
    }else{
        console.log(err);
    }
})

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    let spis = [] 
    console.log("Fetching SPIs");
    db.collection('SPIs')
    .find()
    .sort({spi:1})
    .forEach((doc) => {
        spis.push(doc);
    })
    .then(()=>{
        res.status(200).json(spis);
    })
    .catch((err) => {
        res.status(500).json({error: 'Could not fetch the data'});
    });
});

app.get('/branches/:branch/:sem', (req, res) => {
    let credits = [] 
    let names = []
    let previousTotalCredits = 0;
    const { branch, sem } = req.params;
    // console.log(branch);
    db.collection(branch.toLocaleUpperCase())
    .find({Semester: {$lt : sem} })
    .forEach((doc) => {
        previousTotalCredits+=(doc.Credits);
    })

    db.collection(branch.toLocaleUpperCase())
    .find({Semester:sem})
    .sort({CourseNo:1})
    .forEach((doc) => {
        credits.push(doc.Credits);
        names.push(doc.CourseNo);
    })
    .then(()=>{
        res.status(200).json({credits,names,previousTotalCredits});
    })
    .catch((err) => {
        res.status(500).json({error: 'Could not fetch the data'});
    });
});


app.post('/', (req, res) => {   
    const spi = req.body;
    db.collection('SPIs')
    .insertOne(spi)
    .then(() => {
        res.status(201).json(spi);
    })
    .catch((err) => {
        res.status(500).json({error: 'Could not create the SPI'});
    });
})

app.post('/feedback', (req, res) => {   
    const feedback = req.body;
    db.collection('FEEDBACKS')
    .insertOne(feedback)
    .then(() => {
        res.status(201).json(feedback);
    })
    .catch((err) => {
        res.status(500).json({error: 'Could not Submit the feedback'});
    });
})