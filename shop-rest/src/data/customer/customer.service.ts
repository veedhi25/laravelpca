
import { CoreApi } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export type CustomerType = {
  id: string;
  [key: string]: unknown;
};

export type ContactType = {
  name: string;
  email: string;
  subject: string;
  description: string;
  current_location: string;
  gender:string;
	date_of_birth:Date;
  occupation:string;
};

class Customer extends CoreApi {
  constructor(_base_path: string) {
    super(_base_path);
  }

  updateCustomer(input: CustomerType) {
    console.log('profile',input)
    return this.http
      .put(this._base_path + "/" + input.id, input)
      .then((res) => res.data);
  }

  updateUser(id:any,input:any) {
    return this.http
      .put(`${API_ENDPOINTS.USERS}/${id}`, input)
      .then((res) => res.data);
  }

  contact(input: ContactType) {
    return this.http.post(API_ENDPOINTS.CONTACT, input).then((res) => res.data);
  }

  deleteAddress({ id }: { id: string }) {
    return this.http
      .delete(`${API_ENDPOINTS.ADDRESS}/${id}`)
      .then((res) => res.data);
  }
}

export const CustomerService = new Customer("users");
