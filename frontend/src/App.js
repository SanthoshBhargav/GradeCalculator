import SPI from './Components/SPI'; 
import CPI from './Components/CPI'; 
import Dept from './Components/Branch';
import Home from './Components/Home';
import IITGHome from './Components/IITGHome';
import igIcon from './Images/instagram.png';
import liIcon from './Images/linkedin.png';
import ghIcon from './Images/github.png';
import bramhi from './Images/bramhi.webp';
import { BrowserRouter, Route, Routes, Link} from "react-router-dom";
import './App.css';

function App() {
  const feedbackSubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const feedback = document.getElementById('feedback').value;
    if(feedback){
      document.getElementById('name').value = '';
      document.getElementById('email').value = '';
      document.getElementById('feedback').value = '';
    }
    fetch('http://localhost:5000/feedback',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, email, feedback})
    })
  }
  return (
    <div className="App">
      <BrowserRouter>
        <div className="header">
            <nav className="navbar">
              <h1 className='h1'>Grade Calculator</h1>
              <ul>
                <li><Link className='navitems home-item' to="/">HOME</Link></li>
                <li><Link className='navitems grade-item' to="/spi">SPI</Link></li>
                <li><Link className='navitems grade-item' to="/cpi">CPI</Link></li>
                <li><Link className='navitems home-item' to="/branches">IITG</Link></li>
              </ul>
            </nav>
        </div>
        <div className='b'>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/spi" element={<SPI/>} />
            <Route exact path="/cpi" element={<CPI/>} />
            <Route exact path="/branches" element={<IITGHome />} />
            <Route exact path="/branches/:branch/:sem" element={<Dept />} />
          </Routes>
          <p className='by'>Developed by <span>G.Santhosh Bhargav</span></p>
        </div>
      </BrowserRouter>
      <footer className="footer">
        <div>
          <a href='https://github.com/SanthoshBhargav' target='_blank'><img  className='icons' src={ghIcon} alt="GitHub" width="30px" height="30px"/></a>
          <a href='https://www.linkedin.com/in/santhosh-bhargav-gunta-b804132a9/' target='_blank'><img  className='icons' src={liIcon} alt="LinkedIn" width="30px" height="30px"/></a>
          <a href='https://www.instagram.com/_santhosh_bhargav_/' target='_blank'><img className='icons' src={igIcon} alt='Instagram' height='28px' width='28px' /></a>
        </div>
        <div className="feedback">
          <h1>Give Feedback</h1> 
          <div>
            <img src={bramhi} alt='Bharmhi' height='250px' />
            <form onSubmit={feedbackSubmit}>
              <label htmlFor="name">Name:</label>
              <input type="text" id='name' placeholder="Name"/>
              <label htmlFor="email">Email:</label>
              <input type="email" id='email' placeholder="Email" />
              <label htmlFor="feedback">Feedback:</label>
              <textarea placeholder="Feedback" id='feedback' required ></textarea>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
