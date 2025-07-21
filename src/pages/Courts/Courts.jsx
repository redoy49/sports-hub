import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

const CourtsPage = () => {
  const [courts, setCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [slots, setSlots] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  // Fetch courts on mount
  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const res = await axiosInstance.get("/courts");
        setCourts(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load courts");
      }
    };

    fetchCourts();
  }, [axiosInstance]);

  // Open booking modal
  const handleBookNow = (court) => {
    if (!user) {
      navigate("/login");
      return;
    }
    setSelectedCourt(court);
    setSlots([]);
    document.getElementById("booking_modal").showModal();
  };

  // Submit booking
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const date = form.date.value;

    if (!slots.length) {
      toast.error("Please select at least one slot.");
      return;
    }

    try {
      await axiosInstance.post("/bookings", {
        userEmail: user?.email,
        courtId: selectedCourt._id,
        courtName: selectedCourt.name || selectedCourt.type,
        price: selectedCourt.price,
        slots,
        date,
      });

      form.reset();
      setSlots([]);
      document.getElementById("booking_modal").close();
      toast.success("Booking request sent.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit booking.");
    }
  };

  return (
    <section className="w-full bg-base-200">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between max-w-[1600px] mx-auto px-5 lg:px-8 xl:px-[8%] 2xl:px-[15.5%] py-10 lg:py-20">
        <div className="text-center lg:text-left flex-1 space-y-6 w-full">
          <h2 className="text-2xl font-bold mb-6">Available Courts</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {courts.map((court) => (
              <div key={court._id} className="card bg-base-100 shadow-md">
                <figure>
                  <img
                    src={court.image}
                    alt={court.type}
                    className="w-full h-52 object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="text-xl font-bold">{court.type}</h3>
                  <p>Price per session: ${court.price}</p>
                  <button
                    onClick={() => handleBookNow(court)}
                    className="btn btn-primary mt-4"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {selectedCourt && (
        <dialog id="booking_modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-2">
              Book {selectedCourt.type}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <input
                type="text"
                value={selectedCourt.type}
                readOnly
                className="input input-bordered w-full"
              />
              <input
                type="number"
                value={selectedCourt.price}
                readOnly
                className="input input-bordered w-full"
              />
              <input
                type="date"
                name="date"
                required
                className="input input-bordered w-full"
              />
              <select
                multiple
                value={slots}
                onChange={(e) =>
                  setSlots(
                    Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    )
                  )
                }
                className="select select-bordered w-full"
              >
                {selectedCourt.availableSlots?.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
              <button type="submit" className="btn btn-success w-full">
                Confirm Booking
              </button>
            </form>
            <div className="modal-action">
              <button
                onClick={() => document.getElementById("booking_modal").close()}
                className="btn"
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </section>
  );
};

export default CourtsPage;
