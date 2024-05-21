import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { useEffect } from "react";

export default function Layout() {
  const authToken = localStorage.getItem("Token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Navbar />
      {/*  */}

      <div>
        <Outlet />
      </div>
    </div>
  );
}
