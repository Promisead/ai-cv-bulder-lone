import { useEffect, useState } from 'react'
import './App.css'
import { Outlet, useNavigate } from 'react-router-dom'
//import { useUser } from '@clerk/clerk-react'
import Header from './components/custom/Header'
import { Toaster } from './components/ui/sonner'
import { useDispatch, useSelector } from 'react-redux';
//import './App.css';
import FallBackComponent from './components/Fallback';
//import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { autoLogin } from './store/action/userAppStorage'; // Adjust import based on your file structure






function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
   
    const checkAutoLogin = async () => {
      const result = await dispatch(autoLogin());
    
      if (!result.bool) {
        // Redirects to "/login" if not logged in

      } 

    };
    checkAutoLogin();
  }, [dispatch, navigate]);

  
  //const {user,isLoaded,isSignedIn}=useUser();

  /*  if(!user)
  {
    return <Navigate to={'/Login'} />
  }  */

  

  return (
    <>
      <Header/>
      <Outlet/>
      <Toaster />
    </>
  )
}

export default App
