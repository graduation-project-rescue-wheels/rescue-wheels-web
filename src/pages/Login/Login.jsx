import React, { useState } from "react";
import style from "../../Assents/Style/Auth.module.css";
import logo from "../../Assents/Images/Auth/logoo.png";
import ArrowTop from "../../Assents/Images/Auth/ArrowTop.png";
import ArrowBottom from "../../Assents/Images/Auth/ArrowBottom.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { useFormik } from "formik";

import * as YUP from "yup";
import { Link, useNavigate } from "react-router-dom";
import { HandelLogin } from "../../store/AuthSlice";
import { useDispatch } from "react-redux";
function Login() {
  let [ErrorMessage, setErrorMessage] = useState("");
  let [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const validationSchema = YUP.object({
    email: YUP.string()
      .required("Email is Required")
      .email()
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        "Enter Vaild Email"
      ),
    password: YUP.string().required("Password is required").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, " At least one lowercase letter At least one uppercase letter At least one digit At least one special character (in the set !@#$%^&*)  Minimum length of 8 characters"),

  });
  const LoginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: LoginSubmit,
  });
  async function LoginSubmit(val) {
    console.log(val);
    const res = await dispatch(HandelLogin(val))
    console.log(res.payload);
    if(res.payload.status === 200){
      console.log('ss');
      localStorage.setItem("Token",res.payload.Token)
      navigate('/HomePage')
    }
    if(!(res.payload.data.status)){
      setErrorMessage(res.payload.data.errMsg)
    }
  }
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);

  };
  return (
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
        <div className={[style.loginFormContainer, "col-md-6"].join(" ")}>
          {/* Logo */}
          <div className="w-75 m-auto">
            <h5 className={style.h6}> Sign In</h5>
            {ErrorMessage ? (
              <div className="alert py-1  alert-danger">
                <p>{ErrorMessage}</p>
              </div>
            ) : (
              ""
            )}
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
                onChange={LoginForm.handleChange}
                onKeyUp={LoginForm.handleBlur}
                value={LoginForm.values.email}
              />
              {LoginForm.touched.email && LoginForm.errors.email ? (
                <div className="alert py-1  alert-danger">
                  <p>{LoginForm.errors.email}</p>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-group">
                
                <input
                  type={showPassword ? "text" : "password"}
                  className={[style.input, "form-control"].join(" ")}
                  id="password"
                  name="password"
                  onChange={LoginForm.handleChange}
                  onKeyUp={LoginForm.handleBlur}
                  value={LoginForm.values.password}
                />
                <span
                  onClick={togglePasswordVisibility}
                  className={style.showPassword}
                >
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </span>
              </div>{" "}
              {LoginForm.touched.password && LoginForm.errors.password ? (
                <div className="alert py-1 alert-danger">
                  <p>{LoginForm.errors.password}</p>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className={style.rigthTextHead}>
             
              <div className="">
                <Link to="/ForgetPassword" className={style.rigthText}>
                Forgotten password?
                                </Link>
              </div>
              <div>
              <label
                  className={[style.rigthText, "form-check-label", "px-2"].join(
                    " "
                  )}
                  htmlFor="flexCheckDefault"
                >
                Remember me
                </label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                
              </div>
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
                onClick={LoginForm.handleSubmit}
                disabled={!(LoginForm.isValid && LoginForm.dirty)}
                type="submit"
                className={[style.submitbutton, "btn"].join(" ")}
              >
Log In              </button>
            )}
          </div>
        <div className={style.ToRegister}>
            <p>
            Don't have an account?
            <span onClick={()=>navigate('/signUp')}>   Sign Up</span>
            </p>
        </div>
        </div>
        
      </div>
    </div>
  );
}

export default Login;
