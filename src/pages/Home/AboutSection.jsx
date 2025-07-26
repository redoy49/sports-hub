import React from "react";
import about from "../../assets/about.avif";
import SectionTitle from "../../components/shared/SectionTitle";

const AboutSection = () => {
  return (
    <section className="bg-white">
      <div className="max-w-[1600px] mx-auto px-5 lg:px-8 xl:px-[8%] py-10 lg:py-20 flex flex-col-reverse lg:flex-row items-center gap-10">

        {/* Left Image */}
        <div className="flex-1 w-full">
          <img
            src={about}
            alt="Our sports club facility showing players and environment"
            className="w-full h-auto rounded-2xl shadow-md object-cover transition-transform duration-300 hover:scale-[1.02]"
            loading="lazy"
          />
        </div>

        {/* Right Text Content */}
        <div className="flex-1 space-y-6 text-left">
          <SectionTitle
            title="Discover the Heart of Our Club"
            subtitle="10+ Years of Empowering the Community Through Sports"
          />
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
            Since day one, our mission has been to create a welcoming space for
            athletes of all levels. Whether you're a beginner or a seasoned
            competitor, our club is built to elevate your game and build
            lifelong connections.
          </p>
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
            With professional coaching, organized events, and modern facilities,
            we’re more than just a club—we’re a community united by a passion
            for sports.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
