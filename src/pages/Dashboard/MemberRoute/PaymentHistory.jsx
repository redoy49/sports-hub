import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axiosSecure.get(`/payments?email=${user.email}`);
        setPayments(res.data);
      } catch (error) {
        console.error("Failed to load payments", error);
      }
    };
    fetchPayments();
  }, [axiosSecure, user.email]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">💳 Payment History</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">#</th>
              <th className="p-2 border">Booking ID</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Transaction ID</th>
              <th className="p-2 border">Paid At</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((pay, index) => (
              <tr key={pay._id}>
                <td className="p-2 border text-center">{index + 1}</td>
                <td className="p-2 border">{pay.bookingId}</td>
                <td className="p-2 border">${pay.amount}</td>
                <td className="p-2 border">{pay.status}</td>
                <td className="p-2 border">{pay.paymentIntentId}</td>
                <td className="p-2 border">
                  {new Date(pay.paidAt).toLocaleString()}
                </td>
              </tr>
            ))}
            {payments.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No payments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
