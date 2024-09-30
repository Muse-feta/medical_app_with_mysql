import React from "react";
import "@/asset/css/app.min.css";
import "@/asset/css/style.css";
import "@/asset/css/fontawesome.min.css";

const AddressMap: React.FC = () => {
  return (
    <div>
      <div className="">
        <div className="contact-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d198257.29576888058!2d38.73315829204809!3d9.145024898303213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b87c0d473e6cf%3A0x500c06e27216e0eb!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1693322045845!5m2!1sen!2sus"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default AddressMap;
