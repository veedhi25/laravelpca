import { API_ENDPOINTS } from '@utils/api/endpoints';
import http from '@utils/api/http';
import { useQuery } from 'react-query';

const getBatchById = async (batchId) => {
    const { data } = await http.get(`${API_ENDPOINTS.BATCHES}/${batchId}`);
    return data;
};

export const useBatchQuery = (batchId) => {
    return useQuery(['batch', batchId], () => getBatchById(batchId));
};
