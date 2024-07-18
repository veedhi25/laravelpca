import Withdraw from "@repositories/withdraw";
import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useRouter } from "next/router";
import { ROUTES } from "@utils/routes";


export interface IDeliveryCreateVariables {
  variables: {
    input: any;
  };
}

export const useCreateDeliveryMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    (input : IDeliveryCreateVariables) =>
      Withdraw.create(API_ENDPOINTS.DELIVERY, input.inputs),
    {
      onSuccess: (response) => {
        localStorage.setItem('delivery',JSON.stringify(response.data));
        router.push(`/${router?.query?.shop}${ROUTES.DELIVERY}/payment`);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.DELIVERY);
      },
    }
  );
};
