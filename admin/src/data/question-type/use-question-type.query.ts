import { API_ENDPOINTS } from '@utils/api/endpoints';
import http from '@utils/api/http';
import { useQuery } from 'react-query';

  
  export const useQuestionTypesQuery = () => {
    return useQuery('questionType', () => http.get(API_ENDPOINTS.QUESTION_TYPE));
  };
  
  
  export const useQuestionTypeQuery = (id:number) => {
      return useQuery(['questionTypes', id], () => http.get(`${API_ENDPOINTS.QUESTION_TYPE}/${id}`));
    };
    