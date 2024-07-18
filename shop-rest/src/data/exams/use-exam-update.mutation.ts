import { useMutation } from 'react-query';
import axios from 'axios';
import http from '@utils/api/http';
import { API_ENDPOINTS } from '@utils/api/endpoints';

const updateExam = async ({ examId, updatedExam }) => {
    const { data } = await http.put(`${API_ENDPOINTS.EXAMS}/${examId}`, updatedExam);
    return data;
  };
  

export const useUpdateExamMutation = () => {
  return useMutation(updateExam);
};
