import { useEffect } from "react"
import "./Sidebar.css"
import Home from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";


const Sidebar = () => {

    useEffect(() => {
        const btn = document.querySelector(".toggle");

        if (window.innerWidth > 550) {
            console.log(window.innerWidth);
            btn.addEventListener("click", function () {
                document.querySelector(".sidebar").classList.toggle("expand");
                document.querySelector(".hero").classList.toggle("semi-appearance");
            });
        }
    },[])
    return (
        <div className="sidebar d-flex flex-column overflow-hidden">
            <div className="d-flex">
                <button className="toggle" type="button">
                    <Home style={{ color: "white", marginRight: "0.75rem" }} />
                </button>
                <div className="sidebar-logo my-auto mx-0 fw-bold">
                    <Link to="/dashboard" style={{ color: "white" }}>Rescue Wheels</Link >
                </div>
            </div>
            <ul className="sidebar-nav flex-grow-1 py-5 px-0">
                <li className="sidebar-item">
                    <Link to="/Dashboard" className="sidebar-link">
                        <DashboardIcon style={{ color: "white", marginRight: "0.75rem" }} />
                        <span>Dashboard</span>
                    </Link >
                </li>
                <li className="sidebar-item">
                    <Link to="/Auth" className="sidebar-link">
                        <GroupIcon style={{ color: "white", marginRight: "0.75rem" }} />
                        <span>Auth</span>
                    </Link >
                </li>
                <li className="sidebar-item">
                    <Link to="/RepairCenters" className="sidebar-link">
                        <CarRepairIcon style={{ color: "white", marginRight: "0.75rem" }} />
                        <span>Repair Centers</span>
                    </Link >
                </li>
                <li className="sidebar-item">
                    <Link to="/Requests" className="sidebar-link">
                        <ContentPasteIcon style={{ color: "white", marginRight: "0.75rem" }} />
                        <span>Requests</span>
                    </Link >
                </li>
                <li className="sidebar-item">
                    <Link to="/AdminSettings" className="sidebar-link">
                        <SettingsIcon style={{ color: "white", marginRight: "0.75rem" }} />
                        <span>Setting</span>
                    </Link >
                </li>
            </ul>
            <div className="sidebar-footer">
                <Link className="sidebar-link">
                    <LogoutIcon style={{ color: "white", marginRight: "0.75rem" }} />
                    <span>Logout</span>
                </Link >
            </div>
        </div>
    )
}

export default Sidebar