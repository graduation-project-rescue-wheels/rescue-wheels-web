import { useFormik } from "formik";
import { useRef, useState } from "react";
import * as YUP from "yup";
import img from "../../Assents/143086968_2856368904622192_1959732218791162458_n.png";
import { useDispatch, useSelector } from "react-redux";
import { UpdateUser, UpdatePassword, getUserData } from "../../store/AuthSlice";
import { Toaster } from "react-hot-toast";
import "./Settings.css";
import Input from "../../components/Input";
import Loader from "../../components/Loader/Loader";

const Settings = () => {
  const dispatch = useDispatch();

  const inputRef = useRef(null);
  const [image, setImage] = useState();
  const [user, setUser] = useState(
    useSelector((state) => state.AuthData.UserData)
  );
  // console.log(user);
  const form = new FormData();

  let infoValidationSchema = YUP.object({
    firstName: YUP.string().required("Name is required"),
    lastName: YUP.string().required("Name is required"),
    email: YUP.string()
      .required("Email is required")
      .email("Enter a valid email"),
    mobileNumber: YUP.string()
      .required("Mobile number is required")
      .matches(/^[0-9]{11}$/, "Enter a valid mobile number"),
  });

  let passValidationSchema = YUP.object({
    oldPassword: YUP.string().required("Password is required"),
    newPassword: YUP.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "   & At least one lowercase letter At least one uppercase letter At least one digit At least one special character (in the set !@#$%^&*)  Minimum length of 8 characters"
      ),
    confirmNewPassword: YUP.string()
      .required("Confirm password is required")
      .oneOf([YUP.ref("newPassword"), null], "Passwords must match"),
  });

  let PasswordForm = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: passValidationSchema,
    onSubmit: handleFormSubmitPasswordUpdate,
  });

  let InfoUpdateForm = useFormik({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobileNumber: user.mobileNumber,
    },
    validationSchema: infoValidationSchema,
    onSubmit: handleInfoFormSubmitUpdate,
  });

  async function handleFormSubmitPasswordUpdate() {
    await dispatch(UpdatePassword(PasswordForm.values));
  }

  async function handleInfoFormSubmitUpdate() {
    let formData = {};
    if (
      InfoUpdateForm.values.email === user.email &&
      InfoUpdateForm.values.mobileNumber === user.mobileNumber
    ) {
      formData.firstName = InfoUpdateForm.values.firstName;
      formData.lastName = InfoUpdateForm.values.lastName;
    } else {
      formData = InfoUpdateForm.values;
    }

    image && form.append("image", image);

    for (var key in formData) {
      form.append(key, formData[key]);
    }

    const res = await dispatch(UpdateUser(form));
    res.payload.updatedUser && setUser(res.payload.updatedUser);
  }

  function handleInputSubmit() {
    inputRef.current.click();
  }

  if (!user) {
    return <Loader />;
  }
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="d-flex flex-column align-items-center mt-3">
        <h2>Settings</h2>
        <nav className="w-75">
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              className="nav-link active"
              id="nav-personal-information-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-personal-information"
              type="button"
              role="tab"
              aria-controls="nav-personal-informaion"
              aria-selected="true"
            >
              Personal Info
            </button>
            <button
              className="nav-link"
              id="nav-privacy-settings-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-privacy-settings"
              type="button"
              role="tab"
              aria-controls="nav-privacy-settings"
              aria-selected="false"
            >
              Privacy Settings
            </button>
          </div>
        </nav>
        <div
          className="tab-content w-75 shadow-lg bg-white"
          id="nav-tabContent"
        >
          <div
            className="tab-pane fade show active"
            id="nav-personal-information"
            role="tabpanel"
            aria-labelledby="nav-personal-information-tab"
            tabIndex="0"
          >
            <div className="card mb-3" style={{ border: "none" }}>
              <div className="row g-0">
                <div className="col-md-4 d-flex flex-column align-items-center mt-3">
                  <div
                    className="image rounded-circle"
                    style={{ position: "relative", width: "80%" }}
                    onClick={handleInputSubmit}
                  >
                    {image ? (
                      <img
                        src={URL.createObjectURL(image)}
                        alt=""
                        className="rounded-circle pic w-100"
                        style={{ aspectRatio: "1 / 1" }}
                      />
                    ) : (
                      <img
                        src={user.profilePic ? user.profilePic : img}
                        alt=""
                        className="rounded-circle pic w-100"
                        style={{ aspectRatio: "1 / 1" }}
                      />
                    )}
                    <input
                      type="file"
                      className="btn mt-2"
                      ref={inputRef}
                      onChange={(e) => setImage(e.target.files[0])}
                      style={{ display: "none" }}
                    />
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <form
                      className="row g-3"
                      onSubmit={InfoUpdateForm.handleSubmit}
                    >
                      <Input
                        text={"First Name"}
                        type="firstName"
                        name="firstName"
                        id="firstName"
                        onChange={InfoUpdateForm.handleChange}
                        onBlur={InfoUpdateForm.handleBlur}
                        value={InfoUpdateForm.values.firstName}
                        formT={InfoUpdateForm.touched.firstName}
                        formE={InfoUpdateForm.errors.firstName}
                      />

                      <Input
                        text={"Last Name"}
                        type="lastName"
                        name="lastName"
                        id="lastName"
                        onChange={InfoUpdateForm.handleChange}
                        onBlur={InfoUpdateForm.handleBlur}
                        value={InfoUpdateForm.values.lastName}
                        formT={InfoUpdateForm.touched.lastName}
                        formE={InfoUpdateForm.errors.lastName}
                      />

                      <Input
                        text={"Email"}
                        type="email"
                        name="email"
                        id="email"
                        onChange={InfoUpdateForm.handleChange}
                        onBlur={InfoUpdateForm.handleBlur}
                        value={InfoUpdateForm.values.email}
                        formT={InfoUpdateForm.touched.email}
                        formE={InfoUpdateForm.errors.email}
                      />

                      <Input
                        text={"Mobile Number"}
                        type="mobileNumber"
                        name="mobileNumber"
                        id="mobileNumber"
                        onChange={InfoUpdateForm.handleChange}
                        onBlur={InfoUpdateForm.handleBlur}
                        value={InfoUpdateForm.values.mobileNumber}
                        formT={InfoUpdateForm.touched.mobileNumber}
                        formE={InfoUpdateForm.errors.mobileNumber}
                      />

                      <button
                        type="submit"
                        className="btn border-0  w-100"
                        style={{
                          backgroundColor: "#e48700",
                          borderBlockColor: "#e48700",
                          boxShadow: "1px 1px 1px #e48700",
                          color: "white",
                        }}
                      >
                        Update
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="tab-pane fade"
            id="nav-privacy-settings"
            role="tabpanel"
            aria-labelledby="nav-privacy-settings-tab"
            tabIndex="0"
          >
            <div className="card" style={{ border: "none" }}>
              <div className="card-body">
                <form className="row g-3" onSubmit={PasswordForm.handleSubmit}>
                  <Input
                    text={"New Password"}
                    type="password"
                    className="form-control"
                    id="inputPassword1"
                    name="newPassword"
                    onChange={PasswordForm.handleChange}
                    onBlur={PasswordForm.handleBlur}
                    value={PasswordForm.values.newPassword}
                    formT={PasswordForm.touched.newPassword}
                    formE={PasswordForm.errors.newPassword}
                  />

                  <Input
                    text={"Confirm New Password"}
                    type="password"
                    className="form-control"
                    id="inputPassword2"
                    name="confirmNewPassword"
                    onChange={PasswordForm.handleChange}
                    onBlur={PasswordForm.handleBlur}
                    value={PasswordForm.values.confirmNewPassword}
                    formT={PasswordForm.touched.confirmNewPassword}
                    formE={PasswordForm.errors.confirmNewPassword}
                  />

                  <Input
                    text={"Current Password"}
                    type="password"
                    className="form-control"
                    id="inputPassword3"
                    name="oldPassword"
                    onChange={PasswordForm.handleChange}
                    onBlur={PasswordForm.handleBlur}
                    value={PasswordForm.values.oldPassword}
                    formT={PasswordForm.touched.oldPassword}
                    formE={PasswordForm.errors.oldPassword}
                  />

                  <button
                    className="btn"
                    style={{ background: "#e48700", color: "white" }}
                  >
                    Update Your Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
