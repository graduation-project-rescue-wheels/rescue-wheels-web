import  { useState } from 'react'
import style from "../../Assents/Style/Auth.module.css";
import img1 from '../../Assents/Images/Auth/forget3.png'
import * as YUP from "yup";
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { HandelResetPassword } from '../../store/AuthSlice';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    let [ErrorMessage, setErrorMessage] = useState("");
    // let [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

    const navigate = useNavigate()
    const validationSchema = YUP.object({
      password: YUP.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{7,})/,
"Password must contain at least 7 characters, at least 1 lowercase letter, at least 1 uppercase letter, at least 1 number, and at least 1 special character."
        )
        .required("required field"),
      ConfirmNewPassword: YUP.string()
        .oneOf([YUP.ref('password'), null], "Passwords must match")
        .required("required field"),
    });
    
      const ResetPasswordForm = useFormik({
        initialValues: {
          email:localStorage.getItem('email'),
          password: "",
          ConfirmNewPassword: "",
        },
        validationSchema,
        onSubmit: ResetPasswordSubmit,
      });
      async function ResetPasswordSubmit(val) {
        console.log(val);
        const res = await dispatch(HandelResetPassword(val))
        if(res.payload.status){
          navigate('/login')
        }
        console.log(res);
      }
      const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
      const toggleConfirmNewPasswordVisibility = () => {
        setShowConfirmNewPassword(!showConfirmNewPassword);
      };
  return (
    <div className='container'>
        <div className='row d-flex justify-content-center align-items-center'>
        <div className={[style.loginFormContainer, "col-md-6"].join(" ")}>
          {/* Logo */}
          <div className="w-75 m-auto">
            <h6 className={[style.h6,"mb-4"].join(" ")}>Create a new password</h6>
            {ErrorMessage ? (
              <div className="alert py-1  alert-danger">
                <p>{ErrorMessage}</p>
              </div>
            ) : (
              ""
            )}
            <div className="mb-">
              <label htmlFor="password" className="form-label">
              password              </label>
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
                  onChange={ResetPasswordForm.handleChange}
                  onKeyUp={ResetPasswordForm.handleBlur}
                  value={ResetPasswordForm.values.password}
                />
              </div>{" "}
              {ResetPasswordForm.touched.password && ResetPasswordForm.errors.password ? (
                <div className="alert py-1 alert-danger">
                  <p>{ResetPasswordForm.errors.password}</p>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="mb-2">
              <label htmlFor="ConfirmNewPassword" className="form-label">
              confirm password
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
                  id="ConfirmNewPassword"
                  name="ConfirmNewPassword"
                  onChange={ResetPasswordForm.handleChange}
                  onKeyUp={ResetPasswordForm.handleBlur}
                  value={ResetPasswordForm.values.ConfirmNewPassword}
                />
              </div>{" "}
              {ResetPasswordForm.touched.ConfirmNewPassword && ResetPasswordForm.errors.ConfirmNewPassword ? (
                <div className="alert py-1 alert-danger">
                  <p>{ResetPasswordForm.errors.ConfirmNewPassword}</p>
                </div>
              ) : (
                ""
              )}
            </div>
            <button
                 onClick={ResetPasswordForm.handleSubmit}
                disabled={!(ResetPasswordForm.isValid && ResetPasswordForm.dirty)}
                type="submit"
                className={[style.submitbutton, "btn py-3 my-3"].join(" ")}
              >
                تأكيد
              </button>
            </div>
            </div>
            <div className='col-md-6 d-none d-lg-block'>
            <div className='m-auto'>
                <img className='w-75' src={img1} alt='forgetImage'/>
            </div>
            </div>
        </div>
    </div>
  )
}

export default ResetPassword
