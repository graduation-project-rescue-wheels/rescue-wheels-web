import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as YUP from "yup";
import img1 from '../../assets/Saly-3 (1).png';
import { useDispatch } from "react-redux";
import { HandelRegister } from "../../store/AuthSlice";
import toast, { Toaster } from "react-hot-toast";

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
    password: YUP.string().required("Password is required").min(6, "Password must be at least 6 characters").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,"   & At least one lowercase letter At least one uppercase letter At least one digit At least one special character (in the set !@#$%^&*)  Minimum length of 8 characters"),
    confirmPassword: YUP.string().required("Confirm password is required").oneOf([YUP.ref("password"), null], "Passwords must match"),
    mobileNumber: YUP.string().required("Mobile number is required").matches(/^[0-9]{11}$/, "Enter a valid mobile number"),
  });

  let RegisterForm = useFormik({
    initialValues: {
      firstName: "",
      lastName:"",
      email: "",
      password: "",
      confirmPassword: "",
      mobileNumber: "",
      role:"User"
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
        console.log(res);
        // & Toastify  
        if(res.payload.status === 201){
          toast.success(res.payload.data.message, {
            style: {
              border: '1px solid #e48700',
              padding: '16px',
              color: '#000000',
            },
            iconTheme: {
              primary: '#e48700',
              secondary: '#FFFAEE',
            },
          });
        }else{
          toast.error(res.payload.message, {
            style: {
              border: '1px solid #e48700',
              padding: '16px',
              color: '#000000',
            },
            iconTheme: {
              primary: '#e48700',
              secondary: '#FFFAEE',
            },
          });
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
            <div className="" style={{ height: '100vh', backgroundColor: '#e48700', position: 'relative' }}>
              <div>
                <img src={img1} alt="img1" style={{ width: '70%', height: '70%', bottom: '-2%',left:'20%', position: 'absolute', zIndex: '0' }} />
              </div>
              <div className="d-flex flex-column justify-content-center align-items-center h-100 text-light" style={{ position: 'relative', zIndex: '8796' }}>
                <h2>Welcome to Rescue Wheels</h2>
                <p>Already have an account?</p>
                <p style={{ cursor: 'pointer' }} onClick={() => navigate('/login')}>Sign In</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 p-0 "style={{ height: '100vh'}}>
            <div className="d-flex flex-column justify-content-center align-items-center h-100 bg-white">
              <h2>Sign Up</h2>
              {errMessage && (
                <div className="alert alert-danger">
                  <p>{errMessage}</p>
                </div>
              )}
              <form onSubmit={RegisterForm.handleSubmit} className="w-75">
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="firstName"
                    onChange={RegisterForm.handleChange}
                    onBlur={RegisterForm.handleBlur}
                    value={RegisterForm.values.firstName}
                  />
                  {RegisterForm.touched.firstName && RegisterForm.errors.firstName && (
                    <div className="alert alert-danger mt-2">{RegisterForm.errors.firstName}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    onChange={RegisterForm.handleChange}
                    onBlur={RegisterForm.handleBlur}
                    value={RegisterForm.values.lastName}
                  />
                  {RegisterForm.touched.lastName && RegisterForm.errors.lastName && (
                    <div className="alert alert-danger mt-2">{RegisterForm.errors.lastName}</div>
                  )}
                </div>
                
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    onChange={RegisterForm.handleChange}
                    onBlur={RegisterForm.handleBlur}
                    value={RegisterForm.values.email}
                  />
                  {RegisterForm.touched.email && RegisterForm.errors.email && (
                    <div className="alert alert-danger mt-2">{RegisterForm.errors.email}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="mobileNumber"
                    name="mobileNumber"
                    onChange={RegisterForm.handleChange}
                    onBlur={RegisterForm.handleBlur}
                    value={RegisterForm.values.mobileNumber}
                  />
                  {RegisterForm.touched.mobileNumber && RegisterForm.errors.mobileNumber && (
                    <div className="alert alert-danger mt-2">{RegisterForm.errors.mobileNumber}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    onChange={RegisterForm.handleChange}
                    onBlur={RegisterForm.handleBlur}
                    value={RegisterForm.values.password}
                  />
                  {RegisterForm.touched.password && RegisterForm.errors.password && (
                    <div className="alert alert-danger mt-2">{RegisterForm.errors.password}</div>
                  )}
                </div>
                
                <div className="mb-3">
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
                </div>
                <div className="d-flex justify-content-between">
                  <button
                    type="submit"
                    className="btn border-0  w-100"
                    disabled={!(RegisterForm.isValid && RegisterForm.dirty) || loading}
                    style={{backgroundColor:'#e48700',borderBlockColor:'#e48700',boxShadow:'1px 1px 1px #e48700'}}
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
