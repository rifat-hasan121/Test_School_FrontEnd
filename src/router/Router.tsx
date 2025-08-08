import { createBrowserRouter } from "react-router";
import HomeLayout from "../pages/HomeLayout";
// import QuestionsMCQ from "../components/QuestionsMCQ";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: HomeLayout,
       

    }
])