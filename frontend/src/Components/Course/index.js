import trash from '../../Images/trash.png';
import './style.css';

export let Course = (props) =>{
    const {credit,grades,number,names, CredFunc, GradeFunc, delCourse} = props;
    let gSystem;
    if(names.length==0){
        gSystem = [10,9,8,7,6,5,4,0]
    }
    else{
        gSystem = ['AA','AB','BB','BC','CC','CD','DD','F']
    }
    const grade = grades[number-1];
    const handleGrade = (e) => {
        GradeFunc(e.target.value, number-1);
    }   
    const incCred = (e) => {
        CredFunc(credit+1, number-1);
    }
    const decCred = (e) => {
        if(credit>0) CredFunc(credit-1, number-1);
    }
    const DelCourse = () =>{
        delCourse( number );
    }
    return(
        <div className='course'>
            {(names.length==0) && <label>Course {number} :</label>}
            {(names.length!=0) && (names.length>=number) && <label>{names[number-1]} :</label>}
            {(names.length!=0) && (names.length<number) && <label>Course {number} :</label>}
            <div className='credit'>
                <button type='button' onClick={decCred}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-440v-80h560v80H200Z"/></svg>
                </button>
                <span value={credit}>{credit}</span>
                <button type='button' onClick={incCred} >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                </button>
            </div>
            <select className='dropbox' onChange={handleGrade} value={grade} required>
                { names.length!=0 && <option value="11">AS</option>}
                <option value="10">{gSystem[0]}</option>
                <option value="9">{gSystem[1]}</option>
                <option value="8">{gSystem[2]}</option>
                <option value="7">{gSystem[3]}</option>
                <option value="6">{gSystem[4]}</option>
                <option value="5">{gSystem[5]}</option>
                <option value="4">{gSystem[6]}</option>
                <option value="0">{gSystem[7]}</option>
            </select>
            <button className='del-button' type='button' onClick={DelCourse}>
                <img src={trash} alt="trash" width="20px" height="20px"/>
            </button>
            <br></br>
        </div>
    )
}