// useExamAttemptsQuery.ts
import { useQuery } from 'react-query';
import axios from 'axios';
import http from '@utils/api/http';
import { API_ENDPOINTS } from '@utils/api/endpoints';

// Fetch exam attempts by user ID
const fetchExamAttempts = async (userId: string) => {
  const response = await http.get(`${API_ENDPOINTS.EXAM_ATTEMPT_ANSWERS}/${userId}`);
  return response.data;
};

// useExamAttemptsQuery Hook
const useExamAttemptsAnswersQuery = (userId: string) => {
  return useQuery(['examAttemptsAnswers', userId], () => fetchExamAttempts(userId));
};

export default useExamAttemptsAnswersQuery;
