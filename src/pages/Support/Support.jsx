import React, { useState } from "react";

const faqs = [
  {
    question: "How do I book a court?",
    answer:
      "You can book a court by navigating to the 'View Courts' page, selecting your desired time, and confirming your booking.",
  },
  {
    question: "How can I manage my membership?",
    answer:
      "Go to your profile and click on 'Membership' to update your details, renew your plan, or check your membership status.",
  },
  {
    question: "How do I report an issue or get help?",
    answer:
      "You can submit a request using the form below, and our support team will get back to you within 24 hours.",
  },
];

const Support = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can send formData to your backend or API
    console.log(formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="min-h-[80vh] py-30 lg:py-40 px-5 lg:px-20  bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#121212] mb-6">
            Support Center
          </h1>
          <p className="text-gray-700 text-lg">
            Have questions or need assistance? Our team is here to help you manage your club efficiently.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h2>
          {faqs.map((faq, i) => (
            <div key={i} className="border-0 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition">
              <h3 className="font-medium text-gray-900">{faq.question}</h3>
              <p className="text-gray-600 mt-2">{faq.answer}</p>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Contact Support</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0c6af8]"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0c6af8]"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="5"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0c6af8]"
              required
            ></textarea>
            <button
              type="submit"
              className="rounded-full px-8 py-3 bg-[#0c6af8] text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Support;
