import { useMutation } from 'react-query';
import http from '@utils/api/http';
import { API_ENDPOINTS } from '@utils/api/endpoints';


const updateExamQuestion = async ({ examQuestionId, updatedExamQuestion }: any) => {
  try {
    const { data } = await http.put(`${API_ENDPOINTS.EXAM_QUESTIONS}/${examQuestionId}`, updatedExamQuestion);
    return data;
  } catch (error) {
    throw new Error('Failed to update exam question');
  }
};

export const useUpdateExamQuestionMutation = () => {
  return useMutation(updateExamQuestion, {
    onSuccess: (data) => {
      console.log('Exam question updated successfully:', data);
      // Logic to handle success
    },
    onError: (error) => {
      console.error('Error updating exam question:', error);
      // Logic to handle errors
    },
    onSettled: (data, error) => {
      // This callback will run regardless of success or error
      if (error) {
        console.error('Mutation completed with error:', error);
        // Handle any post-mutation error logic here
      } else {
        console.log('Mutation completed without errors.');
        // Handle post-mutation logic here if necessary
      }
    },
  });
};