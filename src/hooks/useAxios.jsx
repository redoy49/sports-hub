import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://sports-hub-tau.vercel.app`
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;