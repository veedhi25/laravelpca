import { API_ENDPOINTS } from '@utils/api/endpoints';
import http from '@utils/api/http';
import { useQuery } from 'react-query';

const getExamsByCourse = async (courseId: string) => {
  const {data} =  await http.get(`${API_ENDPOINTS.EXAMS}/${courseId}`);
  
  return data;
};

export const useCourseExamQuery = (courseId: string) => {
  return useQuery(['courseExams', courseId], () => getExamsByCourse(courseId));
};
