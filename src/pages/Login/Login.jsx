import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import * as YUP from "yup";
import img1 from '../../assets/Saly-3 (1).png'
import { useDispatch } from "react-redux";
import { HandelLogin } from "../../store/AuthSlice";
import toast, { Toaster } from "react-hot-toast";
const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let [errMessage, setErrMessage] = useState("");
  let [loading, setLoading] = useState(false);
  let validationSchema = YUP.object({
    email: YUP.string()
      .required("Email is Required")
      .email()
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        "Enter Vaild Email"
      ),
      password: YUP.string().required("Password is required").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/," At least one lowercase letter At least one uppercase letter At least one digit At least one special character (in the set !@#$%^&*)  Minimum length of 8 characters"),
    });
  const handleFormSubmitLogin = async () => {
    // e.preventDefault();
    setLoading(true);
    console.log(LoginForm.values);
    const res = await dispatch(HandelLogin(LoginForm.values))
    setLoading(false);
    console.log(res);
    if(res.payload.status === 200){
      toast.success(res.payload.message, {
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
    localStorage.setItem("Token", res.payload.Token);
    navigate('/HomePage')
    }else{
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
    }
 
    setErrMessage("")
  }
  let LoginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleFormSubmitLogin,
  });

  

  return (
    <>
       <Toaster
  position="top-center"
  reverseOrder={false}
/>
      <div className="container-fluid">
        <div className="row gy-5">
          <div className="col-md-6 p-0">
            <div className="" style={{ height: '100vh' ,backgroundColor:'#e48700',position:'relative'}}>
            <div>
            <img src={img1} alt="img1" style={{ width: '70%', height: '70%', bottom: '-2%',left:'20%', position: 'absolute', zIndex: '0' }} />
            </div>
              <div className="d-flex flex-column justify-content-center align-items-center h-100 text-light" style={{position:'relative',zIndex:'8796'}}>
                <h2>Welcome to Rescue Wheels</h2>
                <p>No Account?</p>
                <p style={{ cursor: 'pointer' }} onClick={() => navigate('/Register')}>Sign Up</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 p-0">
            <div className="d-flex flex-column justify-content-center align-items-center h-100 bg-white">
              <h2>Sign In</h2>
              {errMessage && (
                <div className="alert alert-danger">
                  <p>{errMessage}</p>
                </div>
              )}
              <form onSubmit={LoginForm.handleSubmit} className="w-75">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    onChange={LoginForm.handleChange}
                    onBlur={LoginForm.handleBlur}
                    value={LoginForm.values.email}
                  />
                  {LoginForm.touched.email && LoginForm.errors.email && (
                    <div className="alert alert-danger mt-2">{LoginForm.errors.email}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    onChange={LoginForm.handleChange}
                    onBlur={LoginForm.handleBlur}
                    value={LoginForm.values.password}
                  />
                  {LoginForm.touched.password && LoginForm.errors.password && (
                    <div className="alert alert-danger mt-2">{LoginForm.errors.password}</div>
                  )}
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                    name="rememberMe"
                  />
                  <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                </div>
                    <div className="text-end">
                    <p>Forgot Password?</p>

                    </div>
                <div className="d-flex justify-content-between">
                <button
                    // type="submit"
                    className="btn border-0  w-100 text-white"
                    disabled={!(LoginForm.isValid && LoginForm.dirty) || loading}
                    style={{backgroundColor:'#e48700',borderBlockColor:'#e48700',boxShadow:'1px 1px 1px #e48700'}}
                  >
                    {loading ? 'Loading...' : 'Login'}
                  </button>
               
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;
