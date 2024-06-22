import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import EvStationIcon from "@mui/icons-material/EvStation";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteVehicle, getVehicleById } from "../../store/VehicleSlice";
import { getUserData } from "../../store/AuthSlice";
import Loading from "../../components/Loading/Loading";
import axios from "axios";

const VehicleItem = ({ id }) => {
  const [vehiclesData, setVehiclesData] = useState([]);
  const [vehicle, setVehicle] = useState(null);
  const dispatch = useDispatch();

  async function handleDeleteVehicle() {
    await dispatch(deleteVehicle(id));
    await dispatch(getUserData());
  }

  async function fetchVehicleData() {
    const res = await dispatch(getVehicleById(id));
    setVehicle(res.payload.vehicle);
  }

  function fetchVehiclesData() {
    axios
      .get("../../../vehicles.json")
      .then((res) => setVehiclesData(res.data));
  }

  useEffect(() => {
    fetchVehiclesData();
    fetchVehicleData();
  }, []);

  return (
    <div
      className="d-flex align-items-center flex-wrap justify-content-between w-100"
      style={{ backgroundColor: "#efefef" }}
    >
      <div className="p-4">
        <div className="d-flex align-items-center gap-3 mb-3">
          <h2 className="m-0">{vehicle?.make + " " + vehicle?.model}</h2>
          <DeleteForeverIcon
            style={{
              fontSize: "2rem",
              cursor: "pointer",
              color: "red",
            }}
            onClick={handleDeleteVehicle}
          />
        </div>
        <div className="d-flex flex-wrap gap-5">
          <div className="d-flex flex-column">
            <span style={{ color: "#8b8b8b" }}>Type</span>
            <p style={{ fontWeight: "bold" }}>{vehicle?.type}</p>
          </div>
          <div className="d-flex flex-column">
            <span style={{ color: "#8b8b8b" }}>Year</span>
            <p style={{ fontWeight: "bold" }}>{vehicle?.modelYear}</p>
          </div>
          <div className="d-flex flex-column">
            <span style={{ color: "#8b8b8b" }}>Energy Source</span>
            <p style={{ fontWeight: "bold" }}>{vehicle?.energySource}</p>
          </div>
        </div>
      </div>
      <div className="card-logo p-4">
        {vehiclesData.map((v) => {
          if (v.name.toLowerCase() === vehicle?.make.toLowerCase()) {
            return (
              <img
                key={vehicle._id}
                src={v.image.source}
                alt=""
                style={{ width: "8rem" }}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default VehicleItem;
