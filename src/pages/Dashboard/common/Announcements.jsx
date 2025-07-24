import React from "react";
import useAnnouncements from "../../../hooks/useAnnouncements";
import { FaBullhorn } from "react-icons/fa";
import { format } from "date-fns";
import LoadingSpinner from "../../../components/LoadingSpinner";

const Announcements = () => {
  const {
    data: announcements = [],
    isLoading,
    isError,
    error,
  } = useAnnouncements();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="text-center text-red-600 mt-6">
        Failed to load announcements: {error.message}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow-xl rounded-2xl">
      <div className="flex items-center gap-2 mb-6">
        <FaBullhorn className="text-blue-600 text-xl" />
        <h2 className="text-2xl font-bold text-gray-800">Club Announcements</h2>
      </div>

      {announcements.length === 0 ? (
        <p className="text-gray-500 text-center">No announcements yet.</p>
      ) : (
        <div className="space-y-4 max-h-[400px] overflow-y-auto">
          {announcements.map((announcement) => (
            <div
              key={announcement._id}
              className="border-l-4 border-blue-600 bg-blue-50 p-4 rounded-md shadow-sm hover:shadow-md transition"
            >
              <p className="text-gray-800">{announcement.text}</p>
              <p className="text-sm text-gray-500 mt-1">
                📅 {format(new Date(announcement.createdAt), "PPP p")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Announcements;
