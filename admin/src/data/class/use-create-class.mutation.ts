import { API_ENDPOINTS } from '@utils/api/endpoints';
import http from '@utils/api/http';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify'; // Assuming you're using react-toastify for notifications
import { useRouter } from 'next/router';

const createClass = async (classData) => {
  const { data } = await http.post(API_ENDPOINTS.CLASS, classData);
  return data;
};


export const useCreateClassMutation = () => {
  const router = useRouter();

  return useMutation(createClass, {
    onSuccess: (data) => {
      toast.success('Class created successfully!'); 
      // console.log('Data received after successful mutation:', data);
      
      // Redirect to /class upon successful mutation
      router.push('/class');
    },
    onError: (error) => {
      toast.error('Error creating class. Please try again.');
      // console.error('Error during class creation:', error);
    }
  });
};

