import React, { useEffect, useState }  from "react";
import Navbar from "../shared/Navbar";
import { Outlet } from "react-router";
import Footer from "../shared/Footer";
import Quiz from "../components/Quiz";



const HomeLayout: React.FC = () => {
    const [questions, setQuestions] = useState([]);


    useEffect(() => {
      fetch("/questions") // তোমার API url দিন
        .then((res) => res.json())
        .then((data) => setQuestions(data))
        .catch((err) => console.error(err));
    }, []);

    if (questions.length === 0) return <div>Loading...</div>;
  

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8 min-h-screen mt-16">
        <Quiz allQuestions={questions} />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
