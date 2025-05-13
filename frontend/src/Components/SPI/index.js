import { Component } from "react";
import { Course } from "../Course";
import './style.css';

class SPI extends Component {
  state = {
    credits: [3,6,8],
    grades: [11,11,11],
    spi: 0,
  }

  CredChange = (cred, index) => {
    let newCredits = [...this.state.credits];
    newCredits[index] = cred;
    this.setState({ credits: newCredits });
  }

  GradeChange = (grade, index) => {
    let newGrades = [...this.state.grades];
    newGrades[index] = grade;
    this.setState({ grades: newGrades });
  }

  addCourse = () => {
    const {credits,grades} = this.state;
    credits.push(0);grades.push(10);
    this.setState({grades,credits});
  }

  delCourse = (number) => {
    const {credits,grades} = this.state;
    credits.splice(number-1,1);
    grades.splice(number-1,1);
    this.setState({grades,credits});
  }

  fetchData = (spi) => {
    try{
      fetch('http://localhost:5000',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({spi})
      })
    }catch(err){
      console.log(err);
    }
    
  }

  CalculateCPI = () => {
    const { credits, grades } = this.state;
    let totalCredits = 0;
    for (let i = 0; i < credits.length; i++) {
      totalCredits += parseInt(credits[i]);
    }
    let totalGradePoints = 0;
    for (let i = 0; i < credits.length; i++) {
      let g = parseInt(grades[i]);
      if(g==11) g=10;
      totalGradePoints += parseInt(credits[i]) * g;
    }
    let spi = totalGradePoints / totalCredits;
    try{
      this.fetchData(spi);
    }catch(err){
      console.log(err);
    }
    this.setState({ spi:spi.toFixed(3)});
  }

  render() {
    const { spi, credits, grades } = this.state;
    let tc = 0;
    for (let i = 0; i < credits.length; i++) {
      tc += parseInt(credits[i]);
    }
    return (
      <div className="container">
        <h1>Welcome to the S.P.I Calculator</h1>
        <p>Use this tool to calculate your grades easily!</p>
        <form className="box-container">
          <div className="headings">
            <h2 className="invisible">Course:</h2>
            <h2>Credits:</h2>
            <h2>Grade:</h2>
            <h2 className="invisible">delButton</h2>
          </div>
          {credits.map((credit, index) => (
            <Course 
                key={index} 
                number={index + 1} 
                grades={grades} 
                credit={credit} 
                names={[]}
                CredFunc={this.CredChange} 
                GradeFunc={this.GradeChange} 
                delCourse={this.delCourse}
            />
          ))}
          <button className="add-button" type="button" onClick={this.addCourse}>Add Course</button>
          <br></br>
          <button className="submit-button" type="button" onClick={this.CalculateCPI}> Calculate S.P.I </button>
        </form>
        {spi!=0 && <h1>your spi is : <span className="s1">{spi}</span></h1>}
        {spi!=0 && <h2 className="creds">your sem {window.location.pathname.split('/')[3]} total credits : {tc}</h2>}
      </div>
    )
  }
}

export default SPI;