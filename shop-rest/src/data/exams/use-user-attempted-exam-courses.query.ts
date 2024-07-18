import { API_ENDPOINTS } from '@utils/api/endpoints';
import http from '@utils/api/http';
import { useQuery } from 'react-query';

const getUserAttemptedCourses = async (user_id) => {
    const { data } = await http.get(`${API_ENDPOINTS.USER_ATTEMPTED_COURSES}/${user_id}`);
    return data;
};

export const useUserAttemptedCoursesQuery = (user_id) => {
    return useQuery(['coursesAttempts', user_id], () => getUserAttemptedCourses(user_id));
};
