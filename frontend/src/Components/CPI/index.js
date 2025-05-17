import { useState, useEffect } from 'react';
// import { useParams, useMatch } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';
import './style.css';
import { get } from 'http';

const getCpi = (cpi) => {
    fetch('https://grade-calculator-henna.vercel.app/cpi',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({cpi})
    })
  }
const CPI = (props) =>{
    const [cpi, setCpi] = useState(0);
    const [searchParams] = useSearchParams();
    const cc = searchParams.get('cc');
    const cspi = searchParams.get('cspi');
    const ptc = searchParams.get('ptc');
    const calculateCpi = (e) => {
        e.preventDefault();
        getCpi();
        const pcpi = parseFloat(document.getElementById('pcpi').value);
        const spi = parseFloat(document.getElementById('spi').value);
        const totalCredit = parseFloat(document.getElementById('totalCredit').value);
        const currentCredit = parseFloat(document.getElementById('currentCredit').value);

        if (isNaN(pcpi) || isNaN(spi) || isNaN(totalCredit) || isNaN(currentCredit)) {
            alert("Please enter valid numbers");
            return;
        }
        const cpi = ((pcpi * totalCredit) + (spi * currentCredit)) / (totalCredit + currentCredit);
        setCpi(cpi);
    }
    useEffect(()=>{
        if(cspi!==null) document.getElementById('spi').value = cspi;
        if(ptc!==null) document.getElementById('totalCredit').value = ptc;
        if(cc!==null) document.getElementById('currentCredit').value = cc;
    },[]);

    return (
        <div>
            <h1 className="heading">CPI Calculator</h1>
            <form className="cpi box-container">
                <div className="cpi-input">
                    <label htmlFor="pcpi">Previous C.P.I</label>
                    <input type="number" id="pcpi" placeholder="Enter Previous C.P.I" />
                </div>
                <div className="cpi-input">
                    <label htmlFor="spi">SPI</label>
                    <input type="number" id="spi" placeholder="Enter SPI" />
                </div>
                <div className="cpi-input">
                    <label htmlFor="credit">Previous Total Credits</label>
                    <input type="number" id="totalCredit" placeholder="Enter Credit" />
                </div>
                <div className="cpi-input">
                    <label htmlFor="credit">Current Semester Credits</label>
                    <input type="number" id="currentCredit" placeholder="Enter Credit" />
                </div>
                <button type="submit" className='submit-cpi' onClick={calculateCpi}>Calculate</button>
            </form>
            { 
                cpi!=0 && <div className="cpi-result">
                            <h2>CPI: {cpi.toFixed(3)}</h2>
                          </div>
            }
        </div>
    )
}
export default CPI;