import { API_ENDPOINTS } from '@utils/api/endpoints';
import http from '@utils/api/http';
import { useQuery } from 'react-query';

const getStudyMaterialById = async (studyMaterialId) => {
    const { data } = await http.get(`${API_ENDPOINTS.STUDY_MATERIAL}/${studyMaterialId}`);
    return data;
};

export const useStudyMaterialQuery = (studyMaterialId) => {
    return useQuery(['batch', studyMaterialId], () => getStudyMaterialById(studyMaterialId));
};
