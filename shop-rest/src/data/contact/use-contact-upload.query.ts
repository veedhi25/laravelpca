
import { CoreApi } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useMutation } from "react-query";

const ContactUpload = new CoreApi(API_ENDPOINTS.CONTACT);


export const useContactUploadMutation = () => {

  return useMutation((input: any) => {
      
      let formData = new FormData();
      formData.append('name',input.name)
      formData.append('email',input.email)
      formData.append('subject',input.subject)
      formData.append('description',input.description)
  
      return ContactUpload.create(formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
    });
}
