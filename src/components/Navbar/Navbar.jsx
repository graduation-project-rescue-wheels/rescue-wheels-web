import { NavLink } from "react-router-dom"
import logo from '../../Assents/Images/Auth/logoo.png'
const Navbar = () => {
  return (
    <div>
  <div className=" bg-dark w-100 py-1">
  <ul className="col-md-1 ms-auto justify-content-around mb-2 me-5 mb-lg-0 d-flex">
  
  
  
      <NavLink className="nav-link text-white" to="/about">About</NavLink>
  
  
      <NavLink className="nav-link text-white" to="/services">Services</NavLink>
  
  </ul>
</div>


   <nav className="navbar navbar-expand-lg bg-light-subtle">
  <div className="container-fluid">
    <NavLink className="navbar-brand" href="#">
      <img src={logo} alt="" style={{ width:'2.5rem' }}/>
    </NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse " id="navbarSupportedContent">
    <ul className="navbar-nav mx-auto mb-2   mb-lg-0 ">
        <li className="nav-item">
          <NavLink className="nav-link " aria-current="page" to="/HomePage">Repair Centers</NavLink>
        </li>
        
        <li className="nav-item">
          <NavLink className="nav-link" to="/History">History</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/Emergency">Emergency</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/Vehicles">Vehicles</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/Settings">Settings</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/Technician">Technician</NavLink>
        </li>
        
      </ul>
    {/* <form className="d-flex bg ms-auto rounded-pill bg-transparent" role="search">
        <input className="form-control me-2 rounded-pill" type="search" placeholder="Search" aria-label="Search" />
      </form> */}
      
     
    </div>
  </div>
</nav>

    </div>
  )
}

export default Navbar
