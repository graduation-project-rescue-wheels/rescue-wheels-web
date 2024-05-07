import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as YUP from "yup";
import img1 from '../../assets/Saly-3 (1).png';
import { useDispatch } from "react-redux";
import { HandelRegister } from "../../store/AuthSlice";
import { Toaster } from "react-hot-toast";
import Input from "../../components/Input";
import { showErrorToast, showSuccessToast } from "../../components/toast";


const Register = () => {
  const navigate = useNavigate();
  let [errMessage, setErrMessage] = useState("");
  let [loading, setLoading] = useState(false);

  let validationSchema = YUP.object({
    firstName: YUP.string().required("Name is required"),
    lastName: YUP.string().required("Name is required"),
    email: YUP.string()
      .required("Email is required")
      .email("Enter a valid email"),
    password: YUP.string().required("Password is required").min(6, "Password must be at least 6 characters").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, "   & At least one lowercase letter At least one uppercase letter At least one digit At least one special character (in the set !@#$%^&*)  Minimum length of 8 characters"),
    // confirmPassword: YUP.string().required("Confirm password is required").oneOf([YUP.ref("password"), null], "Passwords must match"),
    mobileNumber: YUP.string().required("Mobile number is required").matches(/^[0-9]{11}$/, "Enter a valid mobile number"),
  });

  let RegisterForm = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      // confirmPassword: "",
      mobileNumber: "",
      role: "User"
    },
    validationSchema,
    onSubmit: handleFormSubmitRegister,
  });

  const dispatch = useDispatch()
  async function handleFormSubmitRegister() {
    setLoading(true);
    setErrMessage("");

    console.log(RegisterForm.values);
    const res = await dispatch(HandelRegister(RegisterForm.values));
    setLoading(false);
    console.log(res);
    // & Toastify  
    if (res.payload.status) {
      showSuccessToast(res.payload.data.message);
      setTimeout(() => {
        navigate("/login")
      }, 2000)
    } else {
      showErrorToast(res.payload.message);
    }
  }

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className="container-fluid">
        <div className="row gy-5">
          <div className="col-md-6 p-0">
            <div className="" style={{ height: '100vh', backgroundColor: '#e48700', position: 'relative', overflow: "hidden" }}>
              <div>
                <img src={img1} alt="img1" style={{ width: '70%', height: '70%', bottom: '-2%', left: '20%', position: 'absolute' }} />
              </div>
              <div className="d-flex flex-column justify-content-center align-items-center h-100 text-light" style={{ position: 'relative', zIndex: '8796' }}>
                <h2>Welcome to Rescue Wheels</h2>
                <p>Already have an account?</p>
                <p style={{ cursor: 'pointer' }} onClick={() => navigate('/login')}>Sign In</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 p-0 " style={{ height: '100vh' }}>
            <div className="d-flex flex-column justify-content-center align-items-center h-100 bg-white">
              <h2>Sign Up</h2>
              {errMessage && (
                <div className="alert alert-danger">
                  <p>{errMessage}</p>
                </div>
              )}
              <form onSubmit={RegisterForm.handleSubmit} className="w-75">
                <Input
                  text={"First Name"}
                  type='firstName'
                  name='firstName'
                  id='firstName'
                  onChange={RegisterForm.handleChange}
                  onBlur={RegisterForm.handleBlur}
                  value={RegisterForm.values.type}
                  formT={RegisterForm.touched.firstName}
                  formE={RegisterForm.errors.firstName}
                />

                <Input
                  text={"Last Name"}
                  type='lastName'
                  name='lastName'
                  id='lastName'
                  onChange={RegisterForm.handleChange}
                  onBlur={RegisterForm.handleBlur}
                  value={RegisterForm.values.type}
                  formT={RegisterForm.touched.lastName}
                  formE={RegisterForm.errors.lastName}
                />

                <Input
                  text={"Email"}
                  type='email'
                  name='email'
                  id='email'
                  onChange={RegisterForm.handleChange}
                  onBlur={RegisterForm.handleBlur}
                  value={RegisterForm.values.type}
                  formT={RegisterForm.touched.email}
                  formE={RegisterForm.errors.email}
                />

                <Input
                  text={"Mobile Number"}
                  type='mobileNumber'
                  name='mobileNumber'
                  id='mobileNumber'
                  onChange={RegisterForm.handleChange}
                  onBlur={RegisterForm.handleBlur}
                  value={RegisterForm.values.type}
                  formT={RegisterForm.touched.mobileNumber}
                  formE={RegisterForm.errors.mobileNumber}
                />

                <Input
                  text={"Password"}
                  type='password'
                  name='password'
                  id='password'
                  onChange={RegisterForm.handleChange}
                  onBlur={RegisterForm.handleBlur}
                  value={RegisterForm.values.type}
                  formT={RegisterForm.touched.password}
                  formE={RegisterForm.errors.password}
                />

                {/* <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    onChange={RegisterForm.handleChange}
                    onBlur={RegisterForm.handleBlur}
                    value={RegisterForm.values.confirmPassword}
                  />
                  {RegisterForm.touched.confirmPassword && RegisterForm.errors.confirmPassword && (
                    <div className="alert alert-danger mt-2">{RegisterForm.errors.confirmPassword}</div>
                  )}
                </div> */}

                <div className="d-flex justify-content-between">
                  <button
                    type="submit"
                    className="btn border-0  w-100"
                    disabled={!(RegisterForm.isValid && RegisterForm.dirty) || loading}
                    style={{ backgroundColor: '#e48700', borderBlockColor: '#e48700', boxShadow: '1px 1px 1px #e48700' }}
                  >
                    {loading ? 'Loading...' : 'Register'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
