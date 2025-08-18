import React from "react";

const SectionTitle = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-8">
      <h2 className="text-2xl sm:text-3xl md:text-[40px] font-bold text-[#121212]">{title}</h2>
      {subtitle && (
        <p className="mt-2 text-base md:text-lg text-gray-500">{subtitle}</p>
      )}
    </div>
  );
};

export default SectionTitle;
