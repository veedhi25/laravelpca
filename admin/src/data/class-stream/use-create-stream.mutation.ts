import { API_ENDPOINTS } from "@utils/api/endpoints";
import http from "@utils/api/http";
import { useMutation } from "react-query";

const createStream = async (streamData) => {
    const { data } = await http.post(API_ENDPOINTS.CLASS_STREAMS, streamData);
    return data;
  };
  
  export const useCreateStreamMutation = () => {
    return useMutation(createStream);
  };
  