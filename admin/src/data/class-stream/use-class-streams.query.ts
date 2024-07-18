import { API_ENDPOINTS } from '@utils/api/endpoints';
import http from '@utils/api/http';
import { useQuery } from 'react-query';

const getAllStreamsByClassId = async () => {
    const { data } = await http.get(`${API_ENDPOINTS.CLASS_STREAMS}`);
    return data;
  };
  
  export const useClassStreamsQuery = () => {
    return useQuery(['classStreams'], () => getAllStreamsByClassId());
  };
  