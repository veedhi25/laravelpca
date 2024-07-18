import Button from "@components/ui/button";
import Input from "@components/ui/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "next-i18next";
import * as yup from "yup";
import { useEffect, useState } from "react";

interface Props {
  onSubmit: (values: { token: string }) => void;
  loading: boolean;
}

const schema = yup.object().shape({
  token: yup.string().required("Please enter otp"),
});

const EnterTokenView = ({ onSubmit, loading }: Props) => {
  
  const { t } = useTranslation("common");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ token: number }>({ resolver: yupResolver(schema) });

  const [otp, setOtp] = useState("");

  // alert(otp);

  // useEffect(() => {

  //   if ("OTPCredential" in window) {
  //     const ac = new AbortController();

  //     navigator.credentials
  //       .get({
  //         publicKey: {
  //           timeout: 10000,
  //           allowCredentials: [
  //             {
  //               type: "public-key",
  //               id: "pkc1-public-key",
  //             },
  //           ],
  //         },
  //       })
  //       .then((credential) => {
  //         if (credential) {
  //           const { id } = credential;
  //           const { otp } = credential.response;
  //           setOtp(otp);
  //           onSubmit({ token: id });
  //         }
  //       }
  //       )
  //       .catch((err) => {
  //         // console.log(err);
  //       }
  //       );
  //     return () => {
  //       ac.abort();
  //     }
  //   }
  // }, []);




  //         signal: ac.signal,
  //       })
  //       .then((otp) => {
  //        setOtp(otp.code);
  //         // // console.log(otp?.code);
  //         // handleSubmit(onSubmit)
  //         ac.abort();
  //       })
  //       .catch((err) => {
  //         ac.abort();
  //         // console.log(err.message);
  //       });
  //   }
  // }, []);

  return (

    <div className="w-screen md:max-w-md h-full md:h-auto p-4"> <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input
        id='token'
        label={t("Enter  OTP")}
        {...register("token")}
        inputMode="numeric"
        variant="rounded"
        className="mb-5"
        error={t(errors.token?.message!)}
      />
      <Button className="w-full h-11 rounded-full" loading={loading} disabled={loading}>
        {t("Submit OTP")}
      </Button>
    </form>
    </div>

  );
};

export default EnterTokenView;
