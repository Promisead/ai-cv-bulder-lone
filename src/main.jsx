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
import Home from "./home/index.jsx";
//import Home from "./screens/Home.jsx"
import Dashboard from "./dashboard/index.jsx";
//import { ClerkProvider, SignIn } from "@clerk/clerk-react";
import EditResume from "./dashboard/resume/[resumeId]/edit/index.jsx";
import ViewResume from "./my-resume/[resumeId]/view/index.jsx";

import LoginPage from "./screens/Login.jsx";
import SignupPage from "./screens/Signup.jsx";

import ExternalRedirect from "./utils/ExternalRedirect.js";

//configuring redux store
import { thunk } from "redux-thunk";
import { combineReducers, createStore, applyMiddleware } from "redux";

import { Provider } from "react-redux";
import { userAuthReducer } from "./store/reducer/userAppStorage";

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
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/resume/:resumeId/edit",
        element: <EditResume />,
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
    path: "/my-resume/:resumeId/view",
    element: <ViewResume />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
