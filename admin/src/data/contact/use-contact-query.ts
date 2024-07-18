
import Contact from "@repositories/contact";
import { useQuery } from "react-query";
import { Contacts as TContact } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";


export const fetchContact = async (id: string) => {
  const { data } = await Contact.find(`${API_ENDPOINTS.CONTACT}/${id}`);
  // console.log('contact query', data);

  return data;

};

export const useContactQuery = (id: string) => {
  return useQuery<TContact, Error>([API_ENDPOINTS.CONTACT, id], () =>
    fetchContact(id)
  );
};
