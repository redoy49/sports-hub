import React from "react";
import { Link } from "react-router";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-50 text-base-content mt-10 border-t border-gray-50">
      <div className="container max-w-[1600px] mx-auto px-5 lg:px-8 xl:px-[8%] py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h2 className="footer-title mb-4 text-lg font-bold">About Us</h2>
          <p className="text-gray-700 leading-relaxed text-sm">
            We’re dedicated to building a thriving sports community by providing
            top facilities, expert coaching, and an inclusive environment.
            Join us and be part of something great!
          </p>
        </div>
        <div>
          <h2 className="footer-title mb-4 text-lg font-bold">Contact Us</h2>
          <p className="flex items-center gap-2 mb-2 text-gray-700">
            <FaMapMarkerAlt /> 123 Club Avenue, Sports City, Dhaka 1207
          </p>
          <p className="flex items-center gap-2 mb-2 text-gray-700">
            <FaPhone /> +880 1234 567 890
          </p>
          <p className="flex items-center gap-2 mb-2 text-gray-700">
            <FaEnvelope /> info@sportsclub.com
          </p>
        </div>
        <div>
          <h2 className="footer-title mb-4 text-lg font-bold">Quick Links</h2>
          <ul className="space-y-2 text-gray-700">
            <li>
              <Link to="/" className="link link-hover hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link to="/courts" className="link link-hover hover:text-primary">
                Courts
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="link link-hover hover:text-primary"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="link link-hover hover:text-primary"
              >
                Register
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="footer-title mb-4 text-lg font-bold">Follow & Subscribe</h2>
          <div className="flex gap-5 text-3xl mb-6 text-gray-700">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition-colors"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Subscribed!");
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              placeholder="Your email"
              required
              className="input input-bordered w-full sm:flex-1 rounded-md"
              aria-label="Email for newsletter subscription"
            />
            <button
              type="submit"
              className="btn btn-primary rounded-md whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="text-center py-5 border-t border-gray-200 text-sm text-gray-600">
        <p>© {new Date().getFullYear()} Sports Club Management System. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
