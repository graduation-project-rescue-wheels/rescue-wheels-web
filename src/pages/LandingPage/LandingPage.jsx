import img1 from "../../Assents/OnBording/mechanics-repairing-car-in-service-station-2953459-2451647.png";
import { Link } from 'react-router-dom';
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import img11 from '../../Assents/OnBording/maintenance (1).png'
import img2 from '../../Assents/OnBording/car-engine.png'
import img3 from '../../Assents/OnBording/maintenance (2).png'
import img4 from '../../Assents/OnBording/mechanic.png'
import image1 from '../../Assents/OnBording/car (2).png'
import image2 from '../../Assents/OnBording/engine.png'
import image3 from '../../Assents/OnBording/car-painting (1).png'
import image4 from '../../Assents/OnBording/car.png'
import image5 from '../../Assents/OnBording/tow-truck.png'
import image6 from '../../Assents/OnBording/disc-brake.png'
import image7 from '../../Assents/OnBording/car-battery.png'
import image8 from '../../Assents/OnBording/diesel.png'
import google from '../../Assents/OnBording/Google Play Black.svg'
import AppStore from '../../Assents/OnBording/App Store Black.svg'
import CustomTitle from './CustomTitle';
import NavLanding from "./NavLanding";
import LandingPageServicesComponent from "./LandingPageServicesComponent";
import './LandingPage.css'
import Brands from "./Brands";
import WorkWithUs from "./WorkWithUs";
const LandingPage = () => {

  return (
    <div className=''>
      <NavLanding/>
      {/* About Us */}
      <div className='container  p-0' id='aboutUs'>
        <div className='row m-0  p-0 d-flex justify-content-center align-items-center'>
          <div className='col-md-6'>
            <h3 className='fw-bold  mt-4'>WE WILL SERVICE YOUR CAR</h3>
            <h1 className='fw-bold' style={{fontSize:"65px",color:'#362e93'}} >EVEN AT YOUR <br/> DOORSTEP</h1>
            <p className='text-secondary my-3 mb-5'>
            We provide emergency services to a fully equipped car workshop at the chosen time and location, with experienced technicians, high-quality tools, competitive prices and maintenance centers. You can book an appointment at any time at any maintenance center.

            </p>
            <Link to={"/signUp"} className="applyBtn p-3 mt-5" style={{backgroundColor:'#362e93'}}>
            Apply With Us
            <ArrowRightAltIcon className="applyIcon" />
          </Link>
          </div>
          <div className='col-md-6 mt-5'>
            <img className='w-100' src={img1} alt='d'/>
          </div>
        </div>
        <div>
          <div className='d-flex w-100 mt-3 justify-content-lg-around align-items-center'>
            <div className='border border-5 p-4 rounded-circle'>
              <img className='w-100' src={img11} alt='d'/>
            </div>
            <div className='border border-5 p-4 rounded-circle'>
              <img  className='w-100' src={img2} alt='d'/>
            </div>
            <div className='border border-5 p-4 rounded-circle'>
              <img  className='w-100' src={img3} alt='d'/>
            </div>
            <div className='border border-5 p-4 rounded-circle'>
              <img  className='w-100' src={img4} alt='d'/>
            </div>
          </div>
        </div>
      </div>
      {/* Services */}
      <div className='container mt-5 p-0' id='services'>
      <div className='text-center  mt-5 pt-5'><CustomTitle title={"Services"}/></div>
    
        <div className='row m-0 '>
        <div className='col-md-6 p-4'>
<LandingPageServicesComponent img={image5} text={"Car Towing"} bgText={"bg-dark"}  bgColor={"bg-white"}  colo2="text-dark" color="text-white"/>

        </div>
        <div className='col-md-6 p-4 '>
        <LandingPageServicesComponent img={image1} bgText={"bg-white"} text={"wheels Repair"} bgColor={"bg-dark"}  colo2="text-white" color="text-dark"/>

        </div>
        <div className='col-md-6 p-4 '>
        <LandingPageServicesComponent img={image3} bgText={"bg-white"} text={"Car painting"} bgColor={"bg-dark"}  colo2="text-white" color="text-dark"/>

        </div>
        <div className='col-md-6 p-4'>
<LandingPageServicesComponent img={image2} text={"Engine Fix"} bgText={"bg-dark"}  bgColor={"bg-white"}  colo2="text-dark" color="text-white"/>

        </div>
        <div className='col-md-6 p-4'>
<LandingPageServicesComponent img={image4} text={"Body Repair"}  bgText={"bg-dark"}  bgColor={"bg-white"}  colo2="text-dark" color="text-white"/>

        </div>
        
        
        <div className='col-md-6 p-4 '>
        <LandingPageServicesComponent img={image6} bgText={"bg-white"} text={"Disc Brake"} bgColor={"bg-dark"}  colo2="text-white" color="text-dark"/>

        </div>
        <div className='col-md-6 p-4 '>
        <LandingPageServicesComponent img={image8} bgText={"bg-white"} text={"Diesel"} bgColor={"bg-dark"}  colo2="text-white" color="text-dark"/>

        </div>
        <div className='col-md-6 p-4'>
<LandingPageServicesComponent img={image7} text={"Battery"}  bgText={"bg-dark"}  bgColor={"bg-white"}  colo2="text-dark" color="text-white"/>

        </div>
        
        </div>
        <div className="text-center mt-5">
        <h5 className='fw-light' style={{fontSize:"25px",color:'#362e93'}} >Servicing and repair the Area’s</h5>
        <h5 className="fw-bold mb-5" style={{fontSize:"40px",color:'#362e93'}}>Most Popular Brands</h5>
        <Brands/>
        </div>
      </div>

      <div className="container">
              <div className='text-center  mt-5 pt-5'><CustomTitle title={"With Us"}/></div>
              <WorkWithUs/>
      </div>


      <div className="container mb-5" >
      <div className="text-center">
      <h5 className='fw-bold' style={{fontSize:"25px",color:'#362e93'}} >Download our App now and enjoy our services</h5>
        <div className="d-flex mt-5 justify-content-center align-items-center">
          <div className="me-3">
            <img src={google}/>
          </div>
          <div>
            <img src={AppStore}/>
          </div>
        </div>
      </div>
      


          </div>
          <div className=" py-5" style={{backgroundColor:'#362e93'}} >

          </div>
    </div>
  )
};

export default LandingPage;
