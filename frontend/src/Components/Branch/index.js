import { Component } from "react";
import { Course } from "../Course";
// import { useParams } from "react-router-dom";
import '../SPI/style.css';

class Dept extends Component {
  state = {
    credits: [3,3,6,6,8,8,8],
    grades: [11,11,11,11,11,11,11],
    names: [],
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
    credits.push(0);grades.push(11);
    this.setState({grades,credits});
  }

  delCourse = (number) => {
    const {credits,grades} = this.state;
    credits.splice(number-1,1);
    grades.splice(number-1,1);
    this.setState({grades,credits});
  }

  fetchData = (spi) => {
    fetch('https://grade-calculator-henna.vercel.app/',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        spi,
        branch: window.location.pathname.split('/')[2],
        sem: window.location.pathname.split('/')[3],
        dateTime: new Date().toLocaleString(),
      })
    })
  }

  CalculateSPI = () => {
    const { credits, grades } = this.state;
    let totalCredits = 0;
    for (let i = 0; i < credits.length; i++) {
      totalCredits += parseFloat(credits[i]);
    }
    console.log(credits, grades);
    let totalGradePoints = 0;
    for (let i = 0; i < credits.length; i++) {
      let g = parseFloat(grades[i]);
      if(g==11) g=10;
      totalGradePoints += parseFloat(credits[i]) * g;
      console.log(totalGradePoints);
    }
    let spi = totalGradePoints / totalCredits;
    console.log(spi, totalGradePoints, totalCredits);
    this.fetchData(spi);
    this.setState({ spi:spi.toFixed(3)});
  }

  fetchDetails = () => {
    let branch = window.location.pathname.split('/')[2];
    if(branch === undefined) branch = 'ece';
    let sem = window.location.pathname.split('/')[3];
    if(sem === undefined) sem = 'IV';
    console.log(branch);
    fetch(`https://grade-calculator-henna.vercel.app/branches/${branch}/${sem}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      let Grades = [];
      for(let i=0; i<data.credits.length; i++){
        Grades.push(11);
      }
      this.setState({ credits: data.credits, names: data.names , previousTotalCredits: data.previousTotalCredits , grades: Grades });
    })
    .catch(error => console.error('Error fetching details:', error));
  }

  redirectToCPI = () => {
    const { spi, previousTotalCredits, credits } = this.state;
    let tc = 0;
    for (let i = 0; i < credits.length; i++) { 
      tc += parseFloat(credits[i]);
    }
    window.location.href = `/cpi?cspi=${spi}&ptc=${previousTotalCredits}&cc=${tc}`;
  }

  componentDidMount() {
    this.fetchDetails();
  }

  render() {
    const { spi, credits, grades, names, previousTotalCredits } = this.state;
    let tc = 0;
    for (let i = 0; i < credits.length; i++) {
      tc += parseFloat(credits[i]);
    }
    return (
      <div className="Container">
        <h1>Welcome to the S.P.I Calculator</h1>
        <p>Use this tool to calculate your grades easily!</p>
        <form className="boxContainer">
          <div className="headings">
            <h2 className="invisible">Cour</h2>
            <h2>Credits:</h2>
            <h2>Grade:</h2>
            <h2 className="invisible">Remove:</h2>
          </div>
          {credits.map((credit, index) => (
            <Course 
                key={index} 
                number={index + 1} 
                grades={grades} 
                credit={credit} 
                names={names}
                CredFunc={this.CredChange} 
                GradeFunc={this.GradeChange} 
                delCourse={this.delCourse}
            />
          ))}
          <button className="add-button" type="button" onClick={this.addCourse}>Add Course</button>
          <br></br>
          <button className="submit-button" type="button" onClick={this.CalculateSPI}> Calculate S.P.I </button>
        </form>
        <h2 className="creds">Previous Total Credits: {previousTotalCredits}</h2>
        {spi!=0 && <h1>your spi is : <span className="s1">{spi}</span></h1>}
        {spi!=0 && <h2 className="creds">your sem {window.location.pathname.split('/')[3]} total credits : {tc}</h2>}
        {spi!=0 && <button type="button" className="calCPI" onClick={this.redirectToCPI}>Calculate your CPI</button>}
      </div>
    )
  }
}

export default Dept;