import { useFormik } from "formik";
import * as YUP from "yup";
import Navbar from "../../components/Navbar/Navbar"
import Input from './../../components/Input';
import { useState } from 'react';
import { addVehicle, getUserData, getVehicleById } from "../../store/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import "./Vehicles.css";
import AddIcon from '@mui/icons-material/Add';
import VehicleItem from "../../components/VehicleItem";


const Vehicles = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.AuthData.UserData);
    let [errMessage, setErrMessage] = useState("");

    let validationSchema = YUP.object({
        make: YUP.string().required("Make is required"),
        model: YUP.string().required("Modal is required"),
        licensePlate: YUP.string().required("Type is required"),
    });

    let VehicleAdd = useFormik({
        initialValues: {
            make: "",
            model: "",
            type: "",
            energySource: "",
            licensePlate: "",
            owner: user._id
        },
        validationSchema,
        onSubmit: handleFormSubmitVehicleAdd,
    });

    async function handleFormSubmitVehicleAdd() {
        setErrMessage("");
        await dispatch(addVehicle(VehicleAdd.values));
        VehicleAdd.resetForm();
        await dispatch(getUserData());
    }


    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <Navbar />
            <h2 className="text-center" style={{ marginTop: "100px" }}>My Vehicles</h2>
            <div className="card w-75 mb-3  border-0 ms-auto shadow-lg me-auto mt-3">
                <div className="card-body position-relative d-flex flex-column align-items-center" style={{ height: "75vh" }}>
                    <div className="cards w-100 d-flex flex-column mt-3 align-items-center overflow-y-scroll" style={{ height: "80%" }}>
                        {
                            user.vehicles_IDS.length === 0 ?
                                <p className="card-text" style={{ justifySelf: "center" }}>There are no registered vehicles</p>
                                :
                                user.vehicles_IDS.map((id) => {
                                    return <VehicleItem id={id} />
                                })
                        }
                    </div>
                    <div
                        className="btn text-decoration-none text-white rounded-circle d-flex justify-content-center position-absolute align-items-center border-0"
                        data-bs-target="#addVehicles"
                        data-bs-toggle="modal"
                        style={{ backgroundColor: "#e48700", width: "50px", height: "50px", bottom: "50px", right: "50px" }}
                    >
                        <AddIcon
                            style={{ height: "50px", width: "50px", color: "white" }}
                        />
                    </div>

                    <div className="modal fade" id="addVehicles" aria-hidden="true" aria-labelledby="addVehiclesLabel" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered modal-xl">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="addVehiclesLabel">New Vehicle</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <Input
                                        text={"Vehicle Make"}
                                        type='make'
                                        name='make'
                                        id='make'
                                        onChange={VehicleAdd.handleChange}
                                        onBlur={VehicleAdd.handleBlur}
                                        value={VehicleAdd.values.make}
                                        formT={VehicleAdd.touched.make}
                                        formE={VehicleAdd.errors.make}
                                    />
                                    <Input
                                        text={"Vehicle Modal"}
                                        type='model'
                                        name='model'
                                        id='model'
                                        onChange={VehicleAdd.handleChange}
                                        onBlur={VehicleAdd.handleBlur}
                                        value={VehicleAdd.values.model}
                                        formT={VehicleAdd.touched.model}
                                        formE={VehicleAdd.errors.model}
                                    />
                                    <Input
                                        text={"License Plate"}
                                        type='licensePlate'
                                        name='licensePlate'
                                        id='licensePlate'
                                        onChange={VehicleAdd.handleChange}
                                        onBlur={VehicleAdd.handleBlur}
                                        value={VehicleAdd.values.licensePlate}
                                        formT={VehicleAdd.touched.licensePlate}
                                        formE={VehicleAdd.errors.licensePlate}
                                    />
                                    <div className="mb-3">
                                        <label htmlFor="vehicleType" className="form-label text-capitalize">Select Vehicle Type</label>
                                        <select
                                            className="form-select mb-3"
                                            aria-label="Default select example"
                                            name='type'
                                            onChange={VehicleAdd.handleChange}
                                            onBlur={VehicleAdd.handleBlur}
                                            value={VehicleAdd.values.type}
                                        >
                                            <option value="none">Select Vehicle Type</option>
                                            <option value="car">car</option>
                                            <option value="motorcycle">motorcycle</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="energySource" className="form-label text-capitalize">Select Energy Source</label>
                                        <select
                                            className="form-select mb-3"
                                            aria-label="Default select example"
                                            name='energySource'
                                            onChange={VehicleAdd.handleChange}
                                            onBlur={VehicleAdd.handleBlur}
                                            value={VehicleAdd.values.energySource}
                                        >
                                            <option value="none">Select Energy Source</option>
                                            <option value="petrol">petrol</option>
                                            <option value="diesel">diesel</option>
                                            <option value="EV">EV</option>
                                        </select>
                                    </div>

                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="submit"
                                        className="btn"
                                        data-bs-toggle="modal"
                                        onClick={handleFormSubmitVehicleAdd}
                                        style={{ backgroundColor: "#e48700", color: "white" }}
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Vehicles