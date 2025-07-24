import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";

const PendingBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // 🔄 Fetch pending bookings
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

  // ❌ Cancel booking mutation
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

  // ❌ Cancel action
  const handleCancel = (id) => {
    if (confirm("Are you sure you want to cancel this pending booking?")) {
      cancelMutation.mutate(id);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Pending Bookings</h2>

      {/* ⏳ Loading */}
      {isLoading && <LoadingSpinner/>}

      {/* ❌ Error */}
      {isError && <p className="text-red-500">Error: {error.message}</p>}

      {/* 📭 Empty */}
      {!isLoading && pendingBookings.length === 0 && (
        <p>No pending bookings found.</p>
      )}

      {/* 📄 Table */}
      {!isLoading && pendingBookings.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
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
                  <td>{Array.isArray(booking.slot) ? booking.slot.join(", ") : booking.slot}</td>
                  <td>${booking.price}</td>
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
