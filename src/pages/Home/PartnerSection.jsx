import React from "react";
import Marquee from "react-fast-marquee";

const partners = [
  { name: "Peecho", url: "https://cdn.prod.website-files.com/64635391b8b44bf81493741f/64648312f4191cab11a4ebdf_peecho.svg" },
  { name: "ING", url: "https://cdn.prod.website-files.com/64635391b8b44bf81493741f/6464832af92c6bb858ba1c13_ing.svg" },
  { name: "Gemeente Amsterdam", url: "https://cdn.prod.website-files.com/64635391b8b44bf81493741f/646483465ae7c51a438c4022_gemeente-amsterdam.svg" },
  { name: "VGZ", url: "https://cdn.prod.website-files.com/64635391b8b44bf81493741f/6464835c5d0d2c49f4b3dfc7_vgz.svg" },
  { name: "A-Insight", url: "https://cdn.prod.website-files.com/64635391b8b44bf81493741f/64648373122cbb504b741636_a-insight.svg" },
  { name: "Papyr", url: "https://cdn.prod.website-files.com/64635391b8b44bf81493741f/6464838bf940eff8138cb8df_papyr.svg" },
  { name: "Edge Impulse", url: "https://cdn.prod.website-files.com/64635391b8b44bf81493741f/6464839ef295c0007c5b0c17_edge-impulse.svg" },
  { name: "Unceil", url: "https://cdn.prod.website-files.com/64635391b8b44bf81493741f/646483b07594894b574478d9_unceil.svg" },
  { name: "Total Energies", url: "https://cdn.prod.website-files.com/64635391b8b44bf81493741f/646483cc9be93d6e98e20189_total-energies.svg" },
  { name: "Dunlop", url: "https://cdn.prod.website-files.com/64635391b8b44bf81493741f/646483f8ff1b9504a8d93dc9_Dunlop.svg" },
  { name: "Moby Park", url: "https://cdn.prod.website-files.com/64635391b8b44bf81493741f/646484158c8fd22869c1eeb5_moby-park.svg" },
  { name: "ABN", url: "https://cdn.prod.website-files.com/64635391b8b44bf81493741f/6464844aff1b9504a8d9cf46_abn.svg" },
  { name: "Esomar", url: "https://cdn.prod.website-files.com/64635391b8b44bf81493741f/64648459f940eff8138dfe4b_esomar.svg" },
];

const PartnerSection = () => {
  return (
    <section className="py-16 bg-gray-50 antialiased">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-[40px] font-bold text-[#121212]">
            Our Trusted Partners
          </h2>
          <p className="mt-2 text-base md:text-lg text-gray-500">
            We collaborate with top brands to provide the best club experience.
          </p>
        </div>

        {/* Marquee */}
        <Marquee speed={50} gradient={false} pauseOnHover={true}>
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-4 sm:px-6 md:px-8 flex items-center justify-center w-20 sm:w-28 md:w-36 lg:w-40 xl:w-48"
            >
              <img
                src={partner.url}
                alt={partner.name}
                className="max-h-12 w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/160x48/cccccc/ffffff?text=Logo+Error";
                }}
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default PartnerSection;
