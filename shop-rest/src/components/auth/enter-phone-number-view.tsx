import Button from "@components/ui/button";
import Input from "@components/ui/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "next-i18next";
import { useModalAction } from "@components/ui/modal/modal.context";
import router from "next/router";
import { MobileIcon } from "@components/icons/mobile-icon";
import { MailIcon } from "@heroicons/react/outline";

interface Props {
  onSubmit: (values: { phone_number: string }) => void;
  loading: boolean;
}

const schema = yup.object().shape({
  phone_number: yup
    .string()
    .max(10, "Phone number should be of 10 digits only")
    .min(10, 'Phone number should be of 10 digits only, (Try without country code)')
    .matches(/^[0-9]{10}$/, "Invalid phone number")
    .required("Please enter your phone number"),
});

const EnterPhoneNumberView = ({ onSubmit, loading }: Props) => {
 
  const { t } = useTranslation("common");
  const { openModal, closeModal } = useModalAction();

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<{ phone_number: number }>({ resolver: yupResolver(schema) });

  var { query ,pathname} = router;

  function handleClick() {
    query?.utm_source == 'shop_qr' ? 
    router.push('/login?utm_source=shop_qr&utm_campaign='+query?.utm_campaign+'&shop_id='+query?.shop_id) : 
    openModal("LOGIN_VIEW")
  }

  return (

    <div className="w-screen md:max-w-md h-auto md:h-auto p-4"> 
    {/* <div className="py-6 px-5 sm:p-8 bg-light w-screen md:max-w-md h-screen md:h-auto flex flex-col justify-center"> */}

     <form onSubmit={handleSubmit(onSubmit)} noValidate>
      
      <Input
        label={t("Enter Mobile Number")}
        {...register("phone_number")}
        type="phone_number"
        //restrict to numbers only
        pattern="[0-9]*"
        inputMode="numeric"
        variant="rounded"
        className="mb-50 "
        
        placeholder="Enter your registered mobile number"
        error={t(errors.phone_number?.message!)}
      />
      <div className="mt-6 space-y-8 ">
      <Button className="w-full h-11 rounded-full" loading={loading} disabled={loading}>
        {t("Submit")}
      </Button>

      {/* <div className="flex items-center">
        <hr className="w-full text-center text-gray-400"/>
        <span className="mx-3 text-gray-700">Or</span>
        <hr className="w-full text-center text-gray-400"/>
      </div> */}
       

      {/* <button
            className="w-full bg-gray-500 rounded-full  h-12 text-white border    sm:h-10"
            loading={loading}
            disabled={loading}
            onClick={handleClick}
          >
            {t("Login with Email ")}
      </button> */}
      <Button
          className="h-11 w-full rounded-full bg-gradient-to-l from-gray-900 to-gray-500 hover:from-gray-800 hover:to-gray-800 !text-light hover:!bg-gray-600 sm:h-12"
          disabled={loading}
          onClick={handleClick}
        >
          <MailIcon className="h-5 text-light ltr:mr-2 rtl:ml-2" />
          {t('Login with Email')}
          
        </Button>
    </div>
    

    </form>
    </div>
  );
};

export default EnterPhoneNumberView;
