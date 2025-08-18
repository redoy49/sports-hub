import React from "react";
import SectionTitle from "../../components/shared/SectionTitle";
import mapImg from "../../assets/map.png"; // your image file

const LocationSection = () => {
  return (
    <section className="bg-base-100 py-16">
      <div className="max-w-[1600px] mx-auto px-5 lg:px-8 xl:px-[8%]">
        <SectionTitle
          title="Our Location"
          subtitle="Visit us or find us on the map"
        />

        <div className="flex flex-col lg:flex-row gap-10 items-start mt-8">
          {/* Address Info */}
          <div className="flex-1 w-full text-left text-gray-700 space-y-3 text-base sm:text-lg">
            <h3 className="text-xl sm:text-2xl font-semibold mb-2">
              Sports Club Address
            </h3>
            <p>123 Club Avenue</p>
            <p>Sports City, Dhaka 1207</p>
            <p>Bangladesh</p>
            <p>Phone: +880 1234 567 890</p>
            <p>Email: info@sportsclub.com</p>
          </div>

          <div className="flex-1 w-full rounded-xl overflow-hidden relative">
            <div className="pt-[56.25%]"> 
              <img
                src={mapImg}
                alt="Sports Club Map"
                className="absolute inset-0 h-full w-full object-cover rounded-xl shadow"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
