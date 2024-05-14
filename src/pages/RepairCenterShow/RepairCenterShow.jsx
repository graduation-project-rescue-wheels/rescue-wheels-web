import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GetspacificepairCenter } from "../../store/RepairCenterSlice";
import GoogleMap from "./GoogleMap"; // Import the GoogleMap component
import { Table } from "react-bootstrap";
import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import img from "../../assets/5098287-Photoroom.png-Photoroom.png";
import Loading from "../../components/Loading/Loading";

const RepairCenterShow = () => {
  const [currentLocation, setCurrentLocation] = useState(null);

  const { id } = useParams();
  const dispatch = useDispatch();
  const [repairData, setRepairData] = useState([]);
  const [image, setImage] = useState("");
  const [dataFetched, setDataFetched] = useState(false);
  const fetchRepairData = async () => {
    // setDataFetched(true);
    const res = await dispatch(GetspacificepairCenter(id));
    setRepairData(res.payload.data);
    console.log("Repair center data fetched successfully:", repairData);
    // setImage(res.payload.data.Image.secure_url);
    console.log(res.payload.data.location.coords);
    setCurrentLocation({
      lat: res.payload.data.location.coords.latitude,
      lng: res.payload.data.location.coords.longitude,
    });
    setDataFetched(true);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting the current location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    fetchRepairData();
    // getCurrentLocation();
  }, []);
  const initialCenter = currentLocation;
  const markerPosition = currentLocation;

  return (
    <>
      {dataFetched ? (
        <>
          <div className="mx-auto text-center">
            <img
              src={repairData.Image ? repairData.Image.secure_url : img}
              className="w-25"
              alt=""
            />
          </div>
          <div className="col-md-6 mx-auto">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">Phone</TableCell>
                    <TableCell align="right">Number Of Requests</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {repairData?.map((row) => ( */}
                  <TableRow
                    key={repairData.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {repairData.name}
                    </TableCell>
                    <TableCell align="right">{repairData.email}</TableCell>
                    <TableCell align="right">
                      {repairData.phoneNumber}
                    </TableCell>
                    <TableCell align="right">{0}</TableCell>
                  </TableRow>
                  {/* ))} */}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="mt-5 bg-black d-block ">
            <GoogleMap
              dispatch={dispatch}
              initialCenter={initialCenter}
              markerPosition={markerPosition}
            />
          </div>
        </>
      ) : (
        <div className="mt-5">
          <Loading />
        </div>
      )}
    </>
  );
};

export default RepairCenterShow;
