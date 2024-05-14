import AdminNav from "../../../components/AdminNav/AdminNav";
import img from "../../../assets/143086968_2856368904622192_1959732218791162458_n.png";
import "./Dashboard.css";
import AdminCard from "./../../../components/AdminCard/AdminCard";
import { useDispatch, useSelector } from "react-redux";
import { GetAllUsers } from "../../../store/AuthSlice";
import { useEffect, useState } from "react";
import { GetAllRepairCenters } from "../../../store/RepairCenterSlice";
import { getAllRequests } from "../../../store/EmergencyRequestSlice";
import GoogleMap from "../../RepairCenterShow/GoogleMap";
import SimpleTable from "../../../components/SimpleTable/SimpleTable";
import Loading from "../../../components/Loading/Loading";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [auth, setAuths] = useState([]);
  const [users, setUsers] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [repairCenters, setRepairCenters] = useState([]);
  const [requests, setRequests] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const mapStyle = {
    position: "relative",
    width: "70%",
    height: "90%",
    marginTop: "5px",
  };
  let allusers = useSelector((state) => state.AuthData.AllUsers);
  const getUser = (user) => {
    let value = "none";

    allusers.forEach((e) => {
      if (e._id === user) {
        value = `${e.firstName} ${e.lastName}`;
      }
    });
    return value;
  };

  const requestColumns = [
    {
      field: "requestedBy",
      headerName: "Requested By",
      width: 130,
      valueGetter: (value, row) => getUser(row.requestedBy),
    },
    {
      field: "responder",
      headerName: "Responder",
      width: 120,
      valueGetter: (value, row) => getUser(row.responder),
    },
    { field: "type", headerName: "Type", width: 180 },
    { field: "state", headerName: "State", width: 100 },
    {
      field: "pickupLocation",
      headerName: "Pickup Location",
      width: 220,
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
          />
        </div>
      ),
    },
    {
      field: "location",
      headerName: "Dropoff Location",
      width: 220,
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
  ];

  const userColumns = [
    {
      field: "pic",
      headerName: "Pic",
      width: 70,
      renderCell: (params) => (
        <img
          src={params.row.profilePic ? params.row.profilePic : img}
          alt=""
          className="rounded-circle pic"
          style={{ width: "2.5rem", aspectRatio: "1 / 1" }}
        />
      ),
    },
    {
      field: "fullName",
      headerName: "Full name",
      width: 150,
      valueGetter: (value, row) =>
        `${row.firstName || ""} ${row.lastName || ""}`,
    },
    { field: "role", headerName: "Role", width: 100 },
  ];

  const getAllEmergencyRequests = async () => {
    const res = await dispatch(getAllRequests());
    setRequests(res.payload.data);
    setIsFetched(true);
  };

  const getAllRepairCenters = async () => {
    const res = await dispatch(GetAllRepairCenters());
    setRepairCenters(res.payload.data);
  };

  const fetchAllUsers = async () => {
    const res = await dispatch(GetAllUsers());
    const auths = res.payload.data;
    setUsers(auths.filter((auth) => auth.role === "User"));
    setTechnicians(auths.filter((auth) => auth.role === "Technician"));
    setAuths(
      auths.filter(
        (auth) => auth.role !== "Admin" && auth.role !== "SuperAdmin"
      )
    );
  };

  useEffect(() => {
    fetchAllUsers();
    getAllRepairCenters();
    getAllEmergencyRequests();
  }, []);

  return (
    <>
      <AdminNav name="Dashboard" />
      {isFetched ? (
        <>
          <div className="cards d-flex align-items-center justify-content-between column-gap-2 px-3 flex-wrap">
            <AdminCard name="Total Users" total={users.length} />

            <AdminCard name="Total Technicians" total={technicians.length} />

            <AdminCard
              name="Total Repair Centers"
              total={repairCenters.length}
            />

            <AdminCard name="Total Requests" total={requests.length} />
          </div>

          <div className="tables px-3 d-flex justify-content-between">
            <SimpleTable
              title={"Recent Requests"}
              rows={requests.slice(0, 3)}
              columns={requestColumns}
              styles={{ width: "69%" }}
            />

            <SimpleTable
              title={"Recent Auths"}
              rows={auth.slice(-3).reverse()}
              columns={userColumns}
              styles={{ width: "29%" }}
            />
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Dashboard;
