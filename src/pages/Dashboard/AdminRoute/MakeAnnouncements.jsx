import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAnnouncements from "../../../hooks/useAnnouncements";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { MdOutlineAnnouncement } from "react-icons/md";
import Swal from "sweetalert2";

const MakeAnnouncements = () => {
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: announcements = [], isLoading } = useAnnouncements();

  const addMutation = useMutation({
    mutationFn: async () => {
      return axiosSecure.post("/announcements", { text });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["announcements"]);
      setText("");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.delete(`/announcements/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["announcements"]);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, newText }) => {
      return axiosSecure.patch(`/announcements/${id}`, { text: newText });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["announcements"]);
      setEditId(null);
      setText("");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      updateMutation.mutate({ id: editId, newText: text });
    } else {
      addMutation.mutate();
    }
  };

  const handleEdit = (announcement) => {
    setEditId(announcement._id);
    setText(announcement.text);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This announcement will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
        Swal.fire("Deleted!", "The announcement has been deleted.", "success");
      }
    });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-4">
      <h2 className="flex items-center gap-1 text-xl font-bold mb-4">
        <MdOutlineAnnouncement className="text-blue-600" />
        Manage Announcements
      </h2>

      <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Write announcement"
          className="input input-bordered w-full"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          className="btn bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
        >
          {editId ? "Update" : "Add"}
        </button>
        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setText("");
            }}
            className="btn bg-white/80 hover:bg-white backdrop-blur-sm text-sm transition-all duration-300 border border-gray-300/50 shadow-sm hover:shadow-md"
          >
            Cancel
          </button>
        )}
      </form>

      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-200">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Announcement</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((a, index) => (
              <tr key={a._id}>
                <td>{index + 1}</td>
                <td>{a.text}</td>
                <td className="text-right space-x-2">
                  <button
                    className="btn btn-xs md:btn-sm text-white bg-blue-400 hover:bg-blue-500"
                    onClick={() => handleEdit(a)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-xs md:btn-sm text-slate-100 bg-red-400 hover:bg-red-500"
                    onClick={() => handleDelete(a._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {announcements.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  No announcements yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MakeAnnouncements;
