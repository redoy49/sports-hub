import React from "react";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import LocationSection from "./LocationSection";
import PromotionSection from "./PromotionSection";
import TestimonialSection from "./TestimonialSection";
import BlogSection from "./BlogSection";
import NewsletterSection from "./NewsLetter";

const Home = () => {
  return (
    <div className="space-y-20">
      <HeroSection />
      <AboutSection />
      <LocationSection />
      <PromotionSection />
      <TestimonialSection />
      <BlogSection/>
      <NewsletterSection/>
    </div>
  );
};

export default Home;
