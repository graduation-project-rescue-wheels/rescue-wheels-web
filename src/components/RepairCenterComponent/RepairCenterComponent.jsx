import { useNavigate } from "react-router-dom";
import "./RepairCenterComponent.css";
import img from "../../assets/5098287-Photoroom.png-Photoroom.png";
import GoogleMap from "../../pages/RepairCenterShow/GoogleMap";
import { useDispatch } from "react-redux";
import DescriptionIcon from "@mui/icons-material/Description";
import CallIcon from "@mui/icons-material/Call";
import LocationOnIcon from "@mui/icons-material/LocationOn";

// eslint-disable-next-line react/prop-types
const RepairCenterComponent = ({
  id,
  name,
  description,
  image,
  location,
  phoneNumber,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mapStyle = {
    position: "relative",
    width: "100%",
    height: "50%",
  };

  return (
    <div className="componenthover p-0">
      <img
        src={image ? image : img}
        style={{
          width: "9rem",
          margin: "1rem",
          position: "absolute",
          zIndex: "100",
          top: "50px",
          backgroundColor: "white",
          aspectRatio: "1 / 1",
          borderRadius: "50%",
          padding: "0.5rem"
        }}
        alt="repair center"
      />
      <div style={mapStyle}>
        <GoogleMap
          dispatch={dispatch}
          initialCenter={{
            lat: location.coords.latitude,
            lng: location.coords.longitude,
          }}
          markerPosition={{
            lat: location.coords.latitude,
            lng: location.coords.longitude,
          }}
        />
      </div>
      <div className="info d-flex align-items-center h-50">
        <div
          className="d-flex flex-column justify-content-evenly h-100 p-3"
          style={{ flex: "1" }}
        >
          <div className="d-flex" style={{ color: "var(--main-color)" }}>
            <h3 className="ms-2">{name}</h3>
          </div>
          <div className="div">
            <div className="d-flex">
              <DescriptionIcon />
              <h6 className="ms-2">{description}</h6>
            </div>
            <div className="d-flex">
              <CallIcon />
              <h6 className="ms-2">{phoneNumber}</h6>
            </div>
            <div className="d-flex">
              <LocationOnIcon />
              <h6 className="ms-2">{location.address}</h6>
            </div>
          </div>
          <button
            className="bookBtn"
            style={{
              marginRight: "1.5rem",
              padding: "0.5rem 1rem",
              border: "2px solid var(--main-color)",
              borderRadius: "1rem",
              backgroundColor: "var(--main-color)",
              color: "var(--secondry-color)",
              width: "fit-content",
            }}
            onClick={() => navigate(`/RepairCenterShow/${id}`)}
          >
            Book an appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default RepairCenterComponent;

// <div className="bg-white componenthover text-center align-items-center rounded-4 p-4">
//         <img
//           src={image ? image : img}
//           className=""
//           style={{ width: "2rem", aspectRatio: "1 / 1" }}
//           alt="repair center"
//         />

//         <div className="text-start">
//           <h6 className="mt-2 fw-bold">{name}</h6>
//         </div>
//         <p
//           className="ms-3 text-secondary text-start"
//           style={{ fontSize: "12px" }}
//         >
//           {description}
//         </p>

//         <div className="text-start" style={{ cursor: "pointer" }}>
//           <h6
//             className="mt-2 fw-bold"
//             onClick={() => navigate(`/RepairCenterShow/${id}`)}
//           >
//             View more {">"}{" "}
//           </h6>
//         </div>
//       </div>
