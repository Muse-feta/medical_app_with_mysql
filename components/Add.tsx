import React from 'react'
import "@/asset/css/app.min.css";
import "@/asset/css/style.css";
import "@/asset/css/fontawesome.min.css";
import Image from 'next/image';
import cta from "@/asset/img/normal/cta_1.png"
import cta_bg from "@/asset/img/bg/cta_bg_4.jpg"

const Add = () => {
  return (
    <section
      className="overflow-hidden cta-sec4 mt=[-70px]"
      style={{ backgroundImage: `url(${cta_bg.src})` }}
    >
      <div className="container z-index-common">
        <div className="row align-items-end justify-content-center text-center text-xl-start">
          <div className="col-xl-7 col-lg-9 space-extra">
            <div className="title-area mb-32 mt-24">
              <h2 className="sec-title text-white">
                We’re welcoming new patients and can’t wait to meet you!
              </h2>
              <p className="sec-text text-white">
                We’re excited to welcome new patients to Ethio Medical! Our
                dedicated team is here to provide personalized, high-quality
                care tailored to your needs. Whether you're looking for routine
                check-ups, specialized treatments, or consultations with our
                expert doctors, we're ready to support your health journey.
              </p>
            </div>
            <div className="btn-group justify-content-center">
              <a href="/appointement" className="th-btn shadow-1">
                Book Appointment
              </a>
              <a href="/contact" className="th-btn style2 shadow-1">
                Contact Us
              </a>
            </div>
          </div>
          <div className="col-xl-5">
            <div className="">
              <div className="h-100">
                <Image src={cta} alt="cta" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Add