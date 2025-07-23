import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const ConfirmedBookings = () => {
  const [bookings, setBookings] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  useEffect(() => {
    const fetchConfirmedBookings = async () => {
      try {
        const res = await axiosSecure.get(`/bookings/confirmed?email=${user.email}`);
        setBookings(res.data);
      } catch (error) {
        console.error("Failed to load confirmed bookings", error);
      }
    };

    fetchConfirmedBookings();
  }, [axiosSecure, user.email]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">📅 Confirmed Bookings</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">#</th>
              <th className="p-2 border">Court</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Slot</th>
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
                <td className="p-2 border">${booking.price}</td>
                <td className="p-2 border text-green-600 font-semibold capitalize">{booking.status}</td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No confirmed bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConfirmedBookings;
