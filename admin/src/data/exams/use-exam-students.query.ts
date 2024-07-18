import { useQuery } from 'react-query';
import http from '@utils/api/http';
import { API_ENDPOINTS } from '@utils/api/endpoints';


const fetchUsersByExamId = async (examId: string) => {
  const { data } = await http.get(`${API_ENDPOINTS.EXAM_STUDENTS}?exam_id=${examId}`);
  return data;
};

const useExamStudentsQuery = (examId: string) => {
  return useQuery(['users', examId], () => fetchUsersByExamId(examId));
};

export default useExamStudentsQuery;
