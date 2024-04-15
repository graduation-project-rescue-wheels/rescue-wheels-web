import React from 'react'
import img from "../../assets/143086968_2856368904622192_1959732218791162458_n.png"
import { Link } from 'react-router-dom'
import "./AdminNav.css"


const AdminNav = ({name}) => {
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <Link className="navbar-text navbar-brand fw-bold position-relative" style={{ color: "black !important", fontSize: "1.7rem" }}>{name}</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="dropdown-center w-100 d-flex justify-content-end" style={{ zIndex: "1" }}>
                        <button className="btn dropdown-toggle d-flex justify-content-end align-items-center column-gap-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <h6>User Name</h6>
                            <img src={img} alt="" className="rounded-circle pic" style={{ width: "2rem" }} />
                        </button>
                        <ul className="dropdown-menu" style={{ left: "auto" }}>
                            <li><Link className="dropdown-item" to="/">Settings</Link></li>
                            <li><Link className="dropdown-item">Logout</Link></li>
                        </ul>

                    </div>
                </div>
            </div>
        </nav>
    )
}

export default AdminNav