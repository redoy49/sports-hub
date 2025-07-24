import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";

const ManageCoupons = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, setValue } = useForm();
  const [editingCoupon, setEditingCoupon] = useState(null);

  // Get all coupons
  const { data: coupons = [], isLoading } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/coupons");
      return res.data;
    },
  });

  // Add / Update Coupon
  const { mutate: saveCoupon } = useMutation({
    mutationFn: async (coupon) => {
      if (editingCoupon) {
        return await axiosSecure.patch(`/coupons/${editingCoupon._id}`, coupon);
      } else {
        return await axiosSecure.post("/coupons", coupon);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["coupons"]);
      Swal.fire(
        "Success",
        `Coupon ${editingCoupon ? "updated" : "added"} successfully`,
        "success"
      );
      reset();
      setEditingCoupon(null);
    },
  });

  // Delete Coupon
  const { mutate: deleteCoupon } = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/coupons/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["coupons"]);
      Swal.fire("Deleted", "Coupon deleted successfully", "success");
    },
  });

  const onSubmit = (data) => {
    const coupon = {
      code: data.code.trim().toUpperCase(),
      discount: parseInt(data.discount),
    };
    saveCoupon(coupon);
  };

  const handleEdit = (coupon) => {
    setEditingCoupon(coupon);
    setValue("code", coupon.code);
    setValue("discount", coupon.discount);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete this coupon?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    }).then((result) => {
      if (result.isConfirmed) deleteCoupon(id);
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        {editingCoupon ? "Update Coupon" : "Add New Coupon"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 mb-6">
        <input
          {...register("code", { required: true })}
          className="input input-bordered w-full"
          placeholder="Coupon Code"
        />
        <input
          {...register("discount", { required: true })}
          className="input input-bordered w-full"
          type="number"
          placeholder="Discount %"
        />
        <button className="btn btn-primary">
          {editingCoupon ? "Update" : "Add"}
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">All Coupons</h2>
      {isLoading ? (
        <LoadingSpinner/>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead>
              <tr>
                <th>#</th>
                <th>Code</th>
                <th>Discount (%)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon, idx) => (
                <tr key={coupon._id}>
                  <td>{idx + 1}</td>
                  <td>{coupon.code}</td>
                  <td>{coupon.discount}%</td>
                  <td>
                    <button
                      className="btn btn-xs btn-warning mr-2"
                      onClick={() => handleEdit(coupon)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleDelete(coupon._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {coupons.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-gray-500">
                    No coupons found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageCoupons;
