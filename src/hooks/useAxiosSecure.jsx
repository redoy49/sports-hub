import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
  const { user, isAuthLoading, logoutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthLoading) return;

    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        if (!user) return config;

        try {
          const token = await user.getIdToken(true); // ✅ force refresh token
          console.log("Token", token);
          config.headers.Authorization = `Bearer ${token}`;
        } catch (err) {
          console.error("Error getting token", err);
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      (error) => {
        const status = error?.response?.status;
        console.log("Axios error -->", status);

        if (status === 401 || status === 403) {
          logoutUser();
          navigate("/login");
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user, isAuthLoading, logoutUser, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;