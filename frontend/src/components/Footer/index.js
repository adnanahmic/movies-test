import React from "react";
import "./footer.scss";


const Footer = () => {
  return (
    <footer>
      <p type="name">Credits: Adnan Ahmic</p>
      <p type="year">{new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
