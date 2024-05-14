import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetRequestById } from "../../store/EmergencyRequestSlice";
import Loading from "../../components/Loading/Loading";
import SimpleTable from "../../components/SimpleTable/SimpleTable";
import GoogleMap from "../RepairCenterShow/GoogleMap";
import { getUserData } from "../../store/AuthSlice";

const History = () => {
  const dispatch = useDispatch();
  const [isFetched, setIsFetched] = useState(false);
  const [requests, setRequests] = useState([]);
  const [signedUserRequests, setSignedUserRequests] = useState([]);
  const users = useSelector((state) => state.AuthData.AllUsers);
  console.log(users);

  const mapStyle = {
    position: "relative",
    width: "70%",
    height: "90%",
    marginTop: "5px",
    borderRadius: "5%",
  };

  const columns = [
    {
      field: "responder",
      headerName: "Responder",
      width: 150,
      valueGetter: (value, row) => row.responder ? `${row.responder.firstName} ${row.responder.lastName}` : "none",
    },
    { field: "type", headerName: "Type", width: 200 },
    { field: "state", headerName: "State", width: 150 },
    {
      field: "pickupLocation",
      headerName: "Pickup Location",
      width: 250,
      renderCell: (params) => (
        <div style={mapStyle}>
          <GoogleMap
            dispatch={dispatch}
            initialCenter={{
              lat: params.row.coordinates.latitude,
              lng: params.row.coordinates.longitude,
            }}
            markerPosition={{
              lat: params.row.coordinates.latitude,
              lng: params.row.coordinates.longitude,
            }}
            mapStyles={mapStyle}
          />
        </div>
      ),
    },
    {
      field: "location",
      headerName: "Dropoff Location",
      width: 250,
      renderCell: (params) =>
        params.row.dropOffLocation !== null &&
        params.row.dropOffLocation.latitude !== null ? (
          <div style={mapStyle}>
            <GoogleMap
              dispatch={dispatch}
              initialCenter={{
                lat: params.row.dropOffLocation.latitude,
                lng: params.row.dropOffLocation.longitude,
              }}
              markerPosition={{
                lat: params.row.dropOffLocation.latitude,
                lng: params.row.dropOffLocation.longitude,
              }}
              mapStyles={mapStyle}
            />
          </div>
        ) : (
          <div>null</div>
        ),
    },
    { field: "createdAt", headerName: "Created At", width: 200 },
  ];

  const fetchUserData = async () =>{
    const res = await dispatch(getUserData());
    console.log(res.payload.data.Requests_IDS);
    setSignedUserRequests(res.payload.data.Requests_IDS);
  }

  const fetchRequests = async () => {
    setRequests([])
    const resUser = await dispatch(getUserData());
    await resUser.payload.data.Requests_IDS.forEach(async (id) => {
      const res = await dispatch(GetRequestById(id));
      setRequests((requests) => [...requests, res.payload.request]);
    });
    setIsFetched(true);
  };

  useEffect(() => {
    fetchRequests();
  }, []);
  return (
    <>
      {isFetched ? (
        <div className="mx-3 mt-3">
          <SimpleTable
            rows={requests}
            columns={columns}
            title={"Requests History"}
            styles={{ borderRadius: "0" }}
          />
        </div>
      ) : (
        <div className="mt-5">
          <Loading />
        </div>
      )}
    </>
  );
};

export default History;
