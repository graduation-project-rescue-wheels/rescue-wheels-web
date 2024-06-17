import  { useState } from "react";
import style from "../../Assents/Style/Auth.module.css";
import logo from "../../Assents/Images/Auth/logoo.png";
import ArrowTop from "../../Assents/Images/Auth/ArrowTop.png";
import ArrowBottom from "../../Assents/Images/Auth/ArrowBottom.png";
import { useFormik } from "formik";
import * as YUP from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { HandelRegister } from "../../store/AuthSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {

  let [ErrorMessage, setErrorMessage] = useState("");
  let [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [alertType,setalertType]=useState("")
  const navigate = useNavigate()
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const dispatch = useDispatch()
  const validationSchema = YUP.object({
    firstName: YUP.string().required("First Name is required"),
    lastName:  YUP.string().required("Last Name is required"),
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
    confirmPassword: YUP.string()
      .required("Confirm password is required")
      .oneOf([YUP.ref("password"), null], "Passwords must match"),
    mobileNumber: YUP.string()
      .required("Mobile number is required")
      .matches(/^[0-9]{11}$/, "Enter a valid mobile number"),
  });
  const RegisterForm = useFormik({
    initialValues: {
        firstName:"",
        lastName: "",
        email:"",
        password: "",
        confirmPassword:"",
        mobileNumber:"",
    },
    validationSchema,
    onSubmit: RegisterSubmit,
  });
  async function RegisterSubmit(val) {
    console.log(val);
    localStorage.setItem('email',val.email)
    setLoading(true);
    const res = await dispatch(HandelRegister(val))
    console.log(res.payload);
    if (res.payload.status !== true) {
      setalertType('alert-danger')
    }else{
      setalertType('alert-success')
    }
    setErrorMessage(res.payload.message);
    setLoading(false);
  }
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmNewPasswordVisibility = () => {
    setShowConfirmNewPassword(!showConfirmNewPassword);
  };
  return (
    <div>
      <div className="m-0 p-0">
        <div className="row m-0 p-0">
        <div className={[style.bgLeft,"col-md-6 d-none d-lg-block"].join(" ")}>
         <div className={[style.mainContainer].join(" ")}>
         <div className={[style.arrow, style.arrowTopLeft].join(" ")}>
            <img className="w-75" src={ArrowTop} alt="ArrowTop" />
          </div>

          {/* Logo */}
          <div className="w-75 m-auto">
            <img className="w-50" src={logo} alt="logo" />
          </div>

          <div className={[style.arrow, style.arrowBottomRight].join(" ")}>
            <img className="w-75" src={ArrowBottom} alt="ArrowTop" />
          </div>
         </div>
        </div>
          <div style={{overflow:'auto'}} className={[style.RegisterFormContainer, "col-md-6"].join(" ")}>
            {/* Logo */}
            <div className="w-75 m-auto mt-5">
              <h6 className={style.h6}>  Sign Up</h6>
              {ErrorMessage ? (
                
                <div className={`alert py-1 ${alertType}`}>
    <p>{ErrorMessage}</p>
  </div>
              ) : (
                ""
              )}
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">
                  {" "}
                  First Name
                </label>
                <input
                  type="text"
                  className={[style.input, "form-control"].join(" ")}
                  id="firstName"
                  name="firstName"
                  onChange={RegisterForm.handleChange}
                  onKeyUp={RegisterForm.handleBlur}
                  value={RegisterForm.values.firstName}
                />
                {RegisterForm.touched.firstName &&
                RegisterForm.errors.firstName ? (
                  <div className="alert py-1  alert-danger">
                    <p>{RegisterForm.errors.firstName}</p>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                  {" "}
                  Last Name
                </label>
                <input
                  type="text"
                  className={[style.input, "form-control"].join(" ")}
                  id="lastName"
                  name="lastName"
                  onChange={RegisterForm.handleChange}
                  onKeyUp={RegisterForm.handleBlur}
                  value={RegisterForm.values.lastName}
                />
                {RegisterForm.touched.lastName &&
                RegisterForm.errors.lastName ? (
                  <div className="alert py-1  alert-danger">
                    <p>{RegisterForm.errors.lastName}</p>
                  </div>
                ) : (
                  ""
                )}
              </div>
              {/* email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  {" "}
                  Email
                </label>
                <input
                  type="email"
                  className={[style.input, "form-control"].join(" ")}
                  id="email"
                  name="email"
                  onChange={RegisterForm.handleChange}
                  onKeyUp={RegisterForm.handleBlur}
                  value={RegisterForm.values.email}
                />
                {RegisterForm.touched.email &&
                RegisterForm.errors.email ? (
                  <div className="alert py-1  alert-danger">
                    <p>{RegisterForm.errors.email}</p>
                  </div>
                ) : (
                  ""
                )}
              </div>
              {/* phone */}
              <div className="mb-3">
  <label htmlFor="mobileNumber" className="form-label">
    Phone Number
  </label>
  <input
    type="tel"
    className={[style.input, "form-control"].join(" ")}
    id="mobileNumber"
    name="mobileNumber"
    onChange={RegisterForm.handleChange}
    onKeyUp={RegisterForm.handleBlur}
    value={RegisterForm.values.mobileNumber}
  />
  {RegisterForm.touched.mobileNumber && RegisterForm.errors.mobileNumber ? (
    <div className="alert py-1 alert-danger">
      <p>{RegisterForm.errors.mobileNumber}</p>
    </div>
  ) : (
    ""
  )}
</div>

              <div className="mb-">
              <label htmlFor="password" className="form-label">
              Password
              </label>
              <div className="input-group">
                <span
                  onClick={togglePasswordVisibility}
                  className={style.showPassword}
                >
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className={[style.input, "form-control"].join(" ")}
                  id="password"
                  name="password"
                  onChange={RegisterForm.handleChange}
                  onKeyUp={RegisterForm.handleBlur}
                  value={RegisterForm.values.password}
                />
              </div>{" "}
              {RegisterForm.touched.password && RegisterForm.errors.password ? (
                <div className="alert py-1 alert-danger">
                  <p>{RegisterForm.errors.password}</p>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="mb-2">
              <label htmlFor="confirmPassword" className="form-label">
               Password Confirmation
                     </label>
              <div className="input-group">
                <span
                  onClick={toggleConfirmNewPasswordVisibility}
                  className={style.showPassword}
                >
                  <FontAwesomeIcon icon={showConfirmNewPassword ? faEye : faEyeSlash} />
                </span>
                <input
                  type={showConfirmNewPassword ? "text" : "password"}
                  className={[style.input, "form-control"].join(" ")}
                  id="confirmPassword"
                  name="confirmPassword"
                  onChange={RegisterForm.handleChange}
                  onKeyUp={RegisterForm.handleBlur}
                  value={RegisterForm.values.confirmPassword}
                />
              </div>{" "}
              {RegisterForm.touched.confirmPassword && RegisterForm.errors.confirmPassword ? (
                <div className="alert py-1 alert-danger">
                  <p>{RegisterForm.errors.confirmPassword}</p>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className={style.rigthTextHead}>
              
            </div>
            {loading ? (
              <button
                type="button"
                className={[style.submitbutton, "btn"].join(" ")}
              >
                <i className="fa-solid fa-spinner fa-spin"></i>
              </button>
            ) : (
              <button
                onClick={RegisterForm.handleSubmit}
                disabled={!(RegisterForm.isValid && RegisterForm.dirty)}
                type="submit"
                className={[style.submitbutton, "btn"].join(" ")}
              >
 Sign Up              </button>
            )}
          </div>
          <div className={[style.ToLogin, "my-4"].join(" ")} >
          <p>Already have an account?
          <span onClick={()=>navigate('/login')}> Sign In</span>
            </p>

            </div>
          </div>
          
        </div>
        
      </div>
    </div>
  );
};

export default Register;
