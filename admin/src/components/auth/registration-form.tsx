import Alert from "@components/ui/alert";
import Button from "@components/ui/button";
import Input from "@components/ui/input";
import PasswordInput from "@components/ui/password-input";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "@components/ui/link";
import { allowedRoles, hasAccess, setAuthCredentials } from "@utils/auth-utils";
import { Permission } from "@ts-types/generated";
import { useRegisterMutation } from "@data/user/use-register.mutation";
import LicenseFrom from './license-form'

type FormValues = {
  name: string;
  email: string;
  password: string;
  permission: Permission;
  phone_number:number;

};
const registrationFormSchema = yup.object().shape({
  name: yup.string().required("form: Name required"),
  email: yup
    .string()
    .email("form:error-email-format")
    .required("form: Email required"),
  password: yup.string().required("form: Password required"),
  permission: yup.string().default("store_owner").oneOf(["store_owner"]),
});
const RegistrationForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate: registerUser, isLoading: loading } = useRegisterMutation();
  const [isRegistered , setIsRegistered]=useState<Boolean | null>(false);
  const [user , setUser]=useState<any| null>(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<FormValues>({
    resolver: yupResolver(registrationFormSchema),
    defaultValues: {
      permission: Permission.StoreOwner,
    },
  });
  const router = useRouter();
  const { t } = useTranslation();

  function getPhoneNumber(value:any){
    return value;
  }
  
  async function onSubmit({ name, email, password, permission,phone_number }: FormValues) {
    registerUser(
      {
        variables: {
          name,
          email,
          password,
          phone_number,
          permission,
        },
      },
      {
        onSuccess: ({ data }) => {
          setUser(data.user.id);
          localStorage.setItem('user_id',data.user.id);
          // setIsRegistered(true);
          router.push('/auth/'+data.user.id);
          return;
          
          if (data?.token) {
            if (hasAccess(allowedRoles, data?.permissions)) {
              setAuthCredentials(data?.token, data?.permissions);
              router.push(ROUTES.DASHBOARD);
              return;
            }
            setErrorMessage("form:error-enough-permission");
          } else {
            setErrorMessage("form:error-credential-wrong");
          }
        },
        onError: (error: any) => {
          Object.keys(error?.response?.data).forEach((field: any) => {
            setError(field, {
              type: "manual",
              message: error?.response?.data[field],
            });
          });
        },
      }
    );
  }

  return (
    <>
    <h1 className='text-center text-xl  font-md text-gray-600 '>{"Shop Registeration Form"}</h1>
    {
      // (!isRegistered)?
      (
        <>
          <form className='mt-10' onSubmit={handleSubmit(onSubmit)} noValidate>
            <Input
              label={t("form:input-label-name")}
              {...register("name")}
              variant="outline"
              className="mb-4"
              error={t(errors?.name?.message!)}
            />
            <Input
              label={t("form:input-label-email")}
              {...register("email")}
              type="email"
              variant="outline"
              className="mb-4"
              error={t(errors?.email?.message!)}
            />
            <PasswordInput
              label={t("form:input-label-password")}
              {...register("password")}
              error={t(errors?.password?.message!)}
              variant="outline"
              className="mb-4"
            />
            <Input
              label={"Phone Number"}
              {...register("phone_number")}
              type="text"
              variant="outline"
              className="mb-5"
              onChange={(e) => setValue("phone_number", getPhoneNumber(e.target.value))}
              error={t(errors.phone_number?.message!)}
            />
            <Button className="w-full" loading={loading} disabled={loading}>
              {t("form:Register")}
            </Button>

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
          <div className="flex flex-col items-center justify-center relative text-sm text-heading mt-8 sm:mt-11 mb-6 sm:mb-8">
            <hr className="w-full" />
            <span className="absolute start-2/4 -top-2.5 px-2 -ms-4 bg-light">
              {t("common:or")}
            </span>
          </div>
          <div className="text-sm sm:text-base text-body text-center">
            {t("form: Already have an account?")}{" "}
            <Link
              href={ROUTES.LOGIN}
              className="ms-1 underline text-accent font-semibold transition-colors duration-200 focus:outline-none hover:text-accent-hover focus:text-accent-700 hover:no-underline focus:no-underline"
            >
              {t("form:button-label-login")}
            </Link>
          </div>
        </>
      )
      // :(
      //   <>
      //     <LicenseFrom user={user}/>
      //   </>
      // )
    }
      
    </>
  );
};

export default RegistrationForm;
