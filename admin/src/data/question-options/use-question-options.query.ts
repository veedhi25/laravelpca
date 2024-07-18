import { API_ENDPOINTS } from '@utils/api/endpoints';
import http from '@utils/api/http';
import { useQuery } from 'react-query';

  
  export const useQuestionOptionsQuery = () => {
    return useQuery('questionOptions', () => http.get(API_ENDPOINTS.QUESTION_OPTIONS));
  };
  
  
  export const useQuestionTypeQuery = (id:number) => {
      return useQuery(['questionOptions', id], () => http.get(`${API_ENDPOINTS.QUESTION_OPTIONS}/${id}`));
    };
    