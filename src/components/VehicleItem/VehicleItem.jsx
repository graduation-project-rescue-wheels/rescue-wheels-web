import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import EvStationIcon from '@mui/icons-material/EvStation';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { useEffect, useState } from 'react'
import { deleteVehicle, getUserData, getVehicleById } from '../../store/AuthSlice';
import { useDispatch } from 'react-redux';

const VehicleItem = ({ id }) => {
    const [vehicle, setVehicle] = useState(null)
    const dispatch = useDispatch()

    async function handleDeleteVehicle() {
        await dispatch(deleteVehicle(id))
        await dispatch(getUserData());
    }

    async function fetchVehicleData() {
        const res = await dispatch(getVehicleById(id))
        setVehicle(res.payload.vehicle)
    }

    useEffect(() => {
        fetchVehicleData();
    }, [])
    return (
        <div className="card">
            <div className="card-body">
                <div className="icons d-flex justify-content-between">
                    {
                        vehicle?.type === "car" ?
                            <DirectionsCarIcon />
                            :
                            <TwoWheelerIcon />
                    }

                    {
                        vehicle?.energySource === "petrol" || vehicle?.energySource === "diesel" ?
                            <LocalGasStationIcon />
                            :
                            <EvStationIcon />
                    }

                </div>
                <div className="info d-flex justify-content-between">
                    <p>{vehicle?.make + vehicle?.model}</p>
                    <p>{vehicle?.licensePlate}</p>
                </div>
                <button
                    className='m-0 p-0'
                    onClick={handleDeleteVehicle}
                    style={{ float: "right", border: "none", backgroundColor: "transparent" }}>
                    <DeleteForeverIcon />
                </button>
            </div>
        </div>
    )
}

export default VehicleItem