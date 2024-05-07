import AdminNav from "../../../components/AdminNav/AdminNav";
import * as YUP from "yup";
import { useFormik } from "formik";
import Input from "../../../components/Input";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import GooglePlacesAutocomplete, {
  getLatLng,
  geocodeByAddress,
} from "react-google-places-autocomplete";
import {
  AddRepairCenter,
  GetAllRepairCenters,
  deleteRepairCenterById,
} from "../../../store/RepairCenterSlice";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import TableComponent from "../../../components/TableComponent/TableComponent";

const columns = [
  { field: "name", headerName: "RC Name", width: 250 },
  { field: "email", headerName: "Email", width: 250 },
  { field: "phoneNumber", headerName: "Mobile Number", width: 250 },
  { field: "numberOfEmployees", headerName: "No. Of Employees", width: 250 },
  {
    field: "view",
    headerName: "View",
    width: 250,
    renderCell: (params) => (
      <Link to={`/Admin/RepairCenter/${params.id}`}>
        <RemoveRedEyeIcon style={{ color: "var(--main-color)" }} />
      </Link>
    ),
  },
];

const RepairCenters = () => {
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [coords, setCoords] = useState({});
  const [rows, setRows] = useState(
    useSelector((state) => state.RepairCenterData.AllRepaircentersData.data)
  );
  console.log(rows);

  const getAllRepairCenters = async () => {
    const res = await dispatch(GetAllRepairCenters());
    setRows(res.payload.data);
  };

  async function handleFormSubmitRegister() {
    await dispatch(AddRepairCenter({ ...RegisterForm.values, coords }));
    getAllRepairCenters();
    RegisterForm.resetForm();
    setAddress("");
  }

  async function handleRepairCenterDelete(selected) {
    selected.forEach(async (e) => {
      await dispatch(deleteRepairCenterById(e));
      getAllRepairCenters();
    });
  }

  let validationSchema = YUP.object({
    name: YUP.string().required("Name is required"),
    description: YUP.string().required("Description is required"),
    numberOfEmployees: YUP.number().required("Number Of Employees is required"),
    email: YUP.string()
      .required("Email is required")
      .email("Enter a valid email"),
    password: YUP.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "   & At least one lowercase letter At least one uppercase letter At least one digit At least one special character (in the set !@#$%^&*)  Minimum length of 8 characters"
      ),
    // confirmPassword: YUP.string().required("Confirm password is required").oneOf([YUP.ref("password"), null], "Passwords must match"),
    phoneNumber: YUP.string()
      .required("Mobile number is required")
      .matches(/^[0-9]{11}$/, "Enter a valid mobile number"),
  });

  let RegisterForm = useFormik({
    initialValues: {
      name: "",
      description: "",
      numberOfEmployees: "",
      email: "",
      password: "",
      phoneNumber: "",
    },
    validationSchema,
    onSubmit: handleFormSubmitRegister,
  });

  useEffect(() => {
    updateCoords();
  }, [address]);

  const updateCoords = async () => {
    await geocodeByAddress(address.label)
      .then((results) => getLatLng(results[0]))
      .then((latLng) =>
        setCoords({
          longitude: latLng.lng,
          latitude: latLng.lat,
        })
      );
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <AdminNav name="Repair Centers" />
      <button
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        style={{
          backgroundColor: "var(--main-color)",
          color: "var(--secondry-color)",
          width: "200px",
          border: "none",
          padding: "10px",
          borderRadius: "10px",
          alignSelf: "end",
          margin: "0px 10px 10px 0",
        }}
      >
        Add Repair Center
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                New Repair Center
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="w-75">
                <Input
                  text={"Name"}
                  name="name"
                  id="name"
                  onChange={RegisterForm.handleChange}
                  onBlur={RegisterForm.handleBlur}
                  value={RegisterForm.values.name}
                  formT={RegisterForm.touched.name}
                  formE={RegisterForm.errors.name}
                />

                <div className="mb-3">
                  <label
                    htmlFor="location"
                    className="form-label text-capitalize"
                  >
                    Location
                  </label>

                  <GooglePlacesAutocomplete
                    className="form-control"
                    apiKey="AIzaSyB4BFqNlmu7N27rHdSydssJiyHvpvgzSc8"
                    selectProps={{
                      address,
                      onChange: setAddress,
                    }}
                  />
                  {/* <div className="alert alert-danger mt-2">error</div> */}
                </div>

                <Input
                  text={"Description"}
                  type="description"
                  name="description"
                  id="description"
                  onChange={RegisterForm.handleChange}
                  onBlur={RegisterForm.handleBlur}
                  value={RegisterForm.values.description}
                  formT={RegisterForm.touched.description}
                  formE={RegisterForm.errors.description}
                />
                <Input
                  text={"Number Of Employees"}
                  name="numberOfEmployees"
                  id="numberOfEmployees"
                  onChange={RegisterForm.handleChange}
                  onBlur={RegisterForm.handleBlur}
                  value={RegisterForm.values.numberOfEmployees}
                  formT={RegisterForm.touched.numberOfEmployees}
                  formE={RegisterForm.errors.numberOfEmployees}
                />
                <Input
                  text={"Email"}
                  name="email"
                  id="email"
                  onChange={RegisterForm.handleChange}
                  onBlur={RegisterForm.handleBlur}
                  value={RegisterForm.values.email}
                  formT={RegisterForm.touched.email}
                  formE={RegisterForm.errors.email}
                />
                <Input
                  text={"Mobile Number"}
                  name="phoneNumber"
                  id="phoneNumber"
                  onChange={RegisterForm.handleChange}
                  onBlur={RegisterForm.handleBlur}
                  value={RegisterForm.values.phoneNumber}
                  formT={RegisterForm.touched.phoneNumber}
                  formE={RegisterForm.errors.phoneNumber}
                />
                <Input
                  text={"Password"}
                  type="password"
                  name="password"
                  id="password"
                  onChange={RegisterForm.handleChange}
                  onBlur={RegisterForm.handleBlur}
                  value={RegisterForm.values.password}
                  formT={RegisterForm.touched.password}
                  formE={RegisterForm.errors.password}
                />
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn"
                data-bs-dismiss="modal"
                disabled={!(RegisterForm.isValid && RegisterForm.dirty)}
                onClick={RegisterForm.handleSubmit}
                style={{
                  backgroundColor: "var(--main-color)",
                  color: "var(--secondry-color)",
                }}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <TableComponent
        rows={rows}
        columns={columns}
        rowHeight={52}
        func={handleRepairCenterDelete}
      />
    </>
  );
};

export default RepairCenters;
