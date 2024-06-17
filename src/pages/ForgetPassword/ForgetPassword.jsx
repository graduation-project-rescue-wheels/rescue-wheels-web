import  { useState } from 'react'
import style from "../../Assents/Style/Auth.module.css";
import img1 from '../../Assents/Images/Auth/forget1.png'
import * as YUP from "yup";
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { HandelForgetPassword } from '../../store/AuthSlice';
import { useNavigate } from 'react-router-dom';
const ForgetPassword = () => {
    let [ErrorMessage, setErrorMessage] = useState("");
    let [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const validationSchema = YUP.object({
        email: YUP.string().email("please enter a working email address")
        .required("required field"),
      });
      const ForgetPasswordForm = useFormik({
        initialValues: {
          email: "",
        },
        validationSchema,
        onSubmit: ForgetPasswordSubmit,
      });
      async function ForgetPasswordSubmit(val) {
        console.log(val);
        const res = await dispatch(HandelForgetPassword(val))
        console.log(res);
        if(res.payload.status===true){
          localStorage.setItem('email',val.email)
          navigate(`/OTP`)
        }
        console.log(val);
      }
  return (
    <div className='container '>
        <div className='row d-flex justify-content-center align-items-center'>
        <div className={[style.loginFormContainer, "col-md-6"].join(" ")}>
          {/* Logo */}
          <div className="w-75 m-auto">
            <h6 className={[style.h6,"mb-4"].join(" ")}> Forgot your password?</h6>
            <p className={style.forgetP}>Enter your email so you can reset your password</p>
            {ErrorMessage ? (
              <div className="alert py-1  alert-danger">
                <p>{ErrorMessage}</p>
              </div>
            ) : (
              ""
            )}
            <div className="mb-3">
              <label htmlFor="email" className="form-label mt-3">
                {" "}
                Email
              </label>
              <input
                type="email"
                className={[style.input, "form-control"].join(" ")}
                id="email"
                name="email"
                onChange={ForgetPasswordForm.handleChange}
                onKeyUp={ForgetPasswordForm.handleBlur}
                value={ForgetPasswordForm.values.email}
              />
              {ForgetPasswordForm.touched.email && ForgetPasswordForm.errors.email ? (
                <div className="alert py-1  alert-danger">
                  <p>{ForgetPasswordForm.errors.email}</p>
                </div>
              ) : (
                ""
              )}
              <button
                onClick={ForgetPasswordForm.handleSubmit}
                disabled={!(ForgetPasswordForm.isValid && ForgetPasswordForm.dirty)}
                type="submit"
                className={[style.submitbutton, "btn py-3 my-3"].join(" ")}
              >
                Confirm 
              </button>
            </div>
            </div>
            </div>
            <div className='col-md-6 d-none d-lg-block' >
            <div className='m-auto'>
                <img className='w-75' src={img1} alt='forgetImage'/>
            </div>
            </div>
        </div>
    </div>
  )
}

export default ForgetPassword
