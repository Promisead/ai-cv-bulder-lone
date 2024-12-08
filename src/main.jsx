import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
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

import LoginPage from "./screens/Login.jsx";
import SignupPage from "./screens/Signup.jsx";
import SubscriptionPlan from "./screens/Subscription.jsx";


//configuring redux store
import { thunk } from "redux-thunk";
import { combineReducers, createStore, applyMiddleware } from "redux";

import { Provider } from "react-redux";
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
        element: <EditResume />,
      },
      {
        path: "/cvs",
        element: <Cvs/>,
      },
      {
        path: "/editcv/:id",
        element: <EditCV/>,
      },
      {
        path: "/form/:id",
        element: <Form/>,
      },
      {
        path: "/preview/:id",
        element: <Preview/>,
      },
      {
        path: "/preview/:id/:cv",
        element: <Preview/>,
      },
      {
        path: "/profilesetting",
        element: <ProfileSettings/>,
      },
      {
        path: "/subscription/:id",
        element: <SubscriptionPlan/>,
      },
    
      {
        path: "/pricing",
        element: <PricingPlan/>,
      },
      {
        path: "/template",
        element: <Template/>,
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

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
