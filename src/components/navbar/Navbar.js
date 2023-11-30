import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import icon from '../../images/icon.jpeg'
import './Navbar.css'
import { loginContext } from '../../contexts/loginContext'

function Navbar() {
  let [currentUser,error,userLoginStatus,loginUser,logoutUser]=useContext(loginContext)
  return (
    <div>
      <nav className="navbar navbar-expand-sm bg-dark p-0">
  <div className="container-fluid">
    <Link className="ms-3 w-25 navbar-brand text-primary" id="link" to="/"><img className='logo' src={icon} alt="React Image" ></img></Link>


    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon white"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
        <li className="nav-item me-3">
          <Link className="nav-link active text-white" id="link" to="/">Home</Link>
        </li>
        
          {currentUser.user==='customer' && (<li className="nav-item me-3">
          <Link className="nav-link active text-white" id="link" to="/userProfile">Profile</Link>
        </li>)}

        {currentUser.user==='admin' && (<li className="nav-item me-3">
          <Link className="nav-link active text-white" id="link" to="/adminProfile">Profile</Link>
        </li>)  }
        {(currentUser.user!=='customer' && currentUser.user!=='admin') && (<li className="nav-item me-3">
        <Link className="nav-link active text-white" id="link" to="/login">Profile</Link>
      </li>)  }
        
        
        {!userLoginStatus?(
		    <li className="nav-item">
          <Link className="nav-link active text-white" id="link" to="/login">Login</Link>
        </li>):(
        <li className="nav-item">
          <Link className="nav-link active text-white" id="link" to="/login" onClick={logoutUser}>Logout</Link>
        </li>)}
      </ul>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar;