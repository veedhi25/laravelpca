import { API_ENDPOINTS } from '@utils/api/endpoints';
import http from '@utils/api/http';
import { useQuery } from 'react-query';


const getUserExamAttempts = async (user_id, exam_id, isMock) => {
  if (!user_id || !exam_id) {
      // Return a fallback or empty value when one of the IDs is missing
      return [];
  }
  
  const url = isMock !== undefined 
      ? `${'user-exam-attempts'}/${user_id}/${exam_id}?is_mock=${isMock}` 
      : `${'user-exam-attempts'}/${user_id}/${exam_id}`;

  const { data } = await http.get(url);
  return data;
};

export const useUserExamAttemptsQuery = (user_id, exam_id, isMock) => {
  const isQueryEnabled = Boolean(user_id && exam_id);

  return useQuery(
      ['userExamsAttempts', user_id, exam_id, isMock],
      () => getUserExamAttempts(user_id, exam_id, isMock),
      {
          enabled: isQueryEnabled
      }
  );
};

  
