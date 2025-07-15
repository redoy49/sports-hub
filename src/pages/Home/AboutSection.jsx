import React from "react";
import heroImg from "../../assets/hero-sports.jpg";
import SectionTitle from "../../components/shared/SectionTitle";

const AboutSection = () => {
  return (
    <section className="bg-base-100">
      <div className="max-w-[1600px] mx-auto px-5 lg:px-8 xl:px-[8%] 2xl:px-[15.5%] py-10 lg:py-20 flex flex-col-reverse lg:flex-row items-center gap-10">

        {/* Left Image */}
        <div className="flex-1">
          <img
            src={heroImg}
            alt="About Club"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Right Text */}
        <div className="flex-1 space-y-6">
          <SectionTitle
            title="About Our Club"
            subtitle="Building Community Through Sports"
          />
          <p className="text-gray-600 leading-relaxed">
            Our sports club has been serving the community for over 10 years, offering state-of-the-art facilities, professional coaching, and a friendly environment for all skill levels. We believe in promoting health, fitness, and teamwork through sports.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Whether you're here for casual play or serious competition, our club provides everything you need—from modern courts to organized events and training programs.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
