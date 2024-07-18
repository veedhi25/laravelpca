import { API_ENDPOINTS } from '@utils/api/endpoints';
import http from '@utils/api/http';
import { useMutation } from 'react-query';
 

export const useUpdatePasswordMutation = () => {
    return useMutation(({ old_password, new_password, new_password_confirmation }) => {
        console.log('Updating password with data:', { old_password, new_password, new_password_confirmation });
        return http.put(API_ENDPOINTS.UPDATE_PASSWORD, { old_password, new_password, new_password_confirmation });
    });
};
