import React, { useState } from "react";
import Cookies from "js-cookie";
import { signIn } from "next-auth/client";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "@data/auth/use-login.mutation";
import Logo from "@components/ui/logo";
import Alert from "@components/ui/alert";
import Input from "@components/ui/input";
import PasswordInput from "@components/ui/password-input";
import Button from "@components/ui/button";
import { useUI } from "@contexts/ui.context";
import { useTranslation } from "next-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FacebookIcon } from "@components/icons/facebook";
import { GoogleIcon } from "@components/icons/google";
import { useModalAction } from "@components/ui/modal/modal.context";
import { MobileIcon } from "@components/icons/mobile-icon";
import router from "next/router";
import Link from "next/link";


type FormValues = {
    email: string;
    password: string;
  };
  
  const loginFormSchema = yup.object().shape({
    email: yup
      .string()
      .email("error-email-format")
      .required(" Email required"),
    password: yup.string().required(" Password required"),
  });
  
  const defaultValues = {
    email: "",
    password: "",
  };

const Login_Form = ({setToggle}) => {
    const { t } = useTranslation("common");
  const { mutate: login, isLoading: loading } = useLoginMutation();
  const [errorMsg, setErrorMsg] = useState("");
  const { authorize } = useUI();
  const { openModal, closeModal } = useModalAction();
  var { query ,pathname} = router;

  


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(loginFormSchema),
    defaultValues,
  });

  function handleClick(){
    query?.utm_source == 'shop_qr' ? 
    router.push('/register?utm_source=shop_qr&utm_campaign='+query?.utm_campaign+'&shop_id='+query?.shop_id) : 
       openModal("OTP_REGISTER")
  }


  function handleOtpLoginClick(){
    query?.utm_source == 'shop_qr' ? 
    router.push('/otp-login?utm_source=shop_qr&utm_campaign='+query?.utm_campaign+'&shop_id='+query?.shop_id) : 
      openModal("OTP_LOGIN")
  }

  function onSubmit({ email, password }: FormValues) {
    login(
      {
        email,
        password,
      },
      {
        onSuccess: (data) => {

          // alert('Access Restricted')
          //   return 
          // router.push("/user-dasboard-pages/courses")
          if (data?.token && data?.permissions?.length) {
            Cookies.set("auth_token", data.token, { expires: 10 });
            Cookies.set("auth_permissions", data.permissions, { expires: 10 });
            authorize(); 
            router.push("/student-dashboard")
            closeModal();
             return;
          }
          if (!data.token) {
            setErrorMsg(t("error-credential-wrong"));
          }
        },
        onError: (error: any) => {
          alert('Something went wrong!!')
          // console.log(error.message);
        },
      }
    );
  }


    // const  onSubmit = (e) =>
    // {
    //     console.log(e);
    //     reset();
    //     router.push("/jee_mains_paper/instruction_page")
    // }

    return ( 
        <div className="bg-[#012B55] h-[550px]">
            <div className='flex justify-center '>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col  mt-10 max-w-[400px] ml-4 mr-4 bg-white '>
                
                    <h1 className=' ml-6 text-2xl border-b pb-4 -mt-4'>Login </h1>
                    <label className='ml-6 mt-6 text-lg  mb-1'>Email Id</label>
                    <input type='text ' className='border pl-2 self-center  w-[91%] h-[50px] bg-[#eee] rounded-md'
                    {...register('email')} />
                    <span className="text-red-500 font-light">{errors.email?.message!}</span>

                    <label className='ml-6 mt-6 text-lg  mb-1'>Password</label>
                    <input type='password' className='border pl-2  self-center w-[91%] h-[50px] bg-[#eee] rounded-md'
                    {...register('password')} />
                    <span className="text-red-500 font-light">{errors.password?.message!}</span>

                    <button type="submit" className='border font-bold text-xl text-white border-[#2e6da4]  ml-4 w-[91%] h-[50px] mt-8 bg-[#337ab7]'>LOGIN</button>
                    {/* <div className='mt-1 self-center text-medium font-bold text-[#f7931e]'>Click Login To proceed</div> */}
                
                    <div className="text-lg self-center mt-4 -mb-6" >
                      
                         If not registered, please <span onClick={()=>setToggle(false)} className="text-red-500 font-semibold cursor-pointer ">Register</span> here
                   </div>
                </form> 
                
            </div>
            
        </div> 
    );
}
 
export default Login_Form;