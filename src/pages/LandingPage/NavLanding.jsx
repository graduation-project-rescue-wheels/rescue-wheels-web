import React from 'react'
import logo from '../../Assents/Images/Auth/logoB.png'
import { NavLink } from 'react-router-dom'
const NavLanding = () => {
    return (
        <div>
        <nav className="navbar navbar-expand-lg bg-transparent">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
            <img className='w-25' src={logo} alt=''/>
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse  navbar-collapse" id="navbarSupportedContent">
       
          <form className="d-flex ms-auto" role="search">
            <button className="btn btn-outline-dark me-3" style={{borderBlockColor:"#362e93"}} type="submit">Sign In</button>
            <button className="btn btn-dark" type="submit" style={{backgroundColor:"#362e93",borderBlockColor:"#362e93"}}>Sign Up</button>
          </form>
        </div>
      </div>
    </nav>
    
        </div>
      )
}

export default NavLanding
