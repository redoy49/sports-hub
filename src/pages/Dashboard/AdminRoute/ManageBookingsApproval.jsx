import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Swal from "sweetalert2";

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
      Swal.fire({
        icon: "success",
        title: "Approved!",
        text: "Booking approved successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
      queryClient.invalidateQueries(["pending-bookings"]);
    },
  });

  const rejectBooking = useMutation({
    mutationFn: async (id) => axiosSecure.patch(`/bookings/reject/${id}`),
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Rejected!",
        text: "Booking rejected successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
      queryClient.invalidateQueries(["pending-bookings"]);
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-full mx-auto border border-gray-200 px-4 py-6 mt-16 lg:mt-2">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">
        📋 Manage Booking Approvals
      </h2>

      {bookings.length === 0 ? (
        <p className="text-gray-500 italic">No pending bookings available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-blue-50 text-sm">
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Court</th>
                <th>Slot</th>
                <th>Price</th>
                <th>Date</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr
                  key={booking._id}
                  className="hover:bg-base-100 transition-colors"
                >
                  <td>{index + 1}</td>
                  <td>{booking.userEmail}</td>
                  <td>{booking.courtName}</td>
                  <td>{booking.slots?.join(", ") || "N/A"}</td>
                  <td className="text-green-600 font-semibold">
                    ${booking.price}
                  </td>
                  <td>{new Date(booking.date).toLocaleDateString()}</td>
                  <td className="flex gap-2 justify-center items-center py-2">
                    <button
                      onClick={() => approveBooking.mutate(booking._id)}
                      className="btn btn-xs md:btn-sm btn-success text-white"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => rejectBooking.mutate(booking._id)}
                      className="btn btn-xs md:btn-sm btn-error text-white"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-gray-500">
                    No pending bookings found.
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

export default ManageBookingsApproval;
