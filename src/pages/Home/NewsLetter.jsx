import React from "react";

const NewsletterSection = () => {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-[40px] font-bold text-[#121212]">
          Stay Updated with Club News
        </h2>
        <p className="mt-2 text-base md:text-lg text-gray-500">
          Subscribe to our newsletter and never miss updates on new announcements,
          events, and promotions.
        </p>

        {/* Form */}
        <form className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-2/3 px-5 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-xl shadow hover:bg-blue-700 transition"
          >
            Subscribe
          </button>
        </form>

        {/* Note */}
        <p className="mt-4 text-sm text-gray-500">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
};

export default NewsletterSection;
