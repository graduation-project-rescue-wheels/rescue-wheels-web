import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import * as YUP from "yup";
import img1 from '../../assets/Saly-3 (1).png'
import { useDispatch, useSelector } from "react-redux";
import { HandelLogin } from "../../store/AuthSlice";
import { Toaster } from "react-hot-toast";
import Input from "../../components/Input";
import { showErrorToast } from "../../components/toast";


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
    password: YUP.string().required("Password is required").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, " At least one lowercase letter At least one uppercase letter At least one digit At least one special character (in the set !@#$%^&*)  Minimum length of 8 characters"),
  });
  const handleFormSubmitLogin = async () => {
    // e.preventDefault();
    setLoading(true);
    console.log(LoginForm.values);
    const res = await dispatch(HandelLogin(LoginForm.values))
    setLoading(false);
    console.log(res.payload.status);

    if (res.payload.status === 200) {
      localStorage.setItem("Token", res.payload.Token);
      localStorage.setItem('currentUser', JSON.stringify(res.payload.userData))
      navigate('/HomePage')
    } else {
      showErrorToast("Email or Password is incorrect");
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
            <div className="" style={{ height: '100vh', backgroundColor: '#e48700', position: 'relative', overflow: "hidden" }}>
              <div>
                <img src={img1} alt="img1" style={{ width: '70%', height: '70%', bottom: '-2%', left: '20%', position: 'absolute', zIndex: '0' }} />
              </div>
              <div className="d-flex flex-column justify-content-center align-items-center h-100 text-light" style={{ position: 'relative', zIndex: '8796' }}>
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
                <Input
                  text={"Email"}
                  type='email'
                  name='email'
                  id='email'
                  onChange={LoginForm.handleChange}
                  onBlur={LoginForm.handleBlur}
                  value={LoginForm.values.type}
                  formT={LoginForm.touched.email}
                  formE={LoginForm.errors.email}
                />

                <Input
                  text={"Password"}
                  type='password'
                  name='password'
                  id='password'
                  onChange={LoginForm.handleChange}
                  onBlur={LoginForm.handleBlur}
                  value={LoginForm.values.type}
                  formT={LoginForm.touched.password}
                  formE={LoginForm.errors.password}
                />

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
                    style={{ backgroundColor: '#e48700', borderBlockColor: '#e48700', boxShadow: '1px 1px 1px #e48700' }}
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
