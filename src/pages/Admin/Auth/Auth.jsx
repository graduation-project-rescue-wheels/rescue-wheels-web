import * as React from "react";
import AdminNav from "../../../components/AdminNav/AdminNav";
import img from "../../../Assents/143086968_2856368904622192_1959732218791162458_n.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { GetAllUsers, DeleteUserById } from "../../../store/AuthSlice";
import { Toaster } from "react-hot-toast";
import TableComponent from "../../../components/TableComponent/TableComponent";

const columns = [
  {
    field: "pic",
    headerName: "Pic",
    width: 70,
    renderCell: (params) => (
      <img
        src={params.row.profilePic ? params.row.profilePic : img}
        alt=""
        className="rounded-circle pic"
        style={{ width: "2rem", aspectRatio: "1 / 1" }}
      />
    ),
  },
  {
    field: "fullName",
    headerName: "Full name",
    width: 180,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
  { field: "email", headerName: "Email", width: 240 },
  { field: "role", headerName: "Role", width: 180 },
  { field: "mobileNumber", headerName: "Mobile Number", width: 180 },
  {
    field: "Requests_IDS_Length",
    headerName: "No. Of Requests",
    width: 180,
    valueGetter: (value, row) => `${row.Requests_IDS.length}`,
  },
];

const Auth = () => {
  const [rows, setRows] = useState([]);
  const signedUser = useSelector((state) => state.AuthData.UserData);
  const AllUsers = useSelector((state) => state.AuthData.AllUsers);

  const dispatch = useDispatch();

  const filterAuths = (auths) => {
    if (signedUser.role === "Admin") {
      setRows(auths.filter((auth) => auth.role !== "SuperAdmin"));
    } else {
      setRows(auths);
    }
  };

  const getAllUsers = async () => {
    const res = await dispatch(GetAllUsers());
    filterAuths(res.payload.data);
  };

  const deleteSelectedUsers = async (selected) => {
    selected.forEach(async (e) => {
      await dispatch(DeleteUserById(e));
      getAllUsers();
    });
  };

  useEffect(() => {
    filterAuths(AllUsers);
  }, []);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <AdminNav name="Auth" />
      <TableComponent
        rows={rows}
        columns={columns}
        rowHeight={52}
        func={deleteSelectedUsers}
      />
    </>
  );
};

export default Auth;
