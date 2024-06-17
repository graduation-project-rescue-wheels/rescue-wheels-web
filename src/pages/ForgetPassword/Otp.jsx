import { useEffect, useState } from 'react'
import style from "../../Assents/Style/Auth.module.css";
import img1 from '../../Assents/Images/Auth/forger2.png'
import * as YUP from "yup";
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import ReactCodeInput from 'react-code-input';
import { HandelForgetPassword, HandelOTP } from '../../store/AuthSlice';
import { useNavigate } from 'react-router-dom';
const OTP = () => {
    let [ErrorMessage, setErrorMessage] = useState("");
    let [validToSubmit, setvalidToSubmit] = useState(null);
    const [alertType,setAlertType] = useState('alert-success')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [timeLeft, setTimeLeft] = useState(20);
    const validationSchema = YUP.object({
        otp: YUP.string().required("required field"),
      });
      const OtpForm = useFormik({
        initialValues: {
          email:localStorage.getItem('email'),
          otp: "",
        },
        validationSchema,
        onSubmit: OtpSubmit,
      });

      async function OtpSubmit(val) {
        console.log(val);
        const res = await dispatch(HandelOTP(val))
        console.log(res);
        if(res.payload.status === true){
          navigate('/ResetPassword')
        }else{
          setAlertType("alert-danger")
          setErrorMessage(res.payload.message)
        }
        console.log(val);
      }
      useEffect(()=>{
        setAlertType("alert-success")
        setErrorMessage("OTP generated successfully, please check your email")
      },[])
      useEffect(() => {
        if (timeLeft === 0) {
          return;
        }
        if(timeLeft===10){
          setErrorMessage("")
        }
    
        const intervalId = setInterval(() => {
          setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);
    
        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
      }, [timeLeft]);
      const handleCodeChangeResetPass = (code) => {
        OtpForm.values.otp = code; 
        if (code.toString().length === 6) {
            setvalidToSubmit (true); 
        }
        else if(code.toString().length === 0){
            setvalidToSubmit (false);
        }else{
            setvalidToSubmit (null);
        }
    };
    

    // Resend code
    const ResendCode=async()=>{
        const res = await dispatch(HandelForgetPassword({email:localStorage.getItem('email')}))
        console.log(res);
        if(res.payload.status === true){
          setAlertType("alert-success")
          setErrorMessage(res.payload.message)
          setTimeLeft(20)
        }
        
    }
  return (
    <div className='container'>
        <div className='row d-flex justify-content-center align-items-center'>
        <div className={[style.loginFormContainer, "col-md-6"].join(" ")}>
          {/* Logo */}
          <div className="w-75 m-auto text-center">
            <h6 className={[style.h6,"mb-3"].join(" ")}>Forgot your password?</h6>
            <p className={style.forgetP}>Enter the 6-digit code sent to your email </p>
            {ErrorMessage ? (
              <div className={`alert py-1  ${alertType}`}>
                <p>{ErrorMessage}</p>
              </div>
            ) : (
              ""
            )}
            <div  style={{direction:'ltr'}}>
          <div className='mt-5'>
          <ReactCodeInput
  onChange={handleCodeChangeResetPass}
  value={OtpForm.values.otp}
  name='otp'
  inputStyle={{
    width: '60px',
    height: '60px',
    fontSize: '25px',
    textAlign: 'center',
    marginRight: '10px',
    border: '2px solid rgba(186, 236, 253, 1)',
    borderRadius: '5px',
    color: 'rgba(31, 42, 68, 1)',
    boxShadow: 'none'
  }}
  fields={6} // Assuming you want 6 input fields for OTP
/>
          </div>
        <div className={[style.ToLogin,"mt-4"].join(" ")}>
        {/* timeLeft */}
           <button disabled={timeLeft!==0} onClick={ResendCode} className={[style.ToLogin,"p-0 border-0 bg-transparent"].join(" ")}>
           <p>
            Resend in <span>{timeLeft}</span> seconds
                
            </p>
           </button>
        </div>
              {validToSubmit===false ? (
                <div className="alert py-1  alert-danger">
                <p>Required field</p>
                </div>
              ) : (
                ""
              )}
              <button
                onClick={OtpForm.handleSubmit}
                
                disabled={!(validToSubmit)}
                type="submit"
                className={[style.submitbutton, "btn py-3 my-3"].join(" ")}
              >
                Confirm
              </button>
            </div>
            </div>
            </div>
            <div className='col-md-6 d-none d-lg-block'>
            <div className='m-auto'>
                <img className='w-100' src={img1} alt='forgetImage'/>
            </div>
            </div>
        </div>
    </div>
  )
}

export default OTP
