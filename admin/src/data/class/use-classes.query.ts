import { API_ENDPOINTS } from '@utils/api/endpoints';
import http from '@utils/api/http';
import { useQuery } from 'react-query';

const getAllClasses = async () => {
  const { data } = await http.get(API_ENDPOINTS.CLASS);
  return data;
};

export const useClassesQuery = () => {
  return useQuery('classes', getAllClasses);
};
