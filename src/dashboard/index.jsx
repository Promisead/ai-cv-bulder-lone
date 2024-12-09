import React, { useEffect, useState } from "react";
import AddResume from "./components/AddResume";
//import { useUser } from '@clerk/clerk-react'
import GlobalApi from "./../../service/GlobalApi";
import ResumeCardItem from "./components/ResumeCardItem";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("ai");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [userCVs, setUserCVs] = useState([]);
  const [isErrorInfo, setIsErrorInfo] = useState("");

  // const {user}=useUser();
  //console.log("user: " +user?.primaryEmailAddress?.emailAddress)
  const [resumeList, setResumeList] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  let { user } = useSelector((state) => state.userAuth);
  //console.log(user)

  useEffect(() => {
    user && GetResumesList();
  }, [user]);

  /**
   * Used to Get Users Resume List
   */
  const GetResumesList = () => {
    GlobalApi.GetUserResumes(user?.email).then((resp) => {
      console.log(resp.data);
      setResumeList(resp.data.data);
    });
  };

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/login");
  };
  return (
    <>
      <div className="flex mt-0 min-h-screen bg-gray-50">
        {/* Sidebar */}
        <div
          className={`w-64 min-h-screen bg-blue-800 text-white ${
            sidebarOpen ? "block" : "hidden"
          } sm:block`}
        >
          <div className="flex justify-between items-center p-6 border-b border-blue-900">
            <button
              className="text-white sm:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰
            </button>
          </div>
          <nav className="flex flex-col px-4 py-6">
            <button
              onClick={() => {
                setActiveTab("myCVs");
                navigate("/cvs");
              }}
              className={`text-white  py-3 px-4 rounded-md ${
                activeTab === "myCVs" ? "bg-blue-700" : "hover:bg-blue-700"
              } mb-2`}
            >
              My CVs
            </button>
            <button
              onClick={() => {
                setActiveTab("ai");
                navigate("/ai");
              }}
              className={`text-white py-3 px-4 rounded-md ${
                activeTab === "ai" ? "bg-blue-700" : "hover:bg-blue-700"
              } mb-2`}
            >
              Crea8 with AI
            </button>

            <button
              onClick={() => {
                setActiveTab("templates");
                navigate("/template");
              }}
              className={`text-white py-3 px-4 rounded-md ${
                activeTab === "templates" ? "bg-blue-700" : "hover:bg-blue-700"
              } mb-2`}
            >
              Templates
            </button>
            <button
              onClick={() => {
                setActiveTab("profileSettings");
                navigate("/profilesetting");
              }}
              className={`text-white py-3 px-4 rounded-md ${
                activeTab === "profileSettings"
                  ? "bg-blue-700"
                  : "hover:bg-blue-700"
              } mb-2`}
            >
              Profile Settings
            </button>
            <button
              onClick={() => {
                setActiveTab("pricing");
                navigate("/pricing");
              }}
              className={`text-white py-3 px-4 rounded-md ${
                activeTab === "pricing" ? "bg-blue-700" : "hover:bg-blue-700"
              } mb-2`}
            >
              Pricing Plans
            </button>
            <button
              onClick={handleLogout}
              className="text-white py-3 px-4 rounded-md hover:bg-blue-700 mb-2"
            >
              Logout
            </button>
          </nav>
        </div>
        <div className="mt-20 p-10 md:px-20 lg:px-32">
          <h2 className="text-center font-bold text-3xl">Generate CVs with AI</h2>
          <p className="text-center">Start Creating AI resume to land your next Job role</p>
          <div
            className="grid grid-cols-2 
      md:grid-cols-3 lg:grid-cols-3 gap-10
      mt-10
      "
          >
            <AddResume />
            {resumeList?.length > 0
              ? resumeList.map((resume, index) => (
                  <ResumeCardItem
                    resume={resume}
                    key={index}
                    refreshData={GetResumesList}
                  />
                ))
              : [1, 2, 3, 4].map((item, index) => (
                  <div
                    key={index}
                    className="h-[280px] rounded-lg bg-slate-200 animate-pulse"
                  ></div>
                ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
