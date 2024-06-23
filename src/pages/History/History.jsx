import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetRequestById, GetUserHistory } from "../../store/EmergencyRequestSlice";
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
      valueGetter: (value, row) =>
        row.responder
          ? `${row.responder.firstName} ${row.responder.lastName}`
          : "none",
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

  const fetchRequests = async () => {
    const res = await dispatch(GetUserHistory());
    for(const e in res.payload.requests){
      console.log(res.payload.requests[e].requestedBy);
    }
    setRequests(res.payload.requests);
    setIsFetched(true);
  };

  useEffect(() => {
    fetchRequests();
  }, []);
  return (
    <>
      {isFetched ? (
        <div className="mx-3" style={{ marginTop: "130px" }}>
          <SimpleTable
            rows={requests}
            columns={columns}
            title={"Requests History"}
            styles={{ borderRadius: "0" }}
          />
        </div>
      ) : (
        <div style={{ marginTop: "130px" }}>
          <Loading />
        </div>
      )}
    </>
  );
};

export default History;
