import { createBrowserRouter } from "react-router";
import HomeLayout from "../pages/HomeLayout";
import Login from "../auth/Login";
import Register from "../auth/Register";
// import QuestionsMCQ from "../components/QuestionsMCQ";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: HomeLayout,
      
       

    },
    {
        path: "/login",
        Component: Login
    },
    {
        path: "/register",
        Component: Register
    }

])