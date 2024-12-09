import React,{useEffect} from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
//import SignInPage from "./auth/sign-in/index.jsx";
//import Home from "./home/index.jsx";
import Home from "./screens/Home.jsx"
import Dashboard from "./dashboard/index.jsx";
//import { ClerkProvider, SignIn } from "@clerk/clerk-react";
import EditResume from "./dashboard/resume/[resumeId]/edit/index.jsx";
import ViewResume from "./my-resume/[resumeId]/view/index.jsx";
import ProfileSettings from "./screens/ProfileSetting.jsx";
import Cvs from  "./screens/CVS"
import PricingPlan from "./screens/Pricing.jsx";
import EditCV from "./screens/EditCv.jsx";
import Preview from "./screens/Preview.jsx"
import Template from "./screens/Template.jsx"
//import Help from "./screens/Help.js"
import P from "./screens/Preview5.jsx"
import Form from "./screens/CvForm.jsx"
import { autoLogin } from './store/action/userAppStorage'; // Adjust import based on your file structure

 

import LoginPage from "./screens/Login.jsx";
import SignupPage from "./screens/Signup.jsx";
import SubscriptionPlan from "./screens/Subscription.jsx";


//configuring redux store
import { thunk } from "redux-thunk";
import { combineReducers, createStore, applyMiddleware } from "redux";

import { Provider, useDispatch, useSelector } from "react-redux";
import { userAuthReducer } from "./store/reducer/userAppStorage";
import { Help } from "@mui/icons-material";
//import ErrorBoundary from "./screens/Error/Error"
//configuring the redux store
const rootReducer = combineReducers({
  userAuth: userAuthReducer,
});




//creating store
const store = createStore(rootReducer, applyMiddleware(thunk));

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const apiUrl = import.meta.env.VITE_BASE_URL2;



// Custom wrapper to handle dispatch on initialization
const AppWrapper = () => {
 
  let { user } = useSelector(state => state.userAuth);
  let dispatch = useDispatch()
  
  useEffect(() => {
    const checkAutoLogin = async () => {
       await dispatch(autoLogin());
    };
    checkAutoLogin();
    
  }, [dispatch]);
 

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      element: <App />,
      children: [
        {
          path: "/ai",
          element: <Dashboard />,
        },
        {
          path: "/dashboard/resume/:resumeId/edit",
          element:user?<EditResume />:<LoginPage/>,
        },
        {
          path: "/cvs",
          element:user?<Cvs/>:<LoginPage/>,
        },
        {
          path: "/editcv/:id",
          element: user?<EditCV/>:<LoginPage/>,
        },
        {
          path: "/form/:id",
          element: user?<Form/>:<LoginPage/>,
        },
        {
          path: "/preview/:id",
          element:  user?<Preview/> :<LoginPage/>,
        },
        {
          path: "/preview/:id/:cv",
          element:  user?<Preview/>:<LoginPage/>,
        },
        {
          path: "/profilesetting",
          element:   user?<ProfileSettings/>:<LoginPage/>,
        },
        {
          path: "/subscription/:id",
          element:   user?<SubscriptionPlan/>:<LoginPage/>,
        },
        {
          path: "/pricing",
          element:  user?<PricingPlan/>:<LoginPage/>,
        },
        {
          path: "/template",
          element:  user?<Template/>:<LoginPage/>,
        },
      ],
    },
    ,
    {
      path: "/Login",
      element: < LoginPage />,
    },
    {
      path: "/signup",
      element: < SignupPage />,
    },
    {
      path: "/help",
      element: <Help />,
    },
    {
      path: "/my-resume/:resumeId/view",
      element: <ViewResume />,
    },
  ]);

  return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AppWrapper />
  </Provider>
);
