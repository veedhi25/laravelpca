
import Quiz from "@repositories/quiz";
import { useQuery } from "react-query";
import { Contacts as TContact } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";


export const fetchQuiz = async (id: string) => {
  const { data } = await Quiz.find(`${API_ENDPOINTS. QUIZ}/${id}`);
  // console.log('contact query', data);

  return data;

};

export const useQuizQuery = (id: string) => {
  return useQuery<TContact, Error>([API_ENDPOINTS.QUIZ, id], () =>
    fetchQuiz(id)
  );
};
