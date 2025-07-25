// components/MemberProfile.jsx
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import fallbackImage from "../../../assets/profileFallback.png";

const MemberProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: member = {}, isLoading } = useQuery({
    queryKey: ["member", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/email/${user.email}`);
      return res.data;
    },
  });
  console.log("Member", member);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl px-6 py-24">
      <div className="flex flex-col items-center">
        <img
          src={member.image || fallbackImage}
          alt="Member"
          className="w-24 h-24 rounded-full mb-4 ring-3 ring-blue-300"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallbackImage;
          }}
        />
        <h2 className="text-2xl font-semibold text-gray-800">{member.name}</h2>
        <p className="text-gray-600">{member.email}</p>
        <p className="mt-4 text-sm text-gray-500">
          Became member on:{" "}
          <strong>
            {new Date(member.membershipDate).toLocaleDateString()}
          </strong>
        </p>
      </div>
    </div>
  );
};

export default MemberProfile;
