import React from "react";
import { useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Swal from "sweetalert2";

const ApprovedBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure(); 
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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

  const handlePayment = (id) => {
    navigate(`/dashboard/payment-page/${id}`);
  };

  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        cancelMutation.mutate(id);
        Swal.fire("Cancelled!", "Your booking has been cancelled.", "success");
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto border border-gray-200 px-4 py-6 mt-16 lg:mt-2">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">
        Approved Bookings
      </h2>

      {isLoading && <LoadingSpinner />}

      {isError && (
        <p className="text-red-500">
          Error: {error?.message || "Something went wrong."}
        </p>
      )}

      {!isLoading && approvedBookings.length === 0 && (
        <p className="text-center text-gray-500 py-6 italic">
          No approved bookings found.
        </p>
      )}

      {!isLoading && approvedBookings.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-blue-50">
              <tr>
                <th className="text-left py-2 px-4">Court</th>
                <th className="text-left py-2 px-4">Date</th>
                <th className="text-left py-2 px-4">Slot</th>
                <th className="text-left py-2 px-4">Price</th>
                <th className="text-left py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {approvedBookings.map((booking) => (
                <tr key={booking._id} className="border-t">
                  <td className="py-2 px-4">{booking.courtName}</td>
                  <td className="py-2 px-4">
                    {new Date(booking.date).toLocaleDateString()}
                  </td>
                  <td>{booking.slots?.join(", ") || "N/A"}</td>
                  <td className="py-2 px-4">${booking.price}</td>
                  <td className="py-2 px-4 space-x-2">
                    <button
                      onClick={() => handlePayment(booking._id)}
                      className="btn btn-sm btn-success"
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
