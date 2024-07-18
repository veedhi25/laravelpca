import { useQuery } from 'react-query';
import axios from 'axios';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import http from '@utils/api/http';


const fetchAllExamsQuestions = async (params = {}) => {
  const { data } = await http.get(`${API_ENDPOINTS.EXAM_QUESTIONS}`, { params });
  return data;
};

export const useExamsQuestionsQuery = (params) => {
  return useQuery(['exam_questions', params], () => fetchAllExamsQuestions(params));
};
