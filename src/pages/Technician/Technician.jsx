import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { acceptRequest, cancelResponder, getNearByRequests } from "../../store/EmergencyRequestSlice"
import GoogleMap from "../RepairCenterShow/GoogleMap";
import io from 'socket.io-client';
import tmpImage from '../../Assents/usertemp.png'
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
  const [currentLocation, setCurrentLocation] = useState(null);

  const { lat, lng } = useSelector(x=>x.MapController)

  const [NearByRequest , setNearByRequest]=useState([])
  const [haveRequest, sethaveRequest] = useState(false);
  const [accept,setAccept] = useState(false)
  const FetchNearByRequests = async()=>{
    const res = await dispatch(getNearByRequests({long : lng , lat : lat}))
    console.log(res);
    // setNearByRequest(res.payload.requests)
    console.log(NearByRequest);
    
  }
  const [clickedMarkerPosition,setclickedMarkerPosition] = useState({lat:0.00,lng:0.00})
  const acceptRequestt=async(id)=>{
    const formdata = {id}
    const res =  await dispatch(acceptRequest(formdata))
    console.log(res);
    // setclickedMarkerPosition(res.payload.coordinates)
    setclickedMarkerPosition( { lat:res.payload.request
      .coordinates.latitude, lng:res.payload.request
      .coordinates.longitude});

    if(res.payload.request.state === "inProgress"){
      setAccept(true)
    }
  }
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude+0.01, lng: longitude+0.01 });
        },
        (error) => {
          console.error('Error getting the current location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };
  const handleCancleRequset =async(id)=>{
    const formData  = { id : id}
    const res = await dispatch(cancelResponder(formData))
    console.log(res);
    setNearByRequest([])
    setAccept(false)
    setclickedMarkerPosition(currentLocation)
  }

  // const acceptRequest
  useEffect(() => {
    getCurrentLocation()
    FetchNearByRequests();
    socket.connect()
  
    socket.on('request:add', (request) => {
      const v =[] 
      
      v.push(request)
      setNearByRequest(v)
      // setNearByRequest(request)
        console.log('New request added:', request);
        sethaveRequest(true)
        // setNearByRequest(request)
         
    });

    socket.on('request:cancelled', (request) => {
      console.log(request);
      if(request.state == "pending"){
        setNearByRequest(request)
      }else{
        setNearByRequest({})
      }
      setAccept(false)
      setclickedMarkerPosition(currentLocation)

      
         
    });
    return () => {
        socket.off('request:add');
        socket.off('request:cancelled');
    };
    
    
}, []);
  return (
    <div className="position-relative w-100 " style={{height:'90vh'}}>
<GoogleMap 
        initialCenter={currentLocation}
          markerPosition={currentLocation}
          dispatch={dispatch}
          distination={clickedMarkerPosition}

          
    />
    <div style={{  bottom: 60, left: 20 ,overflow:'hidden'}} className="rounded-4  d-flex py-4 justify-content-center align-items-end w-25 bg-white border p-2 border-2 position-absolute">
      
    {NearByRequest?.length ? 
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
        {accept? 
          <div>
          <h5 className="mt-3">Request Accepted</h5>
      <button className="btn btn-danger my-3 w-100" onClick={()=>handleCancleRequset(request._id)}>Cancle</button>

          </div>
:       <button onClick={()=>acceptRequestt(request._id)} className="w-100 btn mt-3 rounded-4 text-white" style={{backgroundColor:"#e48700"}}>Accept Request</button>
}
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
