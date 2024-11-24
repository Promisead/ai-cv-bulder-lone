import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
//import { useUser } from '@clerk/clerk-react'
import GlobalApi from './../../service/GlobalApi';
import ResumeCardItem from './components/ResumeCardItem';
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
  
function Dashboard()  {


 // const {user}=useUser();
  //console.log("user: " +user?.primaryEmailAddress?.emailAddress)
  const [resumeList,setResumeList]=useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  let { user } = useSelector((state) => state.userAuth);
  //console.log(user)



  useEffect(()=>{
    user&&GetResumesList() 
  },[user]) 



  /**
   * Used to Get Users Resume List
   */
  const GetResumesList=()=>{
    GlobalApi.GetUserResumes(user?.email)
    .then(resp=>{
      console.log(resp.data)
     setResumeList(resp.data.data);
    })
  }
  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl'>Generate CVs with AI</h2>
      <p>Start Creating AI resume to land your next Job role</p>
      <div className='grid grid-cols-2 
      md:grid-cols-3 lg:grid-cols-4 gap-5
      mt-10
      '>
        <AddResume/>
        {resumeList.length>0?resumeList.map((resume,index)=>(
          <ResumeCardItem resume={resume} key={index} refreshData={GetResumesList} />
        )):
        [1,2,3,4].map((item,index)=>(
          <div key={index} className='h-[280px] rounded-lg bg-slate-200 animate-pulse'>
          </div>
        ))
        }
      </div>
    </div>
  )
}

export default Dashboard