import { useMutation } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import http from "@utils/api/http";

const updateUserOnlineStatus = async (user: any) => {

    console.log("me data", user);

    try {
        const response = await http.put(`${API_ENDPOINTS.USER_STATUS}/${user?.userId}`, { is_online: user?.isOnline });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

export const useUpdateUserOnlineStatus = () => {
    return useMutation(updateUserOnlineStatus);
};
