import Image from "next/image";
import Navbar from "./components/navbar";
import Hero from "./components/hero-section";
import WhatsComing from "./components/whatsComing";
import AboutUs from "./components/aboutUs";
import WTH from "./components/wth";
import MakeMeYours from "./components/makeMeYours";
import FinalCallToAction from "./components/waitlist";
import Footer from "./components/footer";
import { WebcamPixelGridDemo } from "./lib/effects/pexelWebcam";

export default function Home() {
  return (
    <div className="dark:bg-[#ff3333] ">
      <main className="">
        
        <Navbar></Navbar>
        <WebcamPixelGridDemo></WebcamPixelGridDemo>
        
        <WhatsComing></WhatsComing>
        <AboutUs></AboutUs>
        <WTH></WTH>
        <MakeMeYours></MakeMeYours>
        <FinalCallToAction></FinalCallToAction>
        <Footer></Footer>
        
      </main>
    </div>
  );
}
