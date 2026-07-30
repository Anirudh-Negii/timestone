import React, { useRef, useEffect } from "react";
import { bannerHomeStyles } from "../assets/dummyStyles";
import Navbar from "./Navbar";
import video from "../assets/bannervideo.mp4";

const BannerHome = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const reduceMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  return (
    <div className={bannerHomeStyles.container}>
      <div className={bannerHomeStyles.navbarWrapper}>
        <Navbar />
      </div>

      <div className={bannerHomeStyles.videoContainer}>
        <video
          ref={videoRef}
          className={bannerHomeStyles.video}
          autoPlay
          loop
          muted
          playsInline 
          preload="metadata"
          poster="/fallback.jpg"
          role="presentation"
        >
          <source src={video} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default BannerHome;
