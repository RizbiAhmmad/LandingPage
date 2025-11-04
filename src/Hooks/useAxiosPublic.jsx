import Axios  from "axios";

const axiosPublic=Axios.create({
    baseURL: "https://node.modhuka.com",
   
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;