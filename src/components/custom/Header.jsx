import React, { useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
// import { UserButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/action/userAppStorage";
import { FaUserCircle } from "react-icons/fa";

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
    <div className="flex justify-between items-center mb-0 bg-white shadow-lg p-4">
      <div className="flex items-center space-x-6 w-full px-4">
        <FaUserCircle size={35} className="text-blue-600" />
        <button
          onClick={handleLogout}
          className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>

  );
}

export default Header;



