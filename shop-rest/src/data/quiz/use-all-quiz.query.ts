
import {
  QueryParamsType,
  ContactsQueryOptionsType,
} from "@ts-types/custom.types";

import { mapPaginatorData } from "@utils/data-mappers";
import { useQuery } from "react-query";
import Contact from "@repositories/contact";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { ContactPaginator } from "@ts-types/generated";
import quiz from "@components/repositories/quiz";


const fetchQuiz = async ({
  queryKey,
}: QueryParamsType): Promise<{quiz: ContactPaginator }> => {

  const [_key, params] = queryKey;

  const {
    page,
    limit = 25,
    orderBy = "updated_at",
    sortedBy = "DESC",
  } = params as ContactsQueryOptionsType;


  const url = `${API_ENDPOINTS.QUIZ}?&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;

  
  const {
    data: { data, ...rest },
  } = await quiz.all(url);
  return {
   quiz: {
      data,
      paginatorInfo: mapPaginatorData({ ...rest }),
    },
  };
};

const useAllQuizQuery = (
  params: ContactsQueryOptionsType,
  options: any = {}
) => {
  return useQuery<{quiz: ContactPaginator }, Error>(
    [API_ENDPOINTS.QUIZ, params],
    fetchQuiz,
    { ...options, keepPreviousData: true }
  );

  
};

export { useAllQuizQuery, fetchQuiz };
