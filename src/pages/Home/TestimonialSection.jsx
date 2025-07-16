import React from "react";
import SectionTitle from "../../components/shared/SectionTitle";

// Sample testimonial data
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
];

const TestimonialSection = () => {
  return (
    <section className="bg-base-100 py-16">
      <div className="max-w-[1600px] mx-auto px-5 lg:px-8 xl:px-[8%] 2xl:px-[15.5%]">
        <SectionTitle
          title="What Our Members Say"
          subtitle="Real feedback from our club community"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map(({ id, name, role, photo, feedback }) => (
            <div
              key={id}
              className="card p-6 bg-white rounded-lg shadow-md flex flex-col items-center text-center"
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
