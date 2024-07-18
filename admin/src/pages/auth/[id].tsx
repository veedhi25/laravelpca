import React, { useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { useVerifyMutation } from "@data/auth/use-verify.mutation";
import { useCodeMutation } from "@data/auth/use-code.mutation";
import Logo from "@components/ui/logo";
import Alert from "@components/ui/alert";
import Input from "@components/ui/input";
import { ROUTES } from "@utils/routes";
import Button from "@components/ui/button";
import { useUI } from "@contexts/ui.context";
import { useTranslation } from "next-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useModalAction } from "@components/ui/modal/modal.context";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { allowedRoles, hasAccess, setAuthCredentials } from "@utils/auth-utils";

type FormValues = {
  code: string;
  id:number
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    return {
      props: {
        ...(await serverSideTranslations(context.locale, ["common"])),
      },
    };
  };

  
const registerFormSchema = yup.object().shape({
  code: yup.string().required("Code is required")
});

const defaultValues = {
  code: "",
};


const RegisterForm = () => {
  const { t } = useTranslation("common");
  const { mutate, isLoading: loading } = useVerifyMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const { query } = useRouter();
  const {
    register,
    handleSubmit,
    setError,

    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(registerFormSchema),
  });
  const router = useRouter();
  const { authorize } = useUI();
  const { closeModal, openModal } = useModalAction();
  function handleNavigate(path: string) {
    router.push(`/${path}`);
    closeModal();
  }
  async function resendCode(){
    if(query.id){
      var data=await useCodeMutation(query.id as string);
      // console.log(data);
    }
  }



  function onSubmit({code}: FormValues) {
    mutate(
      {
        code,
        id:query.id
      },
      {
        onSuccess: (data:any) => {
          if(data.message=="incorrect"){
            setErrorMsg("Code is incorrect");
            return ;
          }else{
            setErrorMsg("");
          }
          if (data?.token) {
            if (hasAccess(allowedRoles, data?.permissions)) {
              setAuthCredentials(data?.token, data?.permissions);
              router.push(ROUTES.DASHBOARD);
              return;
            }
          }
        },
        onError: (error) => {
          const {
            response: { data },
          }: any = error ?? {};
          Object.keys(data).forEach((field: any) => {
            setError(field, {
              type: "manual",
              message: data[field][0],
            });
          });
        },
      }
    );
  }
  return (
    <div className="flex items-center justify-center h-screen bg-white sm:bg-gray-100">
        
        <div className="py-6 px-5 sm:p-8 bg-light w-screen md:max-w-md h-screen md:h-auto flex flex-col justify-center m-auto max-w-md sm:shadow p-5 rounded">
            <div className="flex justify-center">
                <Logo />
            </div>
            <p className="text-center text-sm md:text-base leading-relaxed px-2 sm:px-0 text-body mt-4 sm:mt-5 mb-7 sm:mb-10">
                {("Verify Phone Number")}
            </p>
            {errorMsg && (
                <Alert
                variant="error"
                message={t(errorMsg)}
                className="mb-6"
                closeable={true}
                onClose={() => setErrorMsg("")}
                />
            )}
            <form onSubmit={handleSubmit(onSubmit)} noValidate>

                <Input
                label={t("Code")}
                {...register("code")}
                type="code"
                variant="outline"
                className="mb-5"
                error={t(errors.code?.message!)}
                />
                <div className="mt-8">
                <Button className="w-full h-12" loading={loading} disabled={loading}>
                    Verify
                </Button>
                </div>
                {errorMessage ? (
                  <Alert
                    message={t(errorMessage)}
                    variant="error"
                    closeable={true}
                    className="mt-5"
                    onClose={() => setErrorMessage(null)}
                  />
                ) : null}
            </form>
            {/* End of forgot register form */}

            <div className="flex flex-col items-center justify-center relative text-sm text-heading mt-8 sm:mt-11 mb-6 sm:mb-8">
                <hr className="w-full" />
            </div>
            <div className="text-sm sm:text-base text-body text-center">
                {"didn't recieve the message"}{" "}
                <button
                className="ms-1 underline text-accent font-semibold transition-colors duration-200 focus:outline-none hover:text-accent-hover focus:text-accent-hover hover:no-underline focus:no-underline"
                onClick={resendCode}
                >
                resend 
                </button>
            </div>
        </div>
    </div>
  );
};

export default RegisterForm;
