import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
//import { useUser } from '@clerk/clerk-react'
import Header from './components/custom/Header'
import { Toaster } from './components/ui/sonner'
import { useDispatch, useSelector } from 'react-redux';
//import './App.css';
import FallBackComponent from './components-manual/Fallback';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { autoLogin } from './store/action/userAppStorage'; // Adjust import based on your file structure
import { userAuthReducer } from "./store/reducer/userAppStorage";





function App() {
  const [count, setCount] = useState(0)
  const dispatch = useDispatch();
  const navigate = useNavigate();
 // const dispatch = useDispatch();
  let { user } = useSelector(state => state.userAuth);
  console.log(user)

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
