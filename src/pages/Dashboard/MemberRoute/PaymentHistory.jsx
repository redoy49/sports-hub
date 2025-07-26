import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [isCardView, setIsCardView] = useState(false); // layout toggle
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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          💳 Payment History
          
        </h2>
        <button
          onClick={() => setIsCardView((prev) => !prev)}
          className="btn btn-sm btn-outline"
        >
          {isCardView ? "Table View" : "Card View"}
        </button>
      </div>

      {isCardView ? (
        // ✅ CARD VIEW
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {payments.length === 0 ? (
            <p className="text-gray-500 italic col-span-full">No payments found.</p>
          ) : (
            payments.map((pay, index) => (
              <div
                key={pay._id}
                className="bg-white shadow rounded-lg p-4 border border-slate-100"
              >
                <h3 className="font-bold text-lg mb-2">
                  #{index + 1} — ${pay.amount}
                </h3>
                <p className="text-sm"><strong>Booking ID:</strong> {pay.bookingId}</p>
                <p className="text-sm"><strong>Status:</strong> {pay.status}</p>
                <p className="text-sm"><strong>Transaction:</strong> {pay.paymentIntentId}</p>
                <p className="text-sm"><strong>Paid At:</strong> {new Date(pay.paidAt).toLocaleString()}</p>
              </div>
            ))
          )}
        </div>
      ) : (
        // ✅ TABLE VIEW
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
      )}
    </div>
  );
};

export default PaymentHistory;
