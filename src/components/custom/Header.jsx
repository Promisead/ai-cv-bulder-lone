import React, { useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
// import { UserButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/action/userAppStorage";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userAuth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/Login");
  };

  return (
    <div className="main-content">
      <nav className="fixed top-0 w-full z-10 shadow-lg mb-4 py-5 bg-[#3A60D0]">
        <div className="container mx-2 flex justify-between items-center">
          {/* Logo or brand can go here */}
          <Link to="/" className="text-white font-bold text-xl">
            {/* Add your brand logo/text here */}
            Logo
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>

          {/* Desktop Links */}
          <div className={`lg:flex items-center space-x-4 ${isMenuOpen ? "block" : "hidden"}`}>
            {user ? (
              <>
                <Link to="/cvs">
                  <Button variant="outline">Dashboard</Button>
                </Link>
                <Link onClick={handleLogout}>
                  <Button variant="outline">Logout</Button>
                </Link>
              </>
            ) : (
              <Link to="/Login">
                <Button variant="outline">Login</Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu Links */}
        <div
          className={`lg:hidden ${isMenuOpen ? "block" : "hidden"} absolute top-0 left-0 w-full bg-[#3A60D0] py-5`}
        >
          <div className="flex flex-col items-center space-y-4">
            {user ? (
              <>
                <Link to="/cvs">
                  <Button variant="outline">Dashboard</Button>
                </Link>
                <Link onClick={handleLogout}>
                  <Button variant="outline">Logout</Button>
                </Link>
              </>
            ) : (
              <Link to="/Login">
                <Button variant="outline">Login</Button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;



