import React from "react";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import LocationSection from "./LocationSection";
import PromotionsSection from "./PromotionSection";
// import TestimonialsSection from "./TestimonialsSection";

const Home = () => {
  return (
    <div className="space-y-20">
      <HeroSection />
      <AboutSection />
      <LocationSection />
      <PromotionsSection />
      {/* 
      <AnnouncementsSection />
      <TestimonialsSection />  */}
    </div>
  );
};

export default Home;
