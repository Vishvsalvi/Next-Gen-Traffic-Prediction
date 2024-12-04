import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navbar } from "./components/demo/Navbar";
import { SideBar } from "./components/demo/SideBar";
import { HeroSection } from "./components/demo/HeroSection";
import { Footer } from "./components/demo/Footer";
import { InputDemo } from "./components/demo/InputDemo";
import { NewsSection } from "./components/demo/NewsSection";

function App() {
  const [roadNames, setRoadNames] = useState([]);

  useEffect(() => {
    const fetchRoadNames = async () => {
      const response = await axios.get(
        "https://next-gen-traffic-prediction.onrender.com/api/road_names"
      );
      setRoadNames(response.data.road_names);
    };

    fetchRoadNames();
  }, []);

  return (
    <>
      <div className="w-full  flex flex-col gap-4 bg-white">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-[auto_1fr] lg:gap-4">
          <SideBar></SideBar>
          <div className="flex flex-col justify-center md:mr-2">
            <Navbar></Navbar>
            <HeroSection></HeroSection>
            <InputDemo roadNames={roadNames}></InputDemo>
            <NewsSection></NewsSection>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
