import React from "react";
import Image from "next/image";
import "@/asset/css/app.min.css";
import "@/asset/css/style.css";
import "@/asset/css/fontawesome.min.css";
import logo from "@/asset/img/medical-logo-no-bg.png"

const Footer = () => {
  return (
    <footer className="footer-wrapper footer-layout1">
      <div className="widget-area bg-[#060a1c]">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-md-6 col-xl-auto">
              <div className="widget footer-widget">
                <div className="th-widget-about">
                  <div className="about-logo">
                    <a href="/">
                      <Image src={logo} alt="Mediax" width={150} height={50} />
                    </a>
                  </div>
                  <p className="about-text">
                    Ethio Medical Clinic is dedicated to providing high-quality
                    healthcare with great attention and care.
                  </p>
                  <p className="footer-info">
                    <i className="fal fa-location-dot"></i> Addis Ababa,
                    Ethiopia
                  </p>
                  <p className="footer-info">
                    <i className="fal fa-envelope"></i>
                    <a href="mailto:info@mediax.com" className="info-box_link">
                      info@ethiomedicalapp.com
                    </a>
                  </p>
                  <p className="footer-info">
                    <i className="fal fa-phone"></i>
                    <a href="tel:+251985322632" className="info-box_link">
                      +2519 85 32 26 32
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-auto">
              <div className="widget widget_nav_menu footer-widget">
                <h3 className="widget_title">Quick Links</h3>
                <div className="menu-all-pages-container">
                  <ul className="menu">
                    <li>
                      <a >About Us</a>
                    </li>
                    <li>
                      <a >Terms of Use</a>
                    </li>
                    <li>
                      <a >Our Services</a>
                    </li>
                    <li>
                      <a >Help & FAQs</a>
                    </li>
                    <li>
                      <a>Blog</a>
                    </li>
                    <li>
                      <a>Privacy policy</a>
                    </li>
                    <li>
                      <a>Contact Us</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-auto">
              <div className="widget widget_nav_menu footer-widget">
                <h3 className="widget_title">Popular Services</h3>
                <div className="menu-all-pages-container">
                  <ul className="menu">
                    <li>
                      <a>Cardiology Care</a>
                    </li>
                    <li>
                      <a>Urgent Care</a>
                    </li>
                    <li>
                      <a>Orthopedic Care</a>
                    </li>
                    <li>
                      <a>Diagnosis Department</a>
                    </li>
                    <li>
                      <a >Gastroenterology</a>
                    </li>
                    <li>
                      <a >Therapy Department</a>
                    </li>
                    <li>
                      <a >Dental Service</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-wrap">
        <div className="container">
          <div className="row gy-2 align-items-center">
            <div className="col-md-7">
              <p className="copyright-text">
                Copyright <i className="fal fa-copyright"></i> 2024
                <a href="home-medical-clinic.html">Ethio Medical App</a>. All Rights
                Reserved.
              </p>
              <p className="copyright-text">Developed by Muse Feta</p>
            </div>
            <div className="col-md-5 text-center text-md-end">
              <div className="th-social">
                <a href="https://www.facebook.com/">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://www.twitter.com/">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://www.linkedin.com/">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="https://www.whatsapp.com/">
                  <i className="fab fa-whatsapp"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
