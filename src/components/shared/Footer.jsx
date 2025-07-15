import React from "react";
import { Link } from "react-router";
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#F9F5F6] text-base-content mt-10">
      <div className="container max-w-[1600px] mx-auto px-5 lg:px-8 xl:px-[8%] 2xl:px-[15.5%] py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Contact Info */}
        <div>
          <h2 className="footer-title">Contact Us</h2>
          <p className="flex items-center gap-2">
            <FaPhone /> +880 1234 567 890
          </p>
          <p className="flex items-center gap-2">
            <FaEnvelope /> info@sportsclub.com
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h2 className="footer-title">Quick Links</h2>
          <ul className="space-y-2">
            <li><Link to="/" className="link link-hover">Home</Link></li>
            <li><Link to="/courts" className="link link-hover">Courts</Link></li>
            <li><Link to="/dashboard/user" className="link link-hover">Dashboard</Link></li>
            <li><Link to="/register" className="link link-hover">Register</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="footer-title">Follow Us</h2>
          <div className="flex gap-4 text-2xl">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-primary">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-primary">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-primary">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center py-4 border-t border-base-300">
        <p>© {new Date().getFullYear()} Sports Club Management System. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
