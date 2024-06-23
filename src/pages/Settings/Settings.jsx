import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import * as YUP from "yup";
import img from "../../Assents/143086968_2856368904622192_1959732218791162458_n.png";
import { useDispatch, useSelector } from "react-redux";
import { UpdateUser, UpdatePassword, getUserData } from "../../store/AuthSlice";
import { Toaster } from "react-hot-toast";
import "./Settings.css";
import Input from "../../components/Input";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BadgeIcon from "@mui/icons-material/Badge";
import KeyIcon from "@mui/icons-material/Key";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import ImageIcon from "@mui/icons-material/Image";

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputRef = useRef(null);
  const [image, setImage] = useState();
  const [isImage, setIsImage] = useState(false);
  const [user, setUser] = useState(
    useSelector((state) => state.AuthData.UserData)
  );
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

    for (var key in formData) {
      form.append(key, formData[key]);
    }

    if (isImage) {
      form.append("image", image);
      const res = await dispatch(UpdateUser(form));
      res.payload.updatedUser && setUser(res.payload.updatedUser);
      setIsImage(false);
    } else {
      const res = await dispatch(UpdateUser(form));
      console.log(res.payload);
      res.payload.updatedUser && setUser(res.payload.updatedUser);
    }

  }

  function handleInputSubmit() {
    inputRef.current.click();
  }

  const handlelogout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("persist:root");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  useEffect(() => {
    const links = document.querySelectorAll(".list-link");
    let sections = document.querySelectorAll(".scroll");
    console.log(sections);

    links.forEach((link) => {
      link.addEventListener("click", () => {
        if (document.querySelector(".link-active")) {
          document
            .querySelector(".link-active")
            .classList.remove("link-active");
        }
        link.classList.add("link-active");
      });
    });

    window.onscroll = () => {
      sections.forEach((sec) => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 50;
        let height = sec.offsetHeight;
        let id = sec.getAttribute("id");
        if (top >= offset && top < offset + height) {
          links.forEach((link) => {
            link.classList.remove("link-active");
            document
              .querySelector(".list-link[href*=" + id + "]")
              .classList.add("link-active");
          });
        }
      });
    };
  }, []);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container-xl" style={{ marginTop: "140px" }}>
        <div
          className="navigation-bar position-fixed"
          style={{ width: "16rem", marginTop: "100px" }}
        >
          <h2>Account Settings</h2>
          <nav className="d-flex flex-column gap-2">
            <a href="#Profile-Pic" className="list-link">
              <ImageIcon />
              Profile Picture
            </a>
            <a href="#User-Name" className="list-link">
              <AccountCircleIcon />
              User Name
            </a>
            <a href="#Personal-Information" className="list-link">
              <BadgeIcon />
              Personal Information
            </a>
            <a href="#Account-Privacy" className="list-link">
              <KeyIcon />
              Account Privacy
            </a>
            <a href="#Login-Managment" className="list-link">
              <LockPersonIcon />
              Login Managment
            </a>
          </nav>
        </div>

        <div
          className="body-info d-flex flex-column gap-3 mb-5 mt-5"
          style={{ marginLeft: "20rem" }}
        >
          <div className="wrapper">
            <div
              className="scroll"
              id="Profile-Pic"
              style={{
                height: "120px",
                marginTop: "-120px",
                position: "relative",
                zIndex: "-1",
              }}
            ></div>
            <div
              className="card-body d-flex"
              style={{
                backgroundColor: "white",
                boxShadow: "0 0 20px 1px #ddd",
                borderRadius: "1rem",
              }}
            >
              <div className="p-5 w-100">
                <h4 style={{ fontSize: "1.8rem" }}>Profile Picture</h4>
                <p style={{ fontSize: "1rem" }}>
                  You can change your profile pic from here
                </p>
              </div>
              <form
                className="p-5 gap-2 d-flex flex-column align-items-center flex-grow-1 w-100"
                onSubmit={InfoUpdateForm.handleSubmit}
              >
                <div
                  className="image rounded-circle"
                  style={{ position: "relative", width: "100%" }}
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
                <button
                  className="btn w-75"
                  onClick={() => setIsImage(true)}
                  style={{
                    backgroundColor: "var(--main-color)",
                    color: "var(--secondry-color)",
                  }}
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>

          <div className="wrapper">
            <div
              className="scroll"
              id="User-Name"
              style={{
                height: "120px",
                marginTop: "-120px",
                position: "relative",
                zIndex: "-1",
              }}
            ></div>
            <div
              className="card-body d-flex"
              style={{
                backgroundColor: "white",
                boxShadow: "0 0 20px 1px #ddd",
                borderRadius: "1rem",
              }}
            >
              <div className="p-5 w-100">
                <h4 style={{ fontSize: "2rem" }}>User Name</h4>
                <p style={{ fontSize: "1rem" }}>
                  Your User Name is used to find you through the social panel in
                  our app
                </p>
              </div>
              <div className="p-5 d-flex flex-column flex-grow-1 w-100">
                <form
                  className="d-flex flex-column gap-2"
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
                  <button
                    className="btn"
                    style={{
                      alignSelf: "flex-end",
                      backgroundColor: "var(--main-color)",
                      color: "var(--secondry-color)",
                    }}
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="wrapper">
            <div
              className="scroll"
              id="Personal-Information"
              style={{
                height: "120px",
                marginTop: "-120px",
                position: "relative",
                zIndex: "-1",
              }}
            ></div>
            <div
              className="card-body d-flex"
              style={{
                backgroundColor: "white",
                boxShadow: "0 0 20px 1px #ddd",
                borderRadius: "1rem",
              }}
            >
              <div className="p-5 w-100">
                <h4 style={{ fontSize: "2rem" }}>Personal Information</h4>
                <p style={{ fontSize: "1rem" }}>
                  This information is private and will not be shared with other
                  users.
                </p>
              </div>
              <div className="p-5 d-flex flex-column flex-grow-1 w-100">
                <form
                  className="d-flex flex-column gap-2"
                  onSubmit={InfoUpdateForm.handleSubmit}
                >
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
                    className="btn"
                    style={{
                      alignSelf: "flex-end",
                      backgroundColor: "var(--main-color)",
                      color: "var(--secondry-color)",
                    }}
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="wrapper">
            <div
              className="scroll"
              id="Account-Privacy"
              style={{
                height: "120px",
                marginTop: "-120px",
                position: "relative",
                zIndex: "-1",
              }}
            ></div>
            <div
              className="card-body d-flex"
              style={{
                backgroundColor: "white",
                boxShadow: "0 0 20px 1px #ddd",
                borderRadius: "1rem",
              }}
            >
              <div className="p-5 w-100">
                <h4 style={{ fontSize: "2rem" }}>Account Privacy</h4>
                <p style={{ fontSize: "1rem" }}>
                  We recommend that you periodically update your password to
                  help prevent unauthorized access to your account.
                </p>
              </div>
              <div className="p-5 d-flex flex-column flex-grow-1 w-100">
                <form
                  className="d-flex flex-column g-3"
                  onSubmit={PasswordForm.handleSubmit}
                >
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
                    style={{
                      alignSelf: "flex-end",
                      backgroundColor: "var(--main-color)",
                      color: "var(--secondry-color)",
                    }}
                  >
                    Update Your Password
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="wrapper">
            <div
              className="scroll"
              id="Login-Managment"
              style={{
                height: "120px",
                marginTop: "-120px",
                position: "relative",
                zIndex: "-1",
              }}
            ></div>
            <div
              className="card-body d-flex"
              style={{
                backgroundColor: "white",
                boxShadow: "0 0 20px 1px #ddd",
                borderRadius: "1rem",
              }}
            >
              <div className="p-5 w-100">
                <h4 style={{ fontSize: "2rem" }}>Login Managment</h4>
                <p style={{ fontSize: "1rem" }}>
                  You can Delete Account Permenatly and Logout
                </p>
              </div>
              <div className="p-5 gap-3 d-flex flex-column flex-grow-1 w-100">
                <button
                  className="btn"
                  style={{
                    backgroundColor: "var(--main-color)",
                    color: "var(--secondry-color)",
                  }}
                  onClick={handlelogout}
                >
                  Log Out
                </button>
                <button
                  className="btn"
                  style={{
                    backgroundColor: "red",
                    color: "var(--secondry-color)",
                  }}
                >
                  Delete Account Permanently
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
