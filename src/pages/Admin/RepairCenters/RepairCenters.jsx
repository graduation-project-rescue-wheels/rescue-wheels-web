import { useMemo, useState } from 'react'
import AdminNav from '../../../components/AdminNav/AdminNav'
import Sidebar from '../../../components/Sidebar/Sidebar'
import * as YUP from "yup";
import { useFormik } from "formik";
import Input from "../../../components/Input";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { FormControl, FormHelperText, MenuItem, Select } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';



function createData(id, location, userName, email, phoneNumber, requestsNumber) {
    return {
        id,
        location,
        userName,
        email,
        phoneNumber,
        requestsNumber,
    };
}

const rows = [
    createData(1, "-", "-", "-", "-", "-"),
    createData(2, "-", "-", "-", "-", "-"),
    createData(3, "-", "-", "-", "-", "-"),
    createData(4, "-", "-", "-", "-", "-"),
    createData(5, "-", "-", "-", "-", "-"),
    createData(6, "-", "-", "-", "-", "-"),
    createData(7, "-", "-", "-", "-", "-"),
    createData(8, "-", "-", "-", "-", "-"),
    createData(9, "-", "-", "-", "-", "-"),
    createData(10, "-", "-", "-", "-", "-"),
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'id',
        numeric: false,
        disablePadding: true,
        label: 'ID',
    },
    {
        id: 'userName',
        numeric: false,
        disablePadding: false,
        label: 'User Name',
    },
    {
        id: 'location',
        numeric: false,
        disablePadding: false,
        label: 'Location',
    },
    {
        id: 'email',
        numeric: false,
        disablePadding: false,
        label: 'Email',
    },
    {
        id: 'phoneNumber',
        numeric: false,
        disablePadding: false,
        label: 'Phone Number',
    },
    {
        id: 'requestsNumber',
        numeric: false,
        disablePadding: false,
        label: 'No. of Requests',
    },
    {
        id: 'view',
        numeric: false,
        disablePadding: false,
        label: 'View',
    },
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
    const { numSelected } = props;
    const [auth, setAuth] = useState('');

    const handleChange = (event) => {
        setAuth(event.target.value);
    };

    return (
        <>
            {
                numSelected > 0 && (
                    <Toolbar
                        sx={{
                            pl: { sm: 2 },
                            pr: { xs: 1, sm: 1 },
                            ...(numSelected > 0 && {
                                bgcolor: (theme) =>
                                    alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                            }),
                            display: "flex",
                            justifyContent: "space-between"
                        }}
                    >
                        <Typography
                            sx={{ flex: '1 1 100%' }}
                            color="inherit"
                            variant="subtitle1"
                            component="div"
                        >
                            {numSelected} selected
                        </Typography>
                        <Tooltip title="Delete">
                            <IconButton>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </Toolbar>
                )}
        </>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};


const RepairCenters = () => {

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage],
    );

    let [errMessage, setErrMessage] = useState("");

    let validationSchema = YUP.object({
        name: YUP.string().required("Name is required"),
        address: YUP.string().required("Address is required"),
        description: YUP.string().required("Description is required"),
        numberOfEmployees: YUP.number().required("Number Of Employees is required"),
        email: YUP.string()
            .required("Email is required")
            .email("Enter a valid email"),
        password: YUP.string().required("Password is required").min(6, "Password must be at least 6 characters").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, "   & At least one lowercase letter At least one uppercase letter At least one digit At least one special character (in the set !@#$%^&*)  Minimum length of 8 characters"),
        // confirmPassword: YUP.string().required("Confirm password is required").oneOf([YUP.ref("password"), null], "Passwords must match"),
        mobileNumber: YUP.string().required("Mobile number is required").matches(/^[0-9]{11}$/, "Enter a valid mobile number"),
    });

    let RegisterForm = useFormik({
        initialValues: {
            name: "",
            address: "",
            description: "",
            numberOfEmployees: null,
            email: "",
            password: "",
            // confirmPassword: "",
            mobileNumber: "",
            role: "User"
        },
        validationSchema,
        onSubmit: handleFormSubmitRegister,
    });

    async function handleFormSubmitRegister() {
    }

    return (
        <div className="d-flex" style={{ minHeight: "100vh" }}>
            <Sidebar />
            <div className="d-flex flex-column row-gap-1 hero" style={{ marginLeft: "70px", width: "calc(100% - 70px)" }}>
                <AdminNav name="RepairCenters" />
                <button
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    style={{ backgroundColor: "#e48700", color: "white", width: "20%", border: "none", padding: "10px", borderRadius: "10px", alignSelf: "end", margin: "0px 10px 10px 0" }}>
                    Add Repair Center
                </button>
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-xl">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">New Repair Center</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form onSubmit={RegisterForm.handleSubmit} className="w-75">
                                    <Input
                                        text={"Name"}
                                        type='name'
                                        name='name'
                                        id='name'
                                        onChange={RegisterForm.handleChange}
                                        onBlur={RegisterForm.handleBlur}
                                        value={RegisterForm.values.type}
                                        formT={RegisterForm.touched.name}
                                        formE={RegisterForm.errors.name}
                                    />

                                    <Input
                                        text={"Address"}
                                        type='address'
                                        name='address'
                                        id='address'
                                        onChange={RegisterForm.handleChange}
                                        onBlur={RegisterForm.handleBlur}
                                        value={RegisterForm.values.type}
                                        formT={RegisterForm.touched.address}
                                        formE={RegisterForm.errors.address}
                                    />

                                    <Input
                                        text={"Description"}
                                        type='description'
                                        name='description'
                                        id='description'
                                        onChange={RegisterForm.handleChange}
                                        onBlur={RegisterForm.handleBlur}
                                        value={RegisterForm.values.type}
                                        formT={RegisterForm.touched.description}
                                        formE={RegisterForm.errors.description}
                                    />

                                    <Input
                                        text={"Number Of Employees"}
                                        type='numberOfEmployees'
                                        name='numberOfEmployees'
                                        id='numberOfEmployees'
                                        onChange={RegisterForm.handleChange}
                                        onBlur={RegisterForm.handleBlur}
                                        value={RegisterForm.values.type}
                                        formT={RegisterForm.touched.numberOfEmployees}
                                        formE={RegisterForm.errors.numberOfEmployees}
                                    />

                                    <Input
                                        text={"Email"}
                                        type='email'
                                        name='email'
                                        id='email'
                                        onChange={RegisterForm.handleChange}
                                        onBlur={RegisterForm.handleBlur}
                                        value={RegisterForm.values.type}
                                        formT={RegisterForm.touched.email}
                                        formE={RegisterForm.errors.email}
                                    />

                                    <Input
                                        text={"Mobile Number"}
                                        type='mobileNumber'
                                        name='mobileNumber'
                                        id='mobileNumber'
                                        onChange={RegisterForm.handleChange}
                                        onBlur={RegisterForm.handleBlur}
                                        value={RegisterForm.values.type}
                                        formT={RegisterForm.touched.mobileNumber}
                                        formE={RegisterForm.errors.mobileNumber}
                                    />

                                    <Input
                                        text={"Password"}
                                        type='password'
                                        name='password'
                                        id='password'
                                        onChange={RegisterForm.handleChange}
                                        onBlur={RegisterForm.handleBlur}
                                        value={RegisterForm.values.type}
                                        formT={RegisterForm.touched.password}
                                        formE={RegisterForm.errors.password}
                                    />

                                    {/* <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    onChange={RegisterForm.handleChange}
                    onBlur={RegisterForm.handleBlur}
                    value={RegisterForm.values.confirmPassword}
                  />
                  {RegisterForm.touched.confirmPassword && RegisterForm.errors.confirmPassword && (
                    <div className="alert alert-danger mt-2">{RegisterForm.errors.confirmPassword}</div>
                  )}
                </div> */}

                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn" data-bs-dismiss="modal" style={{ backgroundColor: "#e48700", color: "white" }}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Box sx={{ width: '98%', alignSelf: "center" }}>
                    <Paper sx={{ width: '100%', mb: 2 }}>
                        <EnhancedTableToolbar numSelected={selected.length} />
                        <TableContainer>
                            <Table
                                sx={{ minWidth: 750 }}
                                aria-labelledby="tableTitle"
                                size={'medium'}
                            >
                                <EnhancedTableHead
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={handleSelectAllClick}
                                    onRequestSort={handleRequestSort}
                                    rowCount={rows.length}
                                />
                                <TableBody>
                                    {visibleRows.map((row, index) => {
                                        const isItemSelected = isSelected(row.id);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) => handleClick(event, row.id)}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.id}
                                                selected={isItemSelected}
                                                sx={{ cursor: 'pointer' }}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId,
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="none"
                                                >
                                                    {row.id}
                                                </TableCell>
                                                <TableCell align="Left">{row.userName}</TableCell>
                                                <TableCell align="Left">{row.location}</TableCell>
                                                <TableCell align="Left">{row.email}</TableCell>
                                                <TableCell align="Left">{row.phoneNumber}</TableCell>
                                                <TableCell align="Left">{row.requestsNumber}</TableCell>
                                                <TableCell align="Left">
                                                    <Link to="/dashboard">
                                                        <RemoveRedEyeIcon style={{ color: "#e48700" }} />
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    {emptyRows > 0 && (
                                        <TableRow
                                            style={{
                                                height: 53 * emptyRows,
                                            }}
                                        >
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </Box>
            </div>
        </div>
    )
}

export default RepairCenters