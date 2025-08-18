import React from "react";
import SectionTitle from "../../components/shared/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PromotionSection = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: coupons = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/coupons");
      return res.data;
    },
  });

  return (
    <section className="bg-slate-100 py-16">
      <div className="max-w-[1600px] mx-auto px-5 lg:px-8 xl:px-[8%]">
        <SectionTitle
          title="Exclusive Promotions"
          subtitle="Save more with our latest discount coupons"
        />

        {isLoading && (
          <p className="text-center mt-8 text-gray-700">Loading coupons...</p>
        )}
        {isError && (
          <p className="text-center text-red-600 mt-8">
            Failed to load coupons.
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          {coupons.slice(0, 4).map(({ _id, code, discount, description }) => (
            <div
              key={_id || code}
              className="bg-white rounded-xl p-6 flex flex-col items-center text-center shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-4xl font-extrabold text-black mb-2">
                {discount}%
              </div>
              <div className="text-xl font-semibold mb-2 text-black">
                Coupon Code:
              </div>
              <div className="text-2xl font-mono bg-gray-100 px-4 py-2 rounded-md mb-4 select-all cursor-pointer text-black">
                {code}
              </div>
              <p className="text-gray-700">{description}</p>
            </div>
          ))}

          {/* Empty state */}
          {!isLoading && coupons.length === 0 && (
            <p className="text-center text-gray-500 col-span-full">
              No active promotions available.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PromotionSection;
