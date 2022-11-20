import axios from "axios";
import serverURL from "../config/config";

const getMe = async () => {
    try {
        const {data} = await axios.get(`${serverURL}/api/users/me`,{
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`,
                'x-refresh' : `${localStorage.getItem("refreshToken")}`,
            }
        })
        return data;
    }
    catch (err) {
        alert(err.response.data);
    }
}

export default getMe;