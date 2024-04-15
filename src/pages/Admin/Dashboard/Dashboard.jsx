import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Sidebar from './../../../components/Sidebar/Sidebar';
import AdminNav from '../../../components/AdminNav/AdminNav';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./Dashboard.css"
import AdminCard from './../../../components/AdminCard/AdminCard';


const Dashboard = () => {

    function createData(
        user,
        requested,
        type,
        date,
        rate,
        location,
    ) {
        return { user, requested, type, date, rate, location };
    }

    const rows = [
        createData('-', "-", "-", "-", "-", "-"),
        createData('-', "-", "-", "-", "-", "-"),
        createData('-', "-", "-", "-", "-", "-"),
        createData('-', "-", "-", "-", "-", "-"),
        createData('-', "-", "-", "-", "-", "-"),
        createData('-', "-", "-", "-", "-", "-"),
        createData('-', "-", "-", "-", "-", "-"),
    ];

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="d-flex flex-column row-gap-1 hero" style={{ marginLeft: "70px", width: "calc(100% - 70px)" }}>
                <AdminNav name="Dashboard" />
                <div className="cards d-flex align-items-center justify-content-between column-gap-2 px-3 flex-wrap">
                    <AdminCard
                        name="Total Users"
                        total={220}
                    />

                    <AdminCard
                        name="Total Technicians"
                        total={220}
                    />

                    <AdminCard
                        name="Total Repair Centers"
                        total={220}
                    />

                    <AdminCard
                        name="Total Requests"
                        total={220}
                    />
                </div>
                <div className="tables px-3 d-flex justify-content-between">
                    <div className="table p-3" style={{ backgroundColor: "white", borderRadius: "15px", width: "69%", boxShadow: "#ccc 0px 0px 10px 0.5px" }}>
                        <h2 style={{ color: '#e48700' }}>Recent Requests</h2>
                        <TableContainer component={Paper}>
                            <Table sx={{ overflowY: "scroll" }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: "bold" }}>User</TableCell>
                                        <TableCell align="center" style={{ fontWeight: "bold" }}>Requested</TableCell>
                                        <TableCell align="center" style={{ fontWeight: "bold" }}>Type</TableCell>
                                        <TableCell align="center" style={{ fontWeight: "bold" }}>Date</TableCell>
                                        <TableCell align="center" style={{ fontWeight: "bold" }}>Rate</TableCell>
                                        <TableCell align="center" style={{ fontWeight: "bold" }}>Location</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row.user}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.user}
                                            </TableCell>
                                            <TableCell align="center">{row.requested}</TableCell>
                                            <TableCell align="center">{row.type}</TableCell>
                                            <TableCell align="center">{row.date}</TableCell>
                                            <TableCell align="center">{row.rate}</TableCell>
                                            <TableCell align="center">{row.location}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <div className="table p-3" style={{ backgroundColor: "white", borderRadius: "15px", width: "29%", boxShadow: "#ccc 0px 0px 10px 0.5px" }}>
                        <h2 style={{ color: '#e48700' }}>Recent Users</h2>
                        <TableContainer component={Paper}>
                            <Table sx={{ overflowY: "scroll" }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: "bold" }}>Pic</TableCell>
                                        <TableCell align="center" style={{ fontWeight: "bold" }}>User</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row.user}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.user}
                                            </TableCell>
                                            <TableCell align="center">{row.requested}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard