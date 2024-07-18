import { useQuery } from 'react-query';
import axios from 'axios';
import http from '@utils/api/http';
import { API_ENDPOINTS } from '@utils/api/endpoints';

const fetchExamById = async (examId: string) => {
  const { data } = await http.get(`${API_ENDPOINTS.EXAMS}/${examId}`);
  return data;
};

export const useExamQuery = (examId: string) => {
  return useQuery(['exam', examId], () => fetchExamById(examId));
};
