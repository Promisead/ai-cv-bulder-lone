import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
//import { UserButton, useUser } from "@clerk/clerk-react";
import { FaUserCircle } from "react-icons/fa";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {autoLogin, logout} from "../../store/action/userAppStorage"


function Header() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  let { user } = useSelector(state => state.userAuth);




  const handleLogout = async () => {
    await dispatch( logout())
    navigate('/Login')
  };

  

  return (
    <div className="main-content ">
      <nav className="fixed top-0 w-full  z-10 shadow-lg mb-4 py-5 bg-[#3A60D0] ">
        {user ? (
          <div className="container mx-2 flex justify-between items-center">
            <Link to={"/cvs"}>
              <Button variant="outline">Dashboard</Button>
            </Link>
            <Link onClick={handleLogout} >
              <Button variant="outline">Logout</Button>
            </Link>
          </div>
        ) : 
        <div className="ml-10">
          (
          <Link to='/Login'>
            <div className="container mx-auto flex justify-between items-center">
              <Button variant="outline">Login</Button>
            </div>
          </Link>
        )
        </div>
        }
      </nav>
    </div>
  );
}

export default Header;
