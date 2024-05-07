import { useRef } from "react";
import "./Sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import CarRepairIcon from "@mui/icons-material/CarRepair";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logoo.png"

const Sidebar = () => {
  const navigate = useNavigate();
  const sideBarRef = useRef(null);

  const handlelogout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("persist:root");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const handleSidebarExpand = () => {
    if (window.innerWidth > 550) {
      sideBarRef.current.classList.toggle("expand");
    }
  }

  return (
    <div ref={sideBarRef} className="sidebar d-flex flex-column overflow-hidden">
      <div className="d-flex">
        <button className="toggle" type="button" onClick={handleSidebarExpand}>
          <img src={logo} alt="" />
        </button>
        <div className="sidebar-logo my-auto mx-0 fw-bold">
          <Link to="/Admin/dashboard" style={{ color: "var(--secondry-color)" }}>
            Rescue Wheels
          </Link>
        </div>
      </div>
      <ul className="sidebar-nav flex-grow-1 py-5 px-0">
        <li className="sidebar-item">
          <Link to="/Admin/Dashboard" className="sidebar-link">
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/Admin/Auth" className="sidebar-link">
            <GroupIcon className="icon" />
            <span>Auth</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/Admin/RepairCenters" className="sidebar-link">
            <CarRepairIcon className="icon" />
            <span>Repair Centers</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/Admin/Requests" className="sidebar-link">
            <ContentPasteIcon className="icon" />
            <span>Requests</span>
          </Link>
        </li>
      </ul>
      <div className="sidebar-footer">
        <Link className="sidebar-link" onClick={handlelogout}>
          <LogoutIcon className="icon" />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
