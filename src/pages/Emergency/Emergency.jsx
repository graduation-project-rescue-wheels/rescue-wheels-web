import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllVehicles } from "../../store/VehicleSlice";
import GoogleMap from "../RepairCenterShow/GoogleMap";
import { AddRequest, CancleRequest, GetRequestById } from "../../store/EmergencyRequestSlice";
import io from 'socket.io-client';
import LoaderProgress from "../../components/Loader/LoaderProgress";
import { getUserData } from "../../store/AuthSlice";
const socket = io('http://localhost:3000/',{
    autoConnect: false,
    auth: {
        token: "prefixToken_"+localStorage.getItem("Token") // intializing token with a null value to be able to modify it after successful sign in/user datat loading  
    }
});
const Emergency = () => {
    const [vehicles, setVehicles] = useState([]);
    const [User , setUser] = useState({})
    const [currentLocation, setCurrentLocation] = useState(null);
    const [UserHaveRequest , setUserHaveRequest] = useState(false);
    const { lat, lng } = useSelector(x=>x.MapController)
    const [requestData,setRequestData] = useState({})
    console.log(lat,lng);
    const [FormData,setFormData] = useState({
        vehicle :"",
        coordinates:{},
        type:"",
        dropOffLocation:{}
    })
    const dispatch = useDispatch()

    const [selectedVehicle, setSelectedVehicle] = useState('');
    const [issue, setIssue] = useState('');

    const handleVehicleChange = (event) => {
        setSelectedVehicle(event.target.value);
    };

    const handleIssueChange = (event) => {
        setIssue(event.target.value);
    };


    const handleAddRequset = async() => {
        FormData.vehicle = selectedVehicle;
        FormData.type = issue;
        const user = JSON.parse(localStorage.getItem("currentUser"))
        FormData.requestedBy = user._id
        FormData.coordinates = { latitude:lat, longitude:lng }
        FormData.dropOffLocation = { latitude:lat, longitude:lng }
        const res = await dispatch(AddRequest(FormData));
        console.log(res.payload);
        if(res.payload.status){
            setUserHaveRequest(true)
        }
        
        console.log(res);
        setUser(res.payload.user)
        console.log(FormData)
        console.log("Selected Vehicle:", selectedVehicle);
        console.log("Issue:", issue);

    }
    const handleCancleRequset = async()=>{
        const formData  = { id : User.onGoingRequestId}
        const res = await dispatch(CancleRequest(formData))
        setRequestData(res.payload)
        // console.log(res.payload.request.state == "cancelled" );
        if(res.payload.request.state == "cancelled"){
            setUserHaveRequest(false)
        }
        
    }
    const findAllNeededData = async()=>{
        const userData = await dispatch(getUserData())
        const res = await dispatch(GetAllVehicles());
        console.log(userData.payload.data.onGoingRequestId);
        setUser(userData.payload.data)
        console.log("User Data",User);
        setVehicles(res.payload.data)
        if(userData.payload.data.onGoingRequestId){
            const res = await dispatch(GetRequestById(User.onGoingRequestId))
            console.log(res.payload.request.state);
            if(res.payload.request.state==="pending"){
                setUserHaveRequest(true)
            }
        }
    }
    const getCurrentLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setCurrentLocation({ lat: latitude, lng: longitude });
            },
            (error) => {
              console.error('Error getting the current location:', error);
            }
          );
        } else {
          console.error('Geolocation is not supported by this browser.');
        }
      };
    useEffect(()=>{
        findAllNeededData()
        getCurrentLocation();
        console.log(requestData);
        
        console.log(currentLocation);
        socket.connect()
        socket.on('request:accepted', (request) => {
            console.log('New request added:', request);
        });
        socket.on('request:responder-cancel', (request) => {
            console.log(' responder cancel request', request);
            setUserHaveRequest(false)
        });

        
    
        return () => {
            socket.off('request:accepted');
            socket.off('responder-cancel');
        };
    },[])
  return (
    <div>

{/* Map view*/}
    <div className="position-relative w-100" style={{height:'90vh'}}>
    <GoogleMap 
        initialCenter={currentLocation}
          markerPosition={currentLocation}
          dispatch={dispatch}
  clickedMarkerPosition={{ lat: 29.9892736 , lng: 31.1894304 }} // Example clicked marker position
//   directions={/* Pass the directions object here */}
    />
    <div style={{  bottom: 60, left: 20 }} className="rounded-4 d-flex py-4 justify-content-center align-items-end w-25 bg-white border p-2 border-2 position-absolute">
            {(UserHaveRequest)?
            <div>
            <div className="w-100">
      <LoaderProgress />
      <h5 className="mt-3">Connection To Your technician</h5>
      </div>
      <button className="btn btn-danger my-3 w-100" onClick={handleCancleRequset}>Cancle</button>

            </div>

            :<div>
                <h3 className="my-4">Where Can we Pick You up ?</h3>

            <select className="my-4 form-control" value={selectedVehicle} onChange={handleVehicleChange}>
                <option>Choose a vehicle</option>
                {vehicles?.map((vehicle) => (
                    <option key={vehicle._id} value={vehicle._id}>{`${vehicle.make} / ${vehicle.model}`}</option>
                ))}
            </select>

            <select className="form-control" value={issue} onChange={handleIssueChange}>
                <option>Flat tire</option>
                <option>Out of fuel/Dead battery</option>
                <option>Other</option>
            </select>

            <button className="btn btn-warning my-5 w-100" onClick={handleAddRequset}>Request</button>
            </div>}
            
        </div>
    </div>
    
    </div>
  )
}

export default Emergency
