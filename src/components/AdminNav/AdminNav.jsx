import React from 'react'
import img from "../../Assents/143086968_2856368904622192_1959732218791162458_n.png";
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import NotificationsIcon from '@mui/icons-material/Notifications';
import "./AdminNav.css"


const AdminNav = ({name}) => {

    const user = useSelector(state => state.AuthData.UserData);
    const userName = `${user.firstName} ${user.lastName}`

    return (
        <nav className="navbar navbar-expand-lg w-100">
            <div className="container-fluid">
                <Link className="navbar-text navbar-brand fw-bold position-relative" style={{ color: "black !important", fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)" }}>{name}</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="w-100 d-flex justify-content-end align-items-center gap-3" style={{ zIndex: "1" }}>
                    <NotificationsIcon type="button" />
                        <div className="d-flex align-items-center gap-3">
                            <h6 className='mb-0'>{userName}</h6>
                            <img src={user.profilePic ? user.profilePic : img} alt="" className="rounded-circle pic" style={{ width: "3rem", aspectRatio: "1 / 1" }} />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default AdminNav