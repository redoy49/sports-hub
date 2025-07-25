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
    <div className="max-w-6xl mx-auto border border-gray-200 px-4 py-6 mt-16 lg:mt-2">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">
        💳 Payment History
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-blue-50">
            <tr>
              <th className="text-left py-2 px-4">#</th>
              <th className="text-left py-2 px-4">Booking ID</th>
              <th className="text-left py-2 px-4">Amount</th>
              <th className="text-left py-2 px-4">Status</th>
              <th className="text-left py-2 px-4">Transaction ID</th>
              <th className="text-left py-2 px-4">Paid At</th>
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-6 text-gray-500 italic"
                >
                  No payments found.
                </td>
              </tr>
            ) : (
              payments.map((pay, index) => (
                <tr key={pay._id} className="border-t">
                  <td className="py-2 px-4 text-gray-700 font-medium">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4">{pay.bookingId}</td>
                  <td className="py-2 px-4">${pay.amount}</td>
                  <td className="py-2 px-4">{pay.status}</td>
                  <td className="py-2 px-4">{pay.paymentIntentId}</td>
                  <td className="py-2 px-4">
                    {new Date(pay.paidAt).toLocaleString()}
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

export default PaymentHistory;
