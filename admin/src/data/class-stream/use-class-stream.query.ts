import { API_ENDPOINTS } from '@utils/api/endpoints';
import http from '@utils/api/http';
import { useQuery } from 'react-query';



const getStreamById = async (streamId) => {
    const { data } = await http.get(`${API_ENDPOINTS.CLASS_STREAMS}/${streamId}`);
    return data;
  };
  
  export const useClassStreamQuery = (streamId) => {
    return useQuery(['classStream', streamId], () => getStreamById(streamId));
  };
  