import { API_ENDPOINTS } from '@utils/api/endpoints';
import http from '@utils/api/http';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const createBatch = async (batchData) => {
  const { data } = await http.post(API_ENDPOINTS.BATCH, batchData);
  return data;
};

export const useCreateBatchMutation = () => {
  const router = useRouter();

  return useMutation(createBatch, {
    onSuccess: (data) => {
      toast.success('Batch created successfully!');
      console.log('Data received after successful mutation:', data);
      
      // Redirect to /batch upon successful mutation
      router.push('/batch');
    },
    onError: (error) => {
      toast.error('Error creating batch. Please try again.');
      console.error('Error during batch creation:', error);
    }
  });
};
