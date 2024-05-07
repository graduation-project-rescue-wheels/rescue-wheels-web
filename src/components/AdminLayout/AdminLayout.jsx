import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function AdminLayout() {
  const signedUser = useSelector((state) => state.AuthData.UserData);
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    signedUser.role !== "Admin" && signedUser.role !== "SuperAdmin"
      ? navigate("/HomePage")
      : setAuthorized(true);
  }, []);

  return (
    <>
      {authorized && (
        <>
          <div className="d-flex" style={{ minHeight: "100vh" }}>
            <Sidebar />
            <div
              className="d-flex flex-column row-gap-3 hero"
              style={{ marginLeft: "70px", width: "calc(100% - 70px)" }}
            >
              <Outlet />
            </div>
          </div>
        </>
      )}
    </>
  );
}
