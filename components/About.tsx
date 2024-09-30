import React from 'react'
import "@/asset/css/app.min.css";
import "@/asset/css/style.css";
import "@/asset/css/fontawesome.min.css";
import Image from 'next/image';
import shape1 from "@/asset/img/shape/pattern_shape_1.png";
import medicine from "@/asset/img/shape/medicine_1.png";
import about_1 from "@/asset/img/normal/about_1_3.png"

const About = () => {
  return (
    <div className="space" id="about-sec">
      <div className="shape-mockup" data-top="0" data-right="0">
        <Image src={shape1} alt="shape" />
      </div>
      <div className="shape-mockup jump" data-bottom="10%" data-right="3%">
        <Image src={medicine} alt="shape" />
      </div>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-6 mb-30 mb-xl-0">
            <div className="img-box1">
              <div className="img1">
                <Image src={about_1} alt="about" />
              </div>
              <div className="about-info">
                <h3 className="box-title">Dr. Abel Lema</h3>
                <p className="box-text">
                  Cardiologis
                  <br />
                  MBBS, FCPS
                </p>
                <div className="box-review">
                  <i className="fa-sharp fa-solid fa-star"></i>
                  <i className="fa-sharp fa-solid fa-star"></i>
                  <i className="fa-sharp fa-solid fa-star"></i>
                  <i className="fa-sharp fa-solid fa-star"></i>
                  <i className="fa-sharp fa-solid fa-star"></i>
                </div>
                <a href="tel:+251985322632" className="box-link">
                  <i className="fa-solid fa-phone"></i> +251985322632
                </a>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="ps-xxl-4 ms-xl-2 text-center text-xl-start">
              <div className="title-area mb-32">
                <span className="sub-title">About Us Company</span>
                <h2 className="sec-title">Affordable Health Care Solutions</h2>
                <p className="sec-text">
                  Ethio Medical App is designed to provide accessible and
                  affordable healthcare services to patients across Ethiopia.
                  Our app simplifies the process of booking medical
                  appointments, accessing professional healthcare providers, and
                  managing patient information, all in one place.
                </p>
              </div>
              <div className="mb-30 mt-n1">
                <div className="checklist style2 list-two-column">
                  <ul>
                    <li>
                      <i className="fas fa-heart-pulse"></i> Medical
                      Professionals
                    </li>
                    <li>
                      <i className="fas fa-heart-pulse"></i> Facilities and
                      Equipment
                    </li>
                    <li>
                      <i className="fas fa-heart-pulse"></i> Emergency Care
                    </li>
                    <li>
                      <i className="fas fa-heart-pulse"></i> Medical Consulting
                    </li>
                    <li>
                      <i className="fas fa-heart-pulse"></i> Services Offered
                    </li>
                    <li>
                      <i className="fas fa-heart-pulse"></i> Specializations
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <a href="/login" className="th-btn">
                  Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About