import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import http from '@utils/api/http';

const createBook = async (bookData) => {
  const { data } = await http.post(API_ENDPOINTS.BOOK, bookData);
  return data;
};

export const useCreateBookMutation = () => {
  const router = useRouter();

  return useMutation(createBook, {
    onSuccess: () => {
      toast.success('Book added successfully!');
      router.push('/book'); // Adjust to your book listing page if different
    },
    onError: (error) => {
      toast.error('Error adding book. Please try again.');
      console.error('Error:', error);
    },
  });
};
