import { API_ENDPOINTS } from '@utils/api/endpoints';
import http from '@utils/api/http';
import { useQuery } from 'react-query';

   
  export const useExamSectionsQuery = () => {
    return useQuery('ExamSections', () => http.get(API_ENDPOINTS.EXAM_SECTION));
  };
  
  
  export const useExamSectionQuery = (id:number) => {
      return useQuery(['ExamSection', id], () => http.get(`${API_ENDPOINTS.EXAM_SECTION}/${id}`));
    };
    