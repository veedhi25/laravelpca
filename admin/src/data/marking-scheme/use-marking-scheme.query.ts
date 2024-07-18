import { useQuery } from 'react-query';
import http from '@utils/api/http';
import { API_ENDPOINTS } from '@utils/api/endpoints';

export const useMarkingSchemesQuery = () => {
  return useQuery('markingSchemes', () => http.get(API_ENDPOINTS.MARKING_SCHEMES));
};


export const useMarkingSchemeQuery = (id) => {
    return useQuery(['markingScheme', id], () => http.get(`${API_ENDPOINTS.MARKING_SCHEMES}/${id}`));
  };
