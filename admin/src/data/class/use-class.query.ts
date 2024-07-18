import { API_ENDPOINTS } from '@utils/api/endpoints';
import http from '@utils/api/http';
import { useQuery } from 'react-query';

const getClassById = async (classId) => {
    const { data } = await http.get(`${API_ENDPOINTS.CLASS}/${classId}`);
    return data;
  };
  
  export const useClassQuery = (classId) => {
    return useQuery(['class', classId], () => getClassById(classId));
  };
  