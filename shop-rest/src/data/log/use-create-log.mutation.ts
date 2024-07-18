import { useMutation } from "react-query";
import { LogService } from "./log.service";

type LogCreateInputType = {
  [key: string]: unknown;
};

export const useCreateLogMutation = () => {
  return useMutation((input: LogCreateInputType) =>
  LogService.create(input)
  );
};
