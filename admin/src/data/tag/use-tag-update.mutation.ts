import { UpdateTag } from "@ts-types/generated";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import Tag from "@repositories/tag";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useTranslation } from "next-i18next";
import http from "@utils/api/http";
import { useRouter } from "next/router";

 

export const useUpdateTagMutation = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  
  return useMutation(
    ({ variables: { id, input } }: { variables: { id: string; input: string } }) => {
      console.log("ID:", id);
      console.log("Input:", input);
      return http.put(`${API_ENDPOINTS.TAGS}/${id}`, input);
    },
    {
      onSuccess: () => {
        
        toast.success(t("common:successfully-updated"));
        router.push('/tags')
      },
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.TAGS);
      },
    }
  );
};


