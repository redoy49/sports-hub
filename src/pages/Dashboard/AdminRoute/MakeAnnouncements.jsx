import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAnnouncements from "../../../hooks/useAnnouncements";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";

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
    if (confirm("Are you sure you want to delete this announcement?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Announcements</h2>

      <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Write announcement"
          className="input input-bordered w-full"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          {editId ? "Update" : "Add"}
        </button>
        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setText("");
            }}
            className="btn btn-outline"
          >
            Cancel
          </button>
        )}
      </form>

      <ul className="space-y-2">
        {announcements.map((a) => (
          <li key={a._id} className="p-4 bg-base-200 rounded shadow">
            <div className="flex justify-between items-center">
              <span>{a.text}</span>
              <div className="space-x-2">
                <button
                  className="btn btn-sm btn-info"
                  onClick={() => handleEdit(a)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-error"
                  onClick={() => handleDelete(a._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MakeAnnouncements;
