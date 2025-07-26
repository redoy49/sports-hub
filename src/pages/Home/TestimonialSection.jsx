import React from "react";
import SectionTitle from "../../components/shared/SectionTitle";

const testimonials = [
  {
    id: 1,
    name: "Sarah K.",
    role: "Member",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    feedback:
      "Joining this club was the best decision I made! The facilities are top-notch and the community is welcoming.",
  },
  {
    id: 2,
    name: "John M.",
    role: "Coach",
    photo: "https://randomuser.me/api/portraits/men/35.jpg",
    feedback:
      "Coaching here has been a rewarding experience. The management supports growth and organization.",
  },
  {
    id: 3,
    name: "Emily R.",
    role: "Member",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    feedback:
      "The booking system is so easy to use, and the courts are always well maintained.",
  },
  {
    id: 4,
    name: "David P.",
    role: "Member",
    photo: "https://randomuser.me/api/portraits/men/42.jpg",
    feedback:
      "A vibrant community and excellent facilities — highly recommended for all skill levels!",
  },
];

const TestimonialSection = () => {
  return (
    <section className="bg-base-100 py-16">
      <div className="max-w-[1600px] mx-auto px-5 lg:px-8 xl:px-[8%]">
        <SectionTitle
          title="What Our Members Say"
          subtitle="Real feedback from our club community"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          {testimonials.map(({ id, name, role, photo, feedback }) => (
            <div
              key={id}
              className="bg-white rounded-xl p-6 flex flex-col items-center text-center border border-gray-200"
            >
              <img
                src={photo}
                alt={name}
                className="w-20 h-20 rounded-full object-cover mb-4"
              />
              <p className="italic text-gray-700 mb-4">"{feedback}"</p>
              <div className="font-semibold text-lg">{name}</div>
              <div className="text-sm text-gray-500">{role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
