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
        const res = await axiosSecure.get(
          `/bookings/confirmed?email=${user.email}`
        );
        setBookings(res.data);
      } catch (error) {
        console.error("Failed to load confirmed bookings", error);
      }
    };

    fetchConfirmedBookings();
  }, [axiosSecure, user.email]);

  return (
    <div className="max-w-6xl mx-auto border border-gray-200 px-4 py-6 mt-16 lg:mt-2">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">
        📅 Confirmed Bookings
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-blue-50">
            <tr>
              <th className="text-left py-2 px-4">#</th>
              <th className="text-left py-2 px-4">Court</th>
              <th className="text-left py-2 px-4">Date</th>
              <th className="text-left py-2 px-4">Slot</th>
              <th className="text-left py-2 px-4">Price</th>
              <th className="text-left py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-6 text-gray-500 italic"
                >
                  No confirmed bookings found.
                </td>
              </tr>
            ) : (
              bookings.map((booking, index) => (
                <tr key={booking._id} className="border-t">
                  <td className="py-2 px-4 text-gray-700 font-medium">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4">{booking.courtName}</td>
                  <td className="py-2 px-4">
                    {new Date(booking.date).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4">
                    {booking.slots?.join(", ") || "N/A"}
                  </td>
                  <td className="py-2 px-4">${booking.price}</td>
                  <td className="py-2 px-4 text-green-600 font-semibold capitalize">
                    {booking.status}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConfirmedBookings;
