// useExamAttemptsQuery.ts
import { useQuery } from 'react-query';
import axios from 'axios';
import http from '@utils/api/http';
import { API_ENDPOINTS } from '@utils/api/endpoints';

// Fetch exam attempts by user ID
const fetchExamAttempts = async (attempt_id: string) => {
  const response = await http.get(`${API_ENDPOINTS.EXAM_ATTEMPT_ANSWERS}/${attempt_id}`);
  return response.data;
};

// useExamAttemptsQuery Hook
const useExamAttemptsAnswersQuery = (attempt_id: string) => {
  return useQuery(['examAttemptsAnswers', attempt_id], () => fetchExamAttempts(attempt_id));
};

export default useExamAttemptsAnswersQuery;
