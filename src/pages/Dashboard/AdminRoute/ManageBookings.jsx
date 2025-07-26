import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const query = search ? `?title=${search}` : "";
        const res = await axiosSecure.get(`/bookings/confirmed${query}`);
        setBookings(res.data);
      } catch (err) {
        console.error("Error loading confirmed bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [axiosSecure, search]);

  return (
    <div className="max-w-full mx-auto border border-gray-200 px-4 py-6 mt-16 lg:mt-2">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">
        📋 Manage Booking Approvals
      </h2>
      
      <div className="search-input-container w-full md:w-80 flex-shrink-0 relative mb-6">
        <input
          type="text"
          placeholder="Search by court title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-gray-300 text-gray-700 rounded-full shadow-xs leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-sm pl-6 pr-4 py-2"
        />
        <i className="fas fa-search absolute left-3 top-2.5 text-gray-500 text-sm"></i>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : bookings.length === 0 ? (
        <p className="text-gray-500 italic">No pending bookings available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border border-gray-200">
            <thead className="bg-base-200 text-sm">
              <tr>
                <th>#</th>
                <th>Court</th>
                <th>Date</th>
                <th>Slot</th>
                <th>Email</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr
                  key={booking._id}
                  className="hover:bg-base-100 transition-colors"
                >
                  <td>{index + 1}</td>
                  <td>{booking.courtName}</td>
                  <td>{new Date(booking.date).toLocaleDateString()}</td>
                  <td>{booking.slots?.join(", ") || "N/A"}</td>
                  <td>{booking.userEmail}</td>
                  <td className="text-green-600 font-semibold">
                    ${booking.price}
                  </td>
                  <td>
                    <span className="btn btn-xs md:btn-sm btn-success text-white capitalize">
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageBookings;
