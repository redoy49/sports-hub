import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";

const ManageCourts = () => {
  const axiosInstance = useAxiosSecure();
  const queryClient = useQueryClient();

  const [showModal, setShowModal] = useState(false);
  const [editCourt, setEditCourt] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    price: "",
    image: "",
  });

  const {
    data: courts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["courts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/courts");
      return res.data;
    },
  });

  const openAddModal = () => {
    setEditCourt(null);
    setFormData({
      name: "",
      type: "",
      price: "",
      image: "",
    });
    setShowModal(true);
  };

  const openEditModal = (court) => {
    setEditCourt(court);
    setFormData({
      name: court.name,
      type: court.type,
      price: court.price,
      image: court.image,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/courts/${id}`);
        toast.success("Court deleted");
        queryClient.invalidateQueries(["courts"]);
      } catch (err) {
        console.error(err);
        toast.error("Delete failed");
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      type: formData.type,
      price: parseFloat(formData.price),
      image: formData.image,
    };

    try {
      if (editCourt) {
        await axiosInstance.patch(`/courts/${editCourt._id}`, payload);
        toast.success("Court updated");
      } else {
        await axiosInstance.post("/courts", payload);
        toast.success("New court added");
      }

      queryClient.invalidateQueries(["courts"]);
      setShowModal(false);
    } catch (err) {
      console.error(err);
      toast.error("Action failed");
    }
  };

  return (
    <div className="max-w-full mx-auto border border-gray-200 px-4 py-6 mt-16 lg:mt-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">
          📋 Manage Courts
        </h2>

        <button
          onClick={openAddModal}
          className="btn btn-success btn-sm flex items-center gap-2"
        >
          <FaPlus /> Add Court
        </button>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : isError ? (
        <p className="text-red-500">Failed to load courts</p>
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
                    <img
                      src={court.image}
                      alt={court.name}
                      className="w-20 h-12 object-cover"
                    />
                  </td>
                  <td>{court.name}</td>
                  <td>{court.type}</td>
                  <td>${court.price}</td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => openEditModal(court)}
                      className="btn btn-sm btn-info"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(court._id)}
                      className="btn btn-sm btn-error"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg relative">
            <h3 className="text-lg font-semibold mb-4">
              {editCourt ? "Update Court" : "Add New Court"}
            </h3>
            <form onSubmit={handleFormSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                required
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="input input-bordered w-full"
              />
              <input
                type="text"
                placeholder="Type"
                value={formData.type}
                required
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="input input-bordered w-full"
              />
              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                required
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="input input-bordered w-full"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={formData.image}
                required
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className="input input-bordered w-full"
              />

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn btn-sm bg-gray-300"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-sm btn-primary">
                  {editCourt ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCourts;
