import React from "react";
import { Link } from "react-router";
import heroImage from "../../assets/hero-sports.jpg"; // Replace with your actual hero image path

const HeroSection = () => {
  return (
    <section className="w-full bg-base-200">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between max-w-[1600px] mx-auto px-5 lg:px-8 xl:px-[8%] 2xl:px-[15.5%] py-10 lg:py-20 xl:py-44">

        {/* Left Text Content */}
        <div className="text-center lg:text-left flex-1 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">
            Manage Your Club Effortlessly
          </h1>
          <p className="text-gray-600">
            Book courts, manage memberships, and stay updated with club announcements all in one place.
          </p>
          <div className="flex justify-center lg:justify-start gap-4">
            <Link to="/courts" className="btn btn-primary">
              View Courts
            </Link>
            <Link to="/register" className="btn btn-outline btn-primary">
              Join Now
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1">
          <img
            src={heroImage}
            alt="Sports Club"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
