import React from 'react'
import "@/asset/css/app.min.css";
import "@/asset/css/style.css";
import "@/asset/css/fontawesome.min.css";
import heroImg from "@/asset/img/hero/hero_bg_2_1.jpg";

import heroImage from "@/asset/img/hero/hero_custom_2.png";
import Image from 'next/image';
import shape1 from "@/asset/img/hero/hero_shape_2_1.svg";
import shape2 from "@/asset/img/hero/hero_shape_2_2.svg";
import shape3 from "@/asset/img/hero/hero_shape_2_3.svg";
import shape4 from "@/asset/img/hero/hero_shape_2_4.svg";
import shape5 from "@/asset/img/hero/hero_shape_2_5.svg";

const Hero = () => {
  return (
    <div
      className="th-hero-wrapper hero-2 "
      id="hero"
      style={{ backgroundImage: `url(${heroImg.src})` }}
    >
      <div className="hero-inner">
        <div className="container">
          <div className="hero-style2">
            <span className="sub-title mt-6">24/7 Emergency Service</span>
            <h1 className="hero-title2">
              <span className="title1">
                Caring for <span className="line-text">Health</span>
              </span>
              <span className="title2">Caring for You</span>
            </h1>
            <p className="hero-text">
              Ethio Medical Clinic is dedicated to providing high-quality
              healthcare with great attention and care. We are committed to
              improving community health by offering professional services and
              showing excellence in our work.
            </p>
            <div className="btn-group justify-content-center">
              <a href="/signup" className="th-btn">
                Register
              </a>
              <a href="/appointement" className="th-btn style4">
                Make Appointement
              </a>
            </div>
          </div>
        </div>
        <div className="hero-img mr-[100px]">
          <Image src={heroImage} alt="Image" />
        </div>
        <div className="hero-shape1">
          <Image src={shape1} alt="shape" />
        </div>
        <div className="hero-shape2">
          <Image src={shape2} alt="shape" />
        </div>
        <div className="hero-shape3">
          <Image src={shape3} alt="shape" />
        </div>
        <div className="hero-shape4">
          <Image src={shape4} alt="shape" />
        </div>
        <div className="hero-shape5">
          <Image src={shape5} alt="shape" />
        </div>
      </div>
    </div>
  );
}

export default Hero
