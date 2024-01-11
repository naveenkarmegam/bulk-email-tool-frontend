import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./styles/navbar.css";
import { setGreetings, setSideBarToggle, sideBarToggle } from "../../../redux/global/FunctionalSlice";



// import { Avatar } from "@mui/material";
// import { deepOrange } from "@mui/material/colors";
// import { ClipLoader } from "react-spinners";

const TobBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const sidebarToggle = useSelector((state) => state.funactionality.sideBarToggle);
  const {greetings} = useSelector((state) => state.funactionality);



  const updateGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      dispatch(setGreetings("Good Morning"))
    } else if (currentHour >= 12 && currentHour < 18) {
      dispatch(setGreetings("Good Afternoon"))
    } else {
      dispatch(setGreetings("Good Evening"))
    }
  };
  useEffect(() => {

    updateGreeting()
  }, [dispatch]);
  const handleSidebar = () => {
    dispatch(setSideBarToggle(!sideBarToggle));
  };
  const removeSidebar = () => {
    dispatch(setSideBarToggle(sideBarToggle));
  };
  const handleLogout = () => {
    logout();
    navigate("/login");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar navbar-expand navbar-light bg-primary topbar mb-4 shadow px-4 ">
      {sidebarToggle ? (
        <button
          id="sidebarToggleTop"
          className="btn btn-link rounded-circle mr-3"
          onClick={removeSidebar}
        >
          <i className="fa fa-bars text-light" />
        </button>
      ) : (
        <button
          id="sidebarToggleTop"
          className="btn btn-link  rounded-circle mr-3"
          onClick={handleSidebar}
        >
          <i className="fa fa-bars text-light" />
        </button>
      )}
      {/* <h1 className="text-orange fw-bolder  d-none d-md-block">ADUDU</h1> */}

      {/* Topbar Navbar */}
      <ul className="navbar-nav ml-auto">
        {/* Nav Item - Alerts */}
        <li className="nav-item dropdown no-arrow mx-1">
          <span
            className="nav-link text-dark"
            style={{fontSize:"1.3em"}}

          >
           {greetings}
            
          </span>

        </li>


      
        <div className="topbar-divider d-none d-sm-block"></div>

        {/* Nav Item - User Information */}
        <li className="nav-item dropdown no-arrow">
          <a
            className="nav-link dropdown-toggle"
            href="..."
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">
           Naveen
            </span>

          </a>
          {/* Dropdown - User Information */}
          <div
            className="dropdown-menu dropdown-menu-end me-2 shadow animated--grow-in "
            aria-labelledby="userDropdown"
          >
            <Link className="dropdown-item" to={"/settings"}>
              <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
              Profile
            </Link>

            <div className="dropdown-divider" />
            <Link className="dropdown-item" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
              Logout
            </Link>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default TobBar;
