import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import http from '@utils/api/http';

const createStudyMaterial = async (studyMaterial) => {
  const { data } = await http.post(API_ENDPOINTS.STUDY_MATERIAL, studyMaterial);
  return data;
};

export const useCreateStudyMaterialMutation = () => {
  const router = useRouter();

  return useMutation(createStudyMaterial, {
    onSuccess: () => {
      toast.success('Study material added successfully!');
      router.push('/study-material'); // Adjust to your book listing page if different
    },
    onError: (error) => {
      toast.error('Error adding Study material. Please try again.');
      console.error('Error:', error);
    },
  });
};
