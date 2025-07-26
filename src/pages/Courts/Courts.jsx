import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CourtsPage = () => {
  const [courts, setCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [slots, setSlots] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const courtsPerPage = 6; 

  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosInstance = useAxiosSecure();

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

  const handleBookNow = (court) => {
    if (!user) {
      navigate("/login");
      return;
    }

    setSelectedCourt(court);
    setSlots([]);
    document.getElementById("booking_modal").showModal();
  };

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
        price: selectedCourt.price * slots.length,
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

  const indexOfLastCourt = currentPage * courtsPerPage;
  const indexOfFirstCourt = indexOfLastCourt - courtsPerPage;
  const currentCourts = courts.slice(indexOfFirstCourt, indexOfLastCourt);
  const totalPages = Math.ceil(courts.length / courtsPerPage);

  return (
    <section className="w-full bg-base-200 pt-20">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between max-w-[1600px] mx-auto px-5 lg:px-8 xl:px-[8%] py-10 lg:py-20">
        <div className="text-center lg:text-left flex-1 space-y-6 w-full">
          <h2 className="text-2xl font-bold mb-6 text-center pb-6">Available Courts</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentCourts.map((court) => (
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

          {courts.length > courtsPerPage && (
            <div className="flex justify-center gap-2 mt-10 flex-wrap">
              <button
                className="btn btn-sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                « Prev
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={`btn btn-sm ${currentPage === i + 1 ? "btn-primary" : "btn-outline"}`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="btn btn-sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next »
              </button>
            </div>
          )}
        </div>
      </div>

      {selectedCourt && (
        <dialog id="booking_modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">
              Booking: {selectedCourt.type}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
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
              <div>
                <label className="label">
                  <span className="label-text">Select Session Slot(s)</span>
                </label>
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
                  className="select select-bordered w-full h-32"
                  required
                >
                  {selectedCourt.availableSlots?.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              <p className="text-right font-medium">
                Total Price: ${selectedCourt.price * slots.length}
              </p>

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
