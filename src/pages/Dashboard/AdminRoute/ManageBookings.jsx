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
      <h2 className="text-2xl font-bold mb-4">📋 Manage Confirmed Bookings</h2>

      <input
        type="text"
        placeholder="Search by court title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border w-full max-w-md rounded-md"
      />

      {loading ? ( 
        <div className="flex justify-center items-center py-10">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">#</th>
                <th className="p-2 border">Court</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Slot</th>
                <th className="p-2 border">User</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking._id}>
                  <td className="p-2 border text-center">{index + 1}</td>
                  <td className="p-2 border">{booking.courtName}</td>
                  <td className="p-2 border">{new Date(booking.date).toLocaleDateString()}</td>
                  <td className="p-2 border">{booking.slot}</td>
                  <td className="p-2 border">{booking.userName || "N/A"}</td>
                  <td className="p-2 border">{booking.userEmail}</td>
                  <td className="p-2 border">${booking.price}</td>
                  <td className="p-2 border text-green-600 font-semibold">{booking.status}</td>
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
