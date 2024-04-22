import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GetspacificepairCenter } from "../../store/RepairCenterSlice";
import GoogleMap from './GoogleMap'; // Import the GoogleMap component
import { Table } from 'react-bootstrap';
import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const RepairCenterShow = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [repairData, setRepairData] = useState([]);
    const [image, setImage] = useState('');
    const [dataFetched,setDataFetched] = useState(false)
    const fetchRepairData = async () => {
      setDataFetched(true)
            const res = await dispatch(GetspacificepairCenter(id));
            setRepairData(res.payload.data.Technicians);
            console.log("Repair center data fetched successfully:", repairData);
            setImage(res.payload.data.Image.secure_url);
            setDataFetched(false)
    };

    useEffect(() => {
        fetchRepairData();
    }, [dataFetched]);
    const initialCenter = { lat: 30.0444, lng: 31.2357 }; 
    const markerPosition = { lat: 30.0444, lng: 31.2357 }; 

    return (
      <>
       
            <div className="mx-auto text-center mt-5">
                <img src={image} style={{width:'10%',height:'10%'}} className="" alt=""/>
            </div>
            <div className='col-md-6 mx-auto'>
        

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
          {repairData?.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.phoneNumber}</TableCell>
              <TableCell align="right">{row.Requests.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
         
           </div>
  <div className="mt-5 bg-black d-block ">
                <GoogleMap  initialCenter={initialCenter} markerPosition={markerPosition} />
            </div>
          
      </>
    );
}

export default RepairCenterShow;
