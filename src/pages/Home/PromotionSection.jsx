import React from "react";
import SectionTitle from "../../components/shared/SectionTitle";

// Sample static coupon data
const coupons = [
  { code: "ABC123", discount: 5, description: "5% off on all bookings" },
  { code: "SUMMER20", discount: 20, description: "20% discount for summer season" },
  { code: "WELCOME10", discount: 10, description: "10% off for new members" },
];

const PromotionSection = () => {
  return (
    <section className="bg-green-50 py-16">
      <div className="max-w-[1600px] mx-auto px-5 lg:px-8 xl:px-[8%] 2xl:px-[15.5%]">
        <SectionTitle
          title="Exclusive Promotions"
          subtitle="Save more with our latest discount coupons"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coupons.map(({ code, discount, description }) => (
            <div
              key={code}
              className="card bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center"
            >
              <div className="text-4xl font-extrabold text-green-700 mb-2">{discount}%</div>
              <div className="text-xl font-semibold mb-2">Coupon Code:</div>
              <div className="text-2xl font-mono bg-green-100 px-4 py-2 rounded-md mb-4 select-all cursor-pointer">
                {code}
              </div>
              <p className="text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromotionSection;
