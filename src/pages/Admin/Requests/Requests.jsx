import AdminNav from "../../../components/AdminNav/AdminNav";
import TableComponent from "../../../components/TableComponent/TableComponent";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  cancelRequest,
  getAllRequests,
} from "../../../store/EmergencyRequestSlice";
import GoogleMap from "../../RepairCenterShow/GoogleMap";
import { Toaster } from "react-hot-toast";

const Requests = () => {
  const dispatch = useDispatch();
  const [rows, setRows] = useState(
    useSelector((state) => state.EmergencyRequests.AllEmergencyRequests)
  );
  const users = useSelector((state) => state.AuthData.AllUsers);
  const mapStyle = {
    position: "relative",
    width: "70%",
    height: "90%",
    marginTop: "5px",
    borderRadius: "5%",
  };

  const getUser = (user) => {
    let value = "none";
    users.forEach((e) => {
      if (e._id === user) {
        value = `${e.firstName} ${e.lastName}`;
      }
    });
    return value;
  };

  const columns = [
    {
      field: "requestedBy",
      headerName: "Requested By",
      width: 150,
      valueGetter: (value, row) => getUser(row.requestedBy),
    },
    {
      field: "responder",
      headerName: "Responder",
      width: 150,
      valueGetter: (value, row) => getUser(row.responder),
    },
    { field: "type", headerName: "Type", width: 200 },
    { field: "state", headerName: "State", width: 150 },
    {
      field: "pickupLocation",
      headerName: "Pickup Location",
      width: 250,
      renderCell: (params) => (
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
      ),
    },
    {
      field: "location",
      headerName: "Dropoff Location",
      width: 250,
      renderCell: (params) =>
        params.row.dropOffLocation !== null &&
        params.row.dropOffLocation.latitude !== null ? (
          <GoogleMap
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
        ) : (
          <div>null</div>
        ),
    },
    { field: "createdAt", headerName: "Created At", width: 200 },
  ];

  const getAllEmergencyRequests = async () => {
    const res = await dispatch(getAllRequests());
    setRows(res.payload.data);
    console.log(res.payload.status);
  };

  async function handleEmergencyRequestCancel(selected) {
    selected.forEach(async (e) => {
      const res = await dispatch(cancelRequest({ id: e }));
      if (!res.payload.status) {
        getAllEmergencyRequests();
      }
    });
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <AdminNav name="Requests" />
      <TableComponent
        rows={rows}
        columns={columns}
        rowHeight={110}
        type={"requests"}
        func={handleEmergencyRequestCancel}
      />
    </>
  );
};

export default Requests;
