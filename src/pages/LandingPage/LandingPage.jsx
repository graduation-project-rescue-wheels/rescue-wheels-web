import React, { useEffect } from "react";
import img from "../../Assents/OnBording/car-service.gif";
import img2 from "../../Assents/OnBording/mechanics-repairing-car-in-service-station-2953459-2451647.png";
import img3 from "../../Assents/OnBording/hand-with-smartphone-device-icon_18591-82599-removebg-preview.png";
import "./LandingPage.css";
import { Link } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const LandingPage = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((e) => {
      e.forEach((el) => {
        if (el.isIntersecting) {
          el.target.classList.add("show");
        } else {
          el.target.classList.remove("show");
        }
      });
    });

    const hiddenREl = document.querySelectorAll(".hiddenL");
    const hiddenLEl = document.querySelectorAll(".hiddenR");
    hiddenREl.forEach((el) => observer.observe(el));
    hiddenLEl.forEach((el) => observer.observe(el));
  }, []);

  return (
    <div className="d-flex flex-column container gap-5">
      <div
        className="d-flex justify-content-evenly landing mt-5"
        style={{ overflow: "hidden" }}
      >
        <div className="info position-relative w-100 d-flex flex-column justify-content-center hiddenL">
          <p style={{ fontSize: "4rem", fontWeight: "bold" }}>Rescue Wheels</p>
          <p style={{ lineHeight: "2" }}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur
            vel vitae eligendi. Voluptas sed quod tempore exercitationem. Animi
            quas optio, sit delectus perferendis reprehenderit voluptates
            nostrum, in velit atque at!
          </p>
          <Link to={"/"} className="applyBtn mt-3">
            Apply as Technician
            <ArrowRightAltIcon className="applyIcon" />
          </Link>
        </div>
        <div className="homePic w-100 d-flex justify-content-end position-relative hiddenR">
          <img src={img} alt="" />
        </div>
      </div>

      <div
        className="d-flex justify-content-evenly landing mt-5"
        style={{ overflow: "hidden" }}
      >
        <div className="homePic w-100 d-flex justify-content-start position-relative hiddenL">
          <img src={img2} alt="" />
        </div>
        <div className="info position-relative w-100 d-flex flex-column justify-content-center hiddenR">
          <p style={{ fontSize: "4rem", fontWeight: "bold" }}>Repair Centers</p>
          <p style={{ lineHeight: "2" }}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur
            vel vitae eligendi. Voluptas sed quod tempore exercitationem. Animi
            quas optio, sit delectus perferendis reprehenderit voluptates
            nostrum, in velit atque at!
          </p>
          <Link to={"/"} className="applyBtn mt-3">
            Apply as Repair Center
            <ArrowRightAltIcon className="applyIcon" />
          </Link>
        </div>
      </div>

      <div
        className="d-flex justify-content-evenly landing mt-5"
        style={{ overflow: "hidden" }}
      >
        <div className="info position-relative w-100 d-flex flex-column justify-content-center hiddenL">
          <p style={{ fontSize: "4rem", fontWeight: "bold" }}>
            It’s easier in the apps
          </p>
          <p style={{ lineHeight: "2" }}>
            With Rescue Wheels, helping you is our mission. All you have to do
            is open the application and enter the location you are in, and a
            technician near you will help you repair your car or move it to the
            location you want.
          </p>
          <Link to={"/"} className="applyBtn mt-3">
            Get it on Google Play
          </Link>
          <Link to={"/"} className="applyBtn mt-3">
            Get it on App Store
          </Link>
        </div>
        <div className="homePic w-100 d-flex justify-content-end position-relative hiddenR">
          <img src={img3} alt="" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
