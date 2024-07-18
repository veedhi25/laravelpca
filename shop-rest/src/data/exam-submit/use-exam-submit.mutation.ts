import { useMutation } from 'react-query';
import http from '@utils/api/http';
import { API_ENDPOINTS } from '@utils/api/endpoints';

const startExamAttempt = async (examData) => {
  const payload = {
    examData: examData
  };
  const { data } = await http.post(API_ENDPOINTS.EXAM_ATTEMPTS, payload);
  return data;
};



const endExamAttempt = async ({ examData, attemptId }: { examData: any; attemptId: number; }) => {
  const { data } = await http.put(`${API_ENDPOINTS.EXAM_ATTEMPTS}/${attemptId}/end`, examData);
  return data;
};

export const useStartExamMutation = (onSuccess) => {
  return useMutation(startExamAttempt, {
    onSuccess: (data) => {
      onSuccess(data);
    },
    onError: (error) => {
      console.error('Mutation failed', error);
    },
  });
};



export const useEndExamMutation = () => {
  return useMutation(endExamAttempt);
};
