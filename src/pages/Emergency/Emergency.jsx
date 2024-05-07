import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllVehicles } from "../../store/VehicleSlice";
import GoogleMap from "../RepairCenterShow/GoogleMap";
import { AddRequest } from "../../store/EmergencyRequestSlice";
import io from 'socket.io-client';
const socket = io('http://localhost:3000/',{
    autoConnect: false,
    auth: {
        token: "prefixToken_"+localStorage.getItem("Token") // intializing token with a null value to be able to modify it after successful sign in/user datat loading  
    }
});
const Emergency = () => {
    const user = useSelector(state => state.AuthData.UserData);
    const [vehicles, setVehicles] = useState([]);
    const { lat, lng } = useSelector(x=>x.MapController)
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


    const handleSubmit = () => {
        FormData.vehicle = selectedVehicle;
        FormData.type = issue;
        FormData.coordinates = { latitude:lat, longitude:lng }
        FormData.dropOffLocation = { latitude:lat, longitude:lng }
        const res = dispatch(AddRequest(FormData));
        console.log(res);
        console.log(FormData)
        console.log("Selected Vehicle:", selectedVehicle);
        console.log("Issue:", issue);

    }
    const findAllvichels = async()=>{
        const res = await dispatch(GetAllVehicles());
        setVehicles(res.payload.data)
    }
    useEffect(()=>{
        console.log(user)
        findAllvichels()
        socket.connect()
        socket.on('request:accepted', (request) => {
            console.log('New request added:', request);
        });
    
        return () => {
            socket.off('request:accepted');
        };
    },[])
  return (
    <div>

{/* Map view*/}
    <div className="position-relative w-100" style={{height:'90vh'}}>
    <GoogleMap/>
    <div style={{  bottom: 60, left: 20 }} className="rounded-4 d-flex py-4 justify-content-center align-items-end w-25 bg-white border p-2 border-2 position-absolute">
            <div>
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

            <button className="btn btn-warning my-5 w-100" onClick={handleSubmit}>Request</button>
            </div>
        </div>
    </div>
    
    </div>
  )
}

export default Emergency
