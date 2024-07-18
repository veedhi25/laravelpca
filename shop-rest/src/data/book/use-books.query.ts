import { API_ENDPOINTS } from '@utils/api/endpoints';
import http from '@utils/api/http';
import { useQuery } from 'react-query';

const getBooks = async () => {
    const { data } = await http.get(API_ENDPOINTS.BOOK);
    return data;
};

export const useBooksQuery = () => {
    return useQuery('batches', getBooks);
};
