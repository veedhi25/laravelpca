import { CreateInvoiceRewardInput } from "@ts-types/generated";
import { ROUTES } from "@utils/routes";
import Withdraw from "@repositories/withdraw";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { toast } from "react-toastify";
import { animatedScrollTo } from "react-select/src/utils";

export interface InvoiceRewardCreateVariables {
  variables: {
    input: CreateInvoiceRewardInput;
  };
}

export const useCreateInvoiceRewardMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ variables:  input  }: InvoiceRewardCreateVariables) =>
      Withdraw.create(API_ENDPOINTS.BILL_REWARD, input),
    {
      onSuccess: () => {
        toast.success("Record updated successfully ");
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.BILL_REWARD);
      },
    }
  );
};
