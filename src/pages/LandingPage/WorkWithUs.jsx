import { Link } from 'react-router-dom'
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const WorkWithUs = () => {
  return (
    <div>
      <div className='rounded-5 p-3 py-5 mb-5' style={{backgroundColor:"#362e93"}}>
  
      <div className='row gy-5'>
            <div className='col-md-6' style={{borderRight:'2px solid white'}}>
<p className='fw-light text-white px-4 pb-5'>
If you have a car  Repair center and want to receive clients through us, there will be a reservation system that we provide for you to determine the appropriate time to receive each reservation.</p>
<Link to={"/signUp"} className="applyBtn bg-white text-dark ms-4 p-3 my-5" style={{backgroundColor:'#362e93'}}>
            Apply As Repair Center
            <ArrowRightAltIcon className="applyIcon bg" />
          </Link>
            </div>
            <div className='col-md-6'>
            <p className='fw-light text-white px-4 pb-5'>
            If you want to work as an emergency technician, help broken down cars on the road as quickly as possible by knowing their location
</p>
<Link to={"/signUp"} className="applyBtn bg-white text-dark ms-4 p-3 mt-5" style={{backgroundColor:'#362e93'}}>
            Apply As Repair Center
            <ArrowRightAltIcon className="applyIcon bg" />
          </Link>
            </div>
      </div>
      </div>
    </div>
  )
}

export default WorkWithUs
