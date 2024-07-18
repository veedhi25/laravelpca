
import {
  QueryParamsType,
  ContactsQueryOptionsType,
} from "@ts-types/custom.types";

import { mapPaginatorData } from "@utils/data-mappers";
import { useQuery } from "react-query";
import Contact from "@repositories/contact";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { ContactPaginator } from "@ts-types/generated";


const fetchContacts = async ({
  queryKey,
}: QueryParamsType): Promise<{ contacts: ContactPaginator }> => {

  const [_key, params] = queryKey;

  const {
    page,
    limit = 25,
    orderBy = "updated_at",
    sortedBy = "DESC",
  } = params as ContactsQueryOptionsType;


  const url = `${API_ENDPOINTS.CONTACT}?&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;

  
  const {
    data: { data, ...rest },
  } = await Contact.all(url);
  return {
    contacts: {
      data,
      paginatorInfo: mapPaginatorData({ ...rest }),
    },
  };
};

const useContactsQuery = (
  params: ContactsQueryOptionsType,
  options: any = {}
) => {
  return useQuery<{ contacts: ContactPaginator }, Error>(
    [API_ENDPOINTS.CONTACT, params],
    fetchContacts,
    { ...options, keepPreviousData: true }
  );

  
};

export { useContactsQuery, fetchContacts };
