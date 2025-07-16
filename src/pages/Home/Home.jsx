import React from "react";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import LocationSection from "./LocationSection";
import PromotionSection from "./PromotionSection";
import TestimonialSection from "./TestimonialSection";

const Home = () => {
  return (
    <div className="space-y-20">
      <HeroSection />
      <AboutSection />
      <LocationSection />
      <PromotionSection />
      <TestimonialSection />
    </div>
  );
};

export default Home;
