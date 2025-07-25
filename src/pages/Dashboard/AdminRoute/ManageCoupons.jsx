import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { RiCoupon3Line } from "react-icons/ri";

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
    <div className="max-w-full mx-auto border border-gray-200 px-4 py-6 mt-16 lg:mt-2">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">
        📋 Manage Booking Approvals
      </h2>

      <h2 className="flex items-center gap-1 text-xl font-semibold mb-4">
        <RiCoupon3Line className="text-blue-500" />
        {editingCoupon ? "Update Coupon" : "Add New Coupon"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 mb-6">
        <input
          {...register("code", { required: true })}
          className="w-full bg-white border border-gray-300 text-gray-700 rounded-full shadow-xs leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-sm pl-6 pr-4 py-2"
          placeholder="Coupon Code"
        />
        <input
          {...register("discount", { required: true })}
          type="number"
          className="w-full bg-white border border-gray-300 text-gray-700 rounded-full shadow-xs leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-sm pl-6 pr-4 py-2"
          placeholder="Discount %"
        />
        <button className="btn bg-gradient-to-r  rounded-full from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75">
          {editingCoupon ? "Update Coupon" : "Add Coupon"}
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">All Coupons</h2>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border border-gray-200">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Code</th>
                <th>Discount (%)</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon, idx) => (
                <tr key={coupon._id}>
                  <td>{idx + 1}</td>
                  <td>{coupon.code}</td>
                  <td>{coupon.discount}%</td>
                  <td className="text-right space-x-2">
                    <button
                      className="btn btn-xs md:btn-sm text-white bg-blue-400 hover:bg-blue-500"
                      onClick={() => handleEdit(coupon)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-xs md:btn-sm text-white bg-red-400 hover:bg-red-500"
                      onClick={() => handleDelete(coupon._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {coupons.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No coupons found.
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
