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
    <div className="p-4">
      <h2 className="flex items-center gap-1 text-xl font-bold mb-4">
        📋 Manage Confirmed Bookings
      </h2>

      <input
        type="text"
        placeholder="Search by court title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input input-bordered w-full max-w-md mb-6"
      />

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
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
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-4 text-gray-500">
                    No confirmed bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageBookings;
