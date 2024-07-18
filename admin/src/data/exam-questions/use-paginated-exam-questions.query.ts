import { useQuery } from 'react-query';
import axios from 'axios';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import http from '@utils/api/http';

const fetchAllExamsQuestions = async (page = 1) => {
    const { data } = await http.get(`${API_ENDPOINTS.PAGINATED_EXAM_QUESTIONS}?page=${page}`);
    return data;
  };
  
  export const usePaginatedExamQuestionsQuery = (page) => {
    return useQuery(['paginated_exam_questions', page], () => fetchAllExamsQuestions(page));
  };
  