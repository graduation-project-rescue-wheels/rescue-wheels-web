import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getNearByRequests } from "../../store/EmergencyRequestSlice"
import GoogleMap from "../RepairCenterShow/GoogleMap";
import io from 'socket.io-client';
import tmpImage from '../../assets/usertemp.png'
import Loader from "../../components/Loader/Loader";
import LoaderProgress from "../../components/Loader/LoaderProgress";
const socket = io('http://localhost:3000/',{
    autoConnect: false,
    auth: {
        token: "prefixToken_"+localStorage.getItem("Token") 
    }
});
const Technician = () => {
  const dispatch = useDispatch()
  const { lat, lng } = useSelector(x=>x.MapController)

  const [NearByRequest , setNearByRequest]=useState([])
  const [haveRequest, sethaveRequest] = useState(false);
  const FetchNearByRequests = async()=>{
    const res = await dispatch(getNearByRequests({long : lng , lat : lat}))
    console.log(res);
    setNearByRequest(res.payload.requests)
    console.log(NearByRequest);
    
  }

  // const acceptRequest
  useEffect(() => {
    FetchNearByRequests();
    socket.connect()
  
    socket.on('request:add', (request) => {
      setNearByRequest(request)
        console.log('New request added:', request);
          if(NearByRequest){
          sethaveRequest(true)
          NearByRequest.push(request)
          console.log(NearByRequest);
        }else{
          sethaveRequest(false)
        }
    });

    return () => {
        socket.off('request:add');
    };
    
}, []);
  return (
    <div className="position-relative w-100 overflow-scroll" style={{height:'90vh'}}>
    <GoogleMap zoom={10}/>
    <div style={{  bottom: 60, left: 20 }} className="rounded-4 d-flex py-4 justify-content-center align-items-end w-25 bg-white border p-2 border-2 position-absolute">
      
      {NearByRequest ? 
      <div><div className="text-start w-100" >
        <h5  style={{color:'#e48700'}}>Request details</h5>

      
     {NearByRequest?.map((request)=>{
      return  <div key={request._id}>
      <div   className="d-flex align-items-center mt-4">
       <div className="w-25 ">
        <img className="w-75" src={request?.requestedBy?.profilePic || tmpImage} alt=""/>
       </div>
       <div className="ms-1 ">
                 <p className="fw-bold"> {request?.requestedBy?.firstName + " " + request?.requestedBy?.lastName || ""}</p>
                 <p className="text-secondary"> {request?.requestedBy?.mobileNumber}</p>

        </div>
       </div>

       <div className="d-flex mt-3 justify-content-between"> 
       <p className="text-secondary"> Emergency</p>
       <p className="text-bold ms-3"> {request?.type}</p>
       </div>

       <div className="d-flex my-3 justify-content-between"> 
       <p className="text-secondary"> Car Model</p>
       <p className="text-bold ms-3"> {request?.vehicle?.model}</p>
       </div>

       <div className="d-flex justify-content-between"> 
       <p className="text-secondary"> Car Number</p>
       <p className="text-bold ms-3"> {request?.vehicle?.licensePlate}</p>
       </div>

       <button className="w-100 btn mt-3 rounded-4 text-white" style={{backgroundColor:"#e48700"}}>Accept Request</button>
     </div>
     })}
 
      </div>
      </div>
   

       :<div className="w-100">
      <LoaderProgress />
      <h5 className="mt-3">Searchging For Emergency Requests .....</h5>
      </div>
     }
      
    </div>
    </div>
  )
}

export default Technician
