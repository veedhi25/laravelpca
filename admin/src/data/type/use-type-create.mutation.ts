import { CreateTypeInput } from "@ts-types/generated";
import { ROUTES } from "@utils/routes";
import Type from "@repositories/type";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export interface ITypeCreateVariables {
  variables: {
    input: CreateTypeInput;
  };
}

export const useCreateTypeMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    query: { shop },
  } = useRouter();

  return useMutation(
    ({ variables: { input } }: ITypeCreateVariables) =>
      Type.create(API_ENDPOINTS.TYPES, input),
    {
      onSuccess: () => {
        router.push(`/${shop}/add-retailer-brand`);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.TYPES);
      },
    }
  );
};
