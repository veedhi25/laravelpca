import { ApproveWithdrawInput } from "@ts-types/generated";
import Withdraw from "@repositories/withdraw";
import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/router";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { toast } from "react-toastify";
import { useTranslation } from "next-i18next";
export interface IWithdrawApproveVariables {
  variables: {
    input: ApproveWithdrawInput;
  };
}

export const useApproveWithdrawMutation = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation(
    ({ variables: { input } }: IWithdrawApproveVariables) =>
      Withdraw.approve(API_ENDPOINTS.APPROVE_BILL, input),
    {
      onSuccess: () => {
        toast.success(t("common:successfully-updated"));
        router.push(`/invoices-reward-data`);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.WITHDRAWS);
      },
    }
  );
};
