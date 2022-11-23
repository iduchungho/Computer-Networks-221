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

export const addFriend = async (friendId) => {
    //{{tsHost}}/api/users/requestFriend/637b70829c25da06857c8aaf
    try {
        const {data} = await axios.post(`${serverURL}/api/users/requestFriend/${friendId}`, {}, {
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
export const getPendingRequests = async () => {
    //{{tsHost}}/api/users/pendingRequests
    try {
        const {data} = await axios.get(`${serverURL}/api/users/pendingRequests`, {
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
export const acceptFriendRequest = async (requestId) => {
    // {{tsHost}}/api/users/acceptFriend/6379aeb424393f064fdefa4c
    try {
        const {data} = await axios.post(`${serverURL}/api/users/acceptFriend/${requestId}`, {}, {
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`,
                'x-refresh' : `${localStorage.getItem("refreshToken")}`,
            }
        })
        console.log(data);
        return data;
    }
    catch (err) {
        alert(err.response.data);
    }
}
export const rejectFriendRequest = async (requestId) => {
    //{{tsHost}}/api/users/rejectFriend/6379adaa24393f064fdefa4b
    try {
        const {data} = await axios.post(`${serverURL}/api/users/rejectFriend/${requestId}`, {}, {
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`,
                'x-refresh' : `${localStorage.getItem("refreshToken")}`,
            }
        })
        console.log(data);
        return data;
    }
    catch (err) {
        alert(err.response.data);
    }
}
export const deleteFriend = async (friendId) => {
    //{{tsHost}}/api/users/deleteFriend/6379adaa24393f064fdefa4b
    try {
        const {data} = await axios.post(`${serverURL}/api/users/deleteFriend/${friendId}`, {}, {
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