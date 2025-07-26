import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useParams, useNavigate } from "react-router";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/LoadingSpinner";

const CheckoutForm = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { isAuthLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooking = async () => {
      if (!id) return;
      try {
        const res = await axiosSecure.get(`/bookings/approved/${id}`);
        setBooking(res.data);
        console.log("Approved Booking", res.data);
      } catch (err) {
        console.error("Error fetching booking by ID:", err);
        toast.error("Failed to load booking");
      }
    };

    console.log(setBooking);

    fetchBooking();
  }, [axiosSecure, id]);

  useEffect(() => {
    if (!booking) return;
    const fetchClientSecret = async () => {
      try {
        const res = await axiosSecure.post("/create-payment-intent", {
          amountInCents: booking.price * 100,
          bookingId: booking._id,
          userEmail: booking.userEmail,
        });
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.error("Error creating payment intent:", err);
        toast.error("Failed to initiate payment");
      }
    };

    fetchClientSecret();
  }, [booking, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;
    setLoading(true);

    const card = elements.getElement(CardElement);
    try {
      const { error: pmError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card,
        });

      console.log("Payment Method", paymentMethod);

      if (pmError) {
        toast.error(pmError.message);
        setLoading(false);
        return;
      }

      const { error: confirmError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,
        });

      console.log("Payment Intent", paymentIntent);

      if (confirmError) {
        toast.error(confirmError.message);
      } else if (paymentIntent.status === "succeeded") {
        await axiosSecure.post("/save-payment", {
          amount: booking.price,
          bookingId: booking._id,
          userEmail: booking.userEmail,
          paymentIntentId: paymentIntent.id,
          status: paymentIntent.status,
          paidAt: new Date(), 
        });

        toast.success("🎉 Payment successful!");
        navigate("/dashboard/confirmed-bookings");
      }
    } catch (err) {
      console.error("Payment failed:", err);
      toast.error("Something went wrong with payment");
    }

    setLoading(false);
  };

  if (isAuthLoading || !booking) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-xl rounded-2xl mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">
        Pay for: {booking.courtName}
      </h2>
      <p className="text-center mb-2 text-gray-600">
        Date: {new Date(booking.date).toLocaleDateString()}
      </p>
      <p className="text-center mb-6 text-gray-600">
        Slot(s): {booking.slots?.join(", ")} | Price: ${booking.price}
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <CardElement className="p-4 border rounded-md" />
        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? "Processing..." : `Pay $${booking.price}`}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
