import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const usePendingBookings = () => {
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ["pending-bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings/pending");
      return res.data;
    },
  });
};

const ManageBookingsApproval = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: bookings = [], isLoading } = usePendingBookings();

  const approveBooking = useMutation({
    mutationFn: async (id) => axiosSecure.patch(`/bookings/approve/${id}`),
    onSuccess: () => {
      toast.success("Booking approved");
      queryClient.invalidateQueries(["pending-bookings"]);
    },
  });

  const rejectBooking = useMutation({
    mutationFn: async (id) => axiosSecure.patch(`/bookings/reject/${id}`),
    onSuccess: () => {
      toast.success("Booking rejected");
      queryClient.invalidateQueries(["pending-bookings"]);
    },
  });

  if (isLoading) return <p>Loading pending bookings...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Booking Approvals</h2>
      {bookings.length === 0 ? (
        <p>No pending bookings available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">User</th>
                <th className="p-2">Court</th>
                <th className="p-2">Slot</th>
                <th className="p-2">Price</th>
                <th className="p-2">Date</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="border-t">
                  <td className="p-2">{booking.userEmail}</td>
                  <td className="p-2">{booking.courtName}</td>
                  <td className="p-2">{booking.slot}</td>
                  <td className="p-2">${booking.price}</td>
                  <td className="p-2">{booking.date}</td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => approveBooking.mutate(booking._id)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => rejectBooking.mutate(booking._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      Reject
                    </button>
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

export default ManageBookingsApproval;
