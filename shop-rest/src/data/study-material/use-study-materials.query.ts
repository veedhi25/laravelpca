import { API_ENDPOINTS } from '@utils/api/endpoints';
import http from '@utils/api/http';
import { useQuery } from 'react-query';

const getStudyMaterial = async () => {
    const { data } = await http.get(API_ENDPOINTS.STUDY_MATERIAL);
    return data;
};

export const useAllStudyMaterialQuery = () => {
    return useQuery('batches', getStudyMaterial);
};
