import React from "react";
import { Link } from "react-router";

const blogPosts = [
  {
    id: 1,
    title: "The Future of Club Management",
    excerpt: "Discover how digital tools are transforming the way clubs operate and engage members.",
    image: "https://img.freepik.com/free-photo/sports-tools_53876-138077.jpg?semt=ais_hybrid&w=740&q=80",
    date: "August 18, 2025",
  },
  {
    id: 2,
    title: "Top 5 Benefits of Booking Courts Online",
    excerpt: "Save time, reduce conflicts, and enjoy a seamless booking experience with online tools.",
    image: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    date: "August 10, 2025",
  },
  {
    id: 3,
    title: "Engaging Your Club Members",
    excerpt: "From announcements to events, learn strategies to keep your community active and connected.",
    image: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    date: "August 05, 2025",
  },
];

const BlogSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-[40px] font-bold text-[#121212]">Latest Blogs</h2>
          <p className="mt-2 text-base md:text-lg text-gray-500">Insights and tips to help you get the most out of your club</p>
        </div>

        {/* Blog Grid (3 posts) */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-52 object-cover"
              />
              <div className="p-6">
                <p className="text-sm text-gray-500">{post.date}</p>
                <h3 className="text-lg font-semibold text-gray-800 mt-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="mt-3 text-gray-600 text-sm line-clamp-3">{post.excerpt}</p>
                <Link
                  to={`/blog/${post.id}`}
                  className="mt-4 inline-block text-blue-600 font-medium hover:underline"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
