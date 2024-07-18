import { API_ENDPOINTS } from '@utils/api/endpoints';
import http from '@utils/api/http';
import { useQuery } from 'react-query';

const getBatches = async () => {
    const { data } = await http.get(API_ENDPOINTS.BATCH);
    return data;
};

export const useBatchesQuery = () => {
    return useQuery('batches', getBatches);
};
