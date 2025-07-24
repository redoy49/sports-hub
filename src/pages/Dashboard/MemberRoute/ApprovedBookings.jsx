import React from "react";
import { useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";

const ApprovedBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure(); // ✅ Correct usage
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // 📦 Fetch approved bookings for the logged-in member
  const {
    data: approvedBookings = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["approved-bookings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings/approved", {
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
      queryClient.invalidateQueries(["approved-bookings", user?.email]);
    },
    onError: () => {
      alert("Failed to cancel the booking.");
    },
  });

  // 🧭 Go to payment page
  const handlePayment = (id) => {
    navigate(`/dashboard/payment-page/${id}`);
  };

  // ❌ Cancel booking action
  const handleCancel = (id) => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      cancelMutation.mutate(id);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Approved Bookings</h2>

      {/* ⏳ Loading State */}
      {isLoading && <LoadingSpinner/>}

      {/* ❌ Error State */}
      {isError && <p className="text-red-500">Error: {error.message}</p>}

      {/* ✅ Data State */}
      {!isLoading && approvedBookings.length === 0 && (
        <p>No approved bookings found.</p>
      )}

      {!isLoading && approvedBookings.length > 0 && (
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
              {approvedBookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.courtName}</td>
                  <td>{new Date(booking.date).toLocaleDateString()}</td>
                  <td>{booking.slot}</td>
                  <td>${booking.price}</td>
                  <td>
                    <button
                      onClick={() => handlePayment(booking._id)}
                      className="btn btn-sm btn-success mr-2"
                    >
                      Pay
                    </button>
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

export default ApprovedBookings;
