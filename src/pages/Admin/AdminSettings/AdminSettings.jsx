import React from 'react'
import AdminNav from '../../../components/AdminNav/AdminNav'
import Sidebar from '../../../components/Sidebar/Sidebar'

const AdminSettings = () => {
    return (
        <div className="d-flex" style={{ minHeight: "100vh" }}>
            <Sidebar />
            <div className="d-flex flex-column row-gap-1 hero" style={{ marginLeft: "70px", width: "calc(100% - 70px)" }}>
                <AdminNav name="Settings" />
            </div>
        </div>
    )
}

export default AdminSettings