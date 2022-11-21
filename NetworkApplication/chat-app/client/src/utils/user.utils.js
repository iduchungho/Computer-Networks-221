import axios from "axios";
import serverURL from "../config/config";

export const getMe = async () => {
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
export const getFriendList = async () => {
    // {{tsHost}}/api/users/getFriends
    try {
        const {data} = await axios.get(`${serverURL}/api/users/getFriends`,{
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

export const search = async (friendName) => {
    // {{tsHost}}/api/users/searchFriends?friendName=el
    try {
        const {data} = await axios.get(`${serverURL}/api/users/searchFriends?friendName=${friendName}`, {
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