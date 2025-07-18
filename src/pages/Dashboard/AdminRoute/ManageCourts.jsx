import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import useAxios from "../../../hooks/useAxios";

const ManageCourts = () => {
  const axiosInstance = useAxios();

  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourts = async () => {
    try {
      const res = await axiosInstance.get("/courts");
      setCourts(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load courts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await axiosInstance.delete(`/courts/${id}`);
        toast.success("Court deleted");
        setCourts((prev) => prev.filter((court) => court._id !== id));
      } catch (err) {
        console.error(err);
        toast.error("Delete failed");
      }
    }
  };

  const handleAddCourt = async () => {
    const newCourt = {
      name: "New Court",
      type: "Tennis",
      price: 100,
      image: "https://via.placeholder.com/150",
    };
    try {
      const res = await axiosInstance.post("/courts", newCourt);
      setCourts((prev) => [...prev, res.data]);
      toast.success("New court added");
    } catch (err) {
      console.error(err);
      toast.error("Add court failed");
    }
    console.log("New Court", newCourt);
  };

  const handleUpdate = async (id) => {
    const name = prompt("Enter new court name");
    const price = Number(prompt("Enter new price"));
    
    if (!name || isNaN(price)) {
      toast.error("Invalid input for update");
      return;
    }

    const updatedCourt = { name, price };

    try {
      await axiosInstance.patch(`/courts/${id}`, updatedCourt);
      fetchCourts();
      toast.success("Court updated");
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Manage Courts</h2>
        <button onClick={handleAddCourt} className="btn btn-success btn-sm flex items-center gap-2">
          <FaPlus /> Add Court
        </button>
      </div>

      {loading ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Type</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courts.map((court) => (
                <tr key={court._id}>
                  <td>
                    <img src={court.image} alt={court.name} className="w-20 h-12 object-cover" />
                  </td>
                  <td>{court.name}</td>
                  <td>{court.type}</td>
                  <td>${court.price}</td>
                  <td className="flex gap-2">
                    <button onClick={() => handleUpdate(court._id)} className="btn btn-sm btn-info">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(court._id)} className="btn btn-sm btn-error">
                      <FaTrash />
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

export default ManageCourts;

