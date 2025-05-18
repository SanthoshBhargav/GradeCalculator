import './style.css';
import { Link } from "react-router-dom";

const Home = () =>{
    return(
        <div>
            <h1 className="h1 heading">Are you from IITG ?? then click below</h1>
            <div className="bg">
                <Link className='link' to='/branches' >IITG</Link>
            </div>
            <div className="bg2">
                <Link className='link1' to='/branches' >IITG</Link>
            </div>
            <h1 className="h1 h2">No! then choose what to calculate..</h1>
            <div className="box1">
                <div className='bg1'><Link className='link1' to='/spi' >SPI</Link></div>
                <div className='bg1'><Link className='link1' to='/cpi' >CPI</Link></div>
            </div>
        </div>)
}

export default Home;