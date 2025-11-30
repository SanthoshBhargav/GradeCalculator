import "./style.css";
import downArrow from '../../Images/arrow-down.png';
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
    const placeholderSem = localStorage.getItem('sem') || "IV";
    const placeholderBranch = localStorage.getItem('branch') || "ece";
    const [sem, setSem] = useState(placeholderSem);
    const [branch, setBranch] = useState(placeholderBranch);
    const branches = [
        { value: "bsbe", label: "BSBE" },
        { value: "ce", label: "CE" },
        { value: "cl", label: "CL" },
        { value: "cse", label: "CSE" },
        { value: "cst", label: "CST" },
        { value: "dsai", label: "DSAI" },
        { value: "ece", label: "ECE" },
        { value: "ee", label: "EE" },
        { value: "eee", label: "EEE" },
        { value: "ep", label: "EP" },
        { value: "mech", label: "MECH" },
        { value: "mnc", label: "MNC" },
    ];
    const sems = [
        { value: "I", label: "Sem I" },
        { value: "II", label: "Sem II" },
        { value: "III", label: "Sem III" },
        { value: "IV", label: "Sem IV" },
        { value: "V", label: "Sem V" },
        { value: "VI", label: "Sem VI" },
        { value: "VII", label: "Sem VII" },
        { value: "VIII", label: "Sem VIII" },
    ];

  return (
    <div>
      <h1 className="h1 heading">For Students of IITG <div className="down-arrow"><img src={downArrow} alt="Down Arrow" /></div> </h1>
      <div className="bg">
        <div className="bg2">
          <p className="sem-p">Select Your Sem:</p>
          <select
            className="sem"
            onChange={(e) => setSem(e.target.value)}
            value={sem}
          >
            {
                sems.map((s) => (
                    <option key={s.value} value={s.value}>
                        {s.label}
                    </option>
                ))
            }
          </select>
          <p className="sem-p">Select Your Branch:</p>
          <select
            className="sem"
            onChange={(e) => setBranch(e.target.value)}
            value={branch}
          >
            {
                branches.map((b) => (
                    <option key={b.value} value={b.value}>
                        {b.label}
                    </option>
                ))
            }
          </select>
          <br/>
          <Link className="branch" to={`/branches/${branch}/${sem}`}>
            Navigate
          </Link>
        </div>
      </div>
      <h1 className="h1 h2">For Other Colleges :</h1>
      <div className="box1">
        <div className="bg1">
          <Link className="link1" to="/spi">
            SPI
          </Link>
        </div>
        <div className="bg1">
          <Link className="link1" to="/cpi">
            CPI
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
