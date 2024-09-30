import React from 'react'
import "@/asset/css/app.min.css";
import "@/asset/css/style.css";
import "@/asset/css/fontawesome.min.css";

const OpenHours = () => {
  return (
    <div>
      <div className="space">
        <div className="container">
          <div className="row gy-4">
            {/* open hours card starts here */}
            <div className="col-xl-12 col-md-12">
              <div className="location-card">
                <h3 className="box-title">Our Location</h3>
                <p className="footer-info">
                  <i className="far fa-location-dot"></i> Addis Ababa, Ethiopia
                </p>
                <p className="footer-info">
                  <i className="far fa-envelope"></i>
                  <a
                    href="mailto:info@contactaus.com"
                    className="info-box_link"
                  >
                    info@ethiomedicalapp.com
                  </a>
                </p>
                <p className="footer-info">
                  <i className="far fa-phone"></i>
                  <a href="tel:+251985322632" className="info-box_link">
                    +2519 85 32 26 32
                  </a>
                </p>
              </div>
              <div className="contact-feature">
                <div className="box-icon">
                  <i className="far fa-clock"></i>
                </div>
                <div className="media-body">
                  <h3 className="box-title">Opening Hours</h3>
                  <p className="box-text">Mon to sat: 8:00am - 9:00pm</p>
                  <p className="box-schedule">Monday - Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OpenHours