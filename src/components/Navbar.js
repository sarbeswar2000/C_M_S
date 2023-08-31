// import React ,{useEffect} from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  let location = useLocation();
  // useEffect(()=>{
  //   console.log(location);
  // },[location]);
  let navigate=useNavigate();
 const  handleOnLogout=()=>{
     localStorage.removeItem('token');
     navigate("/Login");  
 }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-white bg-dark ">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/Landpage">
            C_M_S
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
          
          </button>
          <div className="collapse navbar-collapse " id="navbarSupportedContent">
            <ul className="navbar-nav me mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/Home" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/Home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/About" ? "active" : ""
                  }`}
                  to="/About"
                >
                  About
                </Link>
              </li>
              {/* {!localStorage.getItem('token')?<form className="form-inline my-2 my-lg-0">
             
            </form>:<button className="btn btn-primary mx-2" onClick={handleOnLogout}>Logout</button>} */}
            {!localStorage.getItem('token')?<form className="form-inline my-2 my-lg-0">      
            <Link className="btn btn-primary mx-2 " to="/AdminSignup" role="button">
              Becoming an admin
              </Link>        
              <Link className="btn btn-primary mx-2" to="/login" role="button">
                Login 
              </Link>
              <Link className="btn btn-primary mx-2 " to="/signup" role="button">
                Signup
              </Link>
            </form>:<button className="btn btn-primary mx-2" onClick={handleOnLogout}>Logout</button>}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
