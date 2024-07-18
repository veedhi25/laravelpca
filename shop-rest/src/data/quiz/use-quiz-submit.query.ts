
import { CoreApi } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useMutation } from "react-query";

const QuizSubmit = new CoreApi(API_ENDPOINTS.QUIZ);


export const useQuizSubmitMutation = () => {

  return useMutation((input: any) => {
      
      let formData = new FormData();
      formData.append('campaign',input.campaign)
      formData.append('right_answers',input.right_answers)
      formData.append('phone_number',input.phone_number)
      formData.append('q1',input.q1),
      formData.append('q2',input.q2),
      formData.append('q3',input.q3),
      formData.append('q4',input.q4),
      formData.append('q5',input.q5)
  
      return QuizSubmit.create(formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
    });
}
