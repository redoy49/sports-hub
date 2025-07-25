import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Swal from "sweetalert2";

const PendingBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    data: pendingBookings = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["pending-bookings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings/pending", {
        params: { email: user.email },
      });
      return res.data;
    },
  });

  const cancelMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/bookings/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["pending-bookings", user?.email]);
    },
    onError: () => {
      alert("Failed to cancel the booking.");
    },
  });

  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this pending booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        cancelMutation.mutate(id);
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto border border-gray-200 px-4 py-6 mt-16 lg:mt-2">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">
        Pending Bookings
      </h2>

      {isLoading && <LoadingSpinner />}

      {isError && (
        <p className="text-red-500">
          Error: {error?.message || "Something went wrong."}
        </p>
      )}

      {!isLoading && pendingBookings.length === 0 && (
        <p className="text-center text-gray-500 py-6 italic">
          No pending bookings found.
        </p>
      )}

      {!isLoading && pendingBookings.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-blue-50">
              <tr>
                <th>Court</th>
                <th>Date</th>
                <th>Slot</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingBookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.courtName}</td>
                  <td>{new Date(booking.date).toLocaleDateString()}</td>
                  <td>{booking.slots?.join(", ") || "N/A"}</td>
                  <td>${booking.price.toFixed(2)}</td>
                  <td>
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="btn btn-sm btn-error"
                      disabled={cancelMutation.isLoading}
                    >
                      Cancel
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

export default PendingBookings;
