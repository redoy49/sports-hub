import React from "react";
import useAuth from "../../../hooks/useAuth";

const MyProfile = () => {
  const { user } = useAuth(); // contains name, email, memberSince etc.

  const memberSince = user?.memberSince
    ? new Date(user.memberSince).toLocaleDateString()
    : "N/A";

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">My Profile</h2>
      <p><strong>Name:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Member Since:</strong> {memberSince}</p>
    </div>
  );
};

export default MyProfile;
