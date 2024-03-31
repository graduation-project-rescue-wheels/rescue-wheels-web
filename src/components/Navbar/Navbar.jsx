import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom"
import img from "../../assets/143086968_2856368904622192_1959732218791162458_n.png"
import "./Navbar.css"
import { useSelector } from "react-redux";


const Navbar = () => {
  const navigate = useNavigate()
  const user = useSelector(state => state.AuthData.UserData);

  let navRef = useRef();

  const handlelogout = () => {
    localStorage.removeItem('Token');
    localStorage.removeItem('persist:root');
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg fixed-top ps-5 pe-5" ref={navRef} style={{ backgroundColor: "#e48700" }}>
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/HomePage" style={{ color: "white " }}>Rescue Wheels</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="dropdown-center me-auto mb-2 mb-lg-0" style={{ zIndex: "2" }}>
            <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: "white " }}>
              Join Us
            </button>
            <ul className="dropdown-menu" style={{ color: "white " }}>
              <li><Link class="dropdown-item" to="/HomePage">as Technician</Link></li>
              <li><Link class="dropdown-item" to="/HomePage">as Repair Center</Link></li>
            </ul>
          </div>

          <div className="dropdown-center" style={{ zIndex: "1" }}>
            {
              user?.length !== 0 ?
                <>
                  <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: "white " }}>
                    <img src={img} alt="" className="rounded-circle pic w-25" />
                  </button>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/Settings">Settings</Link></li>
                    <li><Link className="dropdown-item" to="/Vehicles">Vehicles</Link></li>
                    <li><Link className="dropdown-item" onClick={handlelogout}>Logout</Link></li>
                  </ul>
                </>
                :
                <>
                  <button 
                    className="btn" 
                    type="button" 
                    onClick={()=>{navigate('/Login')}}
                    style={{ color: "white " }}>
                    Sign In
                  </button>
                </>
            }
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
