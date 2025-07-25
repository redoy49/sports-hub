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
    <div className="overflow-x-auto max-w-6xl mx-auto mt-16 lg:mt-2 bg-white rounded-sm border border-gray-200 px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <FaBullhorn className="text-blue-600 text-2xl" />
        Club Announcements
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-200">
          <thead className="bg-blue-50 text-gray-700">
            <tr>
              <th>#</th>
              <th>Announcement</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {announcements.length > 0 ? (
              announcements.map((a, index) => (
                <tr key={a._id} className="hover:bg-blue-50 transition">
                  <td className="font-medium">{index + 1}</td>
                  <td>{a.text}</td>
                  <td className="text-sm text-gray-500">
                    {format(new Date(a.createdAt), "PPP p")}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="text-center py-6 text-gray-500 italic"
                >
                  No announcements yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Announcements;
