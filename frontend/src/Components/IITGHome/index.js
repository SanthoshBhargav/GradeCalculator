import { Link} from "react-router-dom";
import { useState } from "react";
import './style.css';


const IITGHome = () => {

const [sem, setSem] = useState('IV');

return (
    <div>
        <p className="sem-p">Select Your Sem:</p>
        <select className="sem" onChange={(e) => setSem(e.target.value)} value={sem}>
            <option value="I">Sem I</option>
            <option value="II">Sem II</option>
            <option value="III">Sem III</option>
            <option value="IV">Sem IV</option>
            <option value="V">Sem V</option>
            <option value="VI">Sem VI</option>
            <option value="VII">Sem VII</option>
            <option value="VIII">Sem VII</option>
        </select>
        <h1 className="h1">Choose Your Branch</h1>
        <ul className="branches">
            <li><Link className="branch" to={`/branches/bsbe/${sem}`} >BSBE</Link></li>
            <li><Link className="branch" to={`/branches/ce/${sem}`} >CE</Link></li>
            <li><Link className="branch" to={`/branches/cl/${sem}`} >CL</Link></li>
            <li><Link className="branch" to={`/branches/cse/${sem}`} >CSE</Link></li>
            <li><Link className="branch" to={`/branches/cst/${sem}`} >CST</Link></li>
            <li><Link className="branch" to={`/branches/dsai/${sem}`} >DSAI</Link></li>
            <li><Link className="branch" to={`/branches/ece/${sem}`} >ECE</Link></li>
            <li><Link className="branch" to={`/branches/ee/${sem}`} >EE</Link></li>
            <li><Link className="branch" to={`/branches/eee/${sem}`} >EEE</Link></li>
            <li><Link className="branch" to={`/branches/ep/${sem}`} >EP</Link></li>
            <li><Link className="branch" to={`/branches/mech/${sem}`} >MECH</Link></li>
            <li><Link className="branch" to={`/branches/mnc/${sem}`} >MNC</Link></li>
            <li><Link className="branch" to={`/spi`} >Other</Link></li>
        </ul>
    </div>
);
}
export default IITGHome;