import { useQuery } from 'react-query';
import axios from 'axios';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import http from '@utils/api/http';


const fetchAllExams = async () => {
  const { data } = await http.get(`${API_ENDPOINTS.EXAMS}`);
  return data;
};


export const useExamsQuery = () => {
  return useQuery('exams', fetchAllExams);
};
