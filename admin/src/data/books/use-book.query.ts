import { API_ENDPOINTS } from '@utils/api/endpoints';
import http from '@utils/api/http';
import { useQuery } from 'react-query';

const getBookById = async (bookId) => {
    const { data } = await http.get(`${API_ENDPOINTS.BOOK}/${bookId}`);
    return data;
};

export const useBookQuery = (bookId) => {
    return useQuery(['batch', bookId], () => getBookById(bookId));
};
