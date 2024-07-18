import { API_ENDPOINTS } from '@utils/api/endpoints';
import http from '@utils/api/http';
import { useMutation } from 'react-query';

export const useCreateMarkingSchemeMutation = () => {
  return useMutation((newMarkingScheme) => http.post(API_ENDPOINTS.MARKING_SCHEMES, newMarkingScheme));
};

export const useUpdateMarkingSchemeMutation = () => { 
  return useMutation(({ id, updatedMarkingScheme }: { id: number, updatedMarkingScheme: any }) => {
    return http.put(`${API_ENDPOINTS.MARKING_SCHEMES}/${id}`, updatedMarkingScheme) }
  );
};

export const useDeleteMarkingSchemeMutation = () => {
  
  return useMutation((id) => http.put(`${API_ENDPOINTS.MARKING_SCHEMES}/${id}`));
};

