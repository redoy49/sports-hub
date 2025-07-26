import React from "react";
import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";

import badminton from "../../assets/badminton.jpg";
import badminton2 from "../../assets/badminton2.jpg";
import basketball from "../../assets/basketball.jpg";
import tennis from "../../assets/tennis.png";
import tennis2 from "../../assets/tennis2.jpg";

const HeroSection = () => {
  const images = [badminton, badminton2, basketball, tennis, tennis2];

  return (
    <section
      className="w-full bg-slate-50 pt-24 lg:pt-32 xl:pl-6 min-h-[calc(100vh-240px)]"
    >
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between max-w-[1600px] mx-auto px-5 lg:px-8 xl:px-[8%] py-10 lg:py-20">
        
        {/* Left Text Content */}
        <div className="text-center lg:text-left flex-1 space-y-6 mt-6 lg:mt-0">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">
            Manage Your Club Effortlessly
          </h1>
          <p className="text-gray-600">
            Book courts, manage memberships, and stay updated with club
            announcements all in one place.
          </p>
          <div className="flex justify-center lg:justify-start gap-4">
            <Link
              to="/courts"
              className="btn btn-primary rounded-full px-6"
            >
              View Courts
            </Link>
            <Link
              to="/register"
              className="btn btn-outline btn-primary rounded-full px-6"
            >
              Join Now
            </Link>
          </div>
        </div>

        <div className="flex-1 w-full flex justify-center lg:justify-end mt-10 lg:mt-0">
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards, Autoplay]}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            className="mySwiper max-w-xs lg:max-w-sm"
          >
            {images.map((img, i) => (
              <SwiperSlide
                key={i}
                className="bg-white flex items-center justify-center rounded-lg"
              >
                <img
                  src={img}
                  alt={`Slide ${i + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
