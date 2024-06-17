import AdminNav from "../../../components/AdminNav/AdminNav";
import img from "../../../Assents/143086968_2856368904622192_1959732218791162458_n.png";
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationIcon from "@mui/icons-material/LocationCity";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { GetspacificepairCenter } from "../../../store/RepairCenterSlice";
import SimpleTable from "../../../components/SimpleTable/SimpleTable";
import Loading from "../../../components/Loading/Loading";

const RepairCenterProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [repairData, setRepairData] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [error, setError] = useState(false);

  const fetchRepairData = async () => {
    const res = await dispatch(GetspacificepairCenter(id));
    if (res.payload.status === 200) {
      setRepairData(res.payload.data);
    } else {
      setError(true);
    }
    setIsFetched(true);
  };

  useEffect(() => {
    fetchRepairData();
  }, []);

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
      width: 230,
      valueGetter: (value, row) =>
        `lat: ${row.coordinates.latitude} long: ${row.coordinates.longitude}`,
    },
    {
      field: "location",
      headerName: "Dropoff Location",
      width: 230,
      valueGetter: (value, row) =>
        `lat: ${
          row.dropOffLocation ? row.dropOffLocation.latitude : null
        } long: ${row.dropOffLocation ? row.dropOffLocation.longitude : null}`,
    },
  ];

  const technicianColumns = [
    { field: "name", headerName: "Technician Name", width: 200 },
    {
      field: "Number Of Requests",
      headerName: "Number Of Requests",
      width: 200,
      valueGetter: (value, row) => row.Requests.length,
    },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phoneNumber", headerName: "Phone Number", width: 200 },
    {
      field: "Rate",
      headerName: "Rate",
      width: 200,
      valueGetter: (value, row) => 0,
    },
  ];

  return (
    <>
      <AdminNav name="Repair Center Profile" />
      {isFetched ? (
        error ? (
          <div className="d-flex justify-content-center mt-5">
            <h2>There is no Repair Center with this id</h2>
          </div>
        ) : (
          <div className="d-flex w-100 align-items-center flex-column gap-3">
            <div className="d-flex gap-5 w-75 my-5 flex-wrap justify-content-center">
              <img
                src={repairData.Image ? repairData.Image.secure_url : img}
                alt=""
                className="rounded-circle"
                style={{ width: "12rem" }}
              />
              <div className="d-flex flex-column justify-content-center fs-5 gap-3 flex-grow-1">
                <div className="d-flex align-items-center gap-2">
                  <BadgeIcon sx={{ color: "var(--main-color)" }} />
                  {repairData.name}
                </div>
                <div className="d-flex align-items-center gap-2">
                  <EmailIcon sx={{ color: "var(--main-color)" }} />
                  {repairData.email}
                </div>
                <div className="d-flex align-items-center gap-2">
                  <PhoneIcon sx={{ color: "var(--main-color)" }} />
                  {repairData.phoneNumber}
                </div>
                <div className="d-flex align-items-start gap-2">
                  <LocationIcon sx={{ color: "var(--main-color)" }} />
                  {repairData.location.address}
                </div>
              </div>
            </div>
            <div className="tables w-75 d-flex flex-column align-items-center gap-5">
              <SimpleTable
                rows={[]}
                columns={requestColumns}
                title={"Repair Center Requests"}
              />
              <SimpleTable
                rows={[]}
                columns={technicianColumns}
                title={"All Technicians"}
              />
            </div>
          </div>
        )
      ) : (
        <Loading />
      )}
    </>
  );
};

export default RepairCenterProfile;
