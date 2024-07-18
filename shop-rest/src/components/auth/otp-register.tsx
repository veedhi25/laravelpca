
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { Controller, useForm } from "react-hook-form";
import { useRegisterMutation } from "@data/auth/use-register.mutation";
import Logo from "@components/ui/logo";
import Alert from "@components/ui/alert";
import Input from "@components/ui/input";
import PasswordInput from "@components/ui/password-input";
import Button from "@components/ui/button";
import { useUI } from "@contexts/ui.context";
import { useTranslation } from "next-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useModalAction } from "@components/ui/modal/modal.context";
import { maskPhoneNumber } from "@utils/mask-phone-number";
import { route } from "next/dist/next-server/server/router";
import GetCurrentLocation from "@components/geoCode/get-current-location";
import { useLocation } from "@contexts/location/location.context";
import Radio from "@components/ui/radio/radio";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Query } from "react-query";
import { useOtpRegisterMutation } from "@data/auth/use-otp-register.mutation";
import { useCustomerQuery } from "@data/customer/use-customer.query";
import http from "@utils/api/http";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import url  from '@utils/api/server_url';
import MultipleImageUpload from "./ImageUpload";
import MultipleImagesUpload from "./ImageUpload";
import FileInput from "@components/ui/file-input";



type FormValues = {
  phone_number:number;
  name:string;
  email:string;
  password: string;
  current_location: string;
};


const registerFormSchema = yup.object().shape({
  name: yup.string().required(" Name required"),
  email: yup
    .string()
    .email("error-email-format")
    .required(" Email required"),
    password: yup.string().required(" Password required"),
    phone_number:yup.string().max(10, "Phone number should be of 10 digits only").min(10, 'Phone number should be of 10 digits only').required("error-contact-required").matches(/^[0-9]{10}$/, "Invalid phone number"),
});


// // console.log('loc',getLocation.formattedAddress)

const OtpRegisterForm = (props:any) => {

  const {getLocation} =useLocation();
  const { t } = useTranslation("common");
  const { mutate, isLoading: loading } = useOtpRegisterMutation();
  const [errorMsg, setErrorMsg] = useState("");
  const[occupation, setOccupation] = useState(null);

  const [uploadedPhotos, setUploadedPhotos] = useState([]);

  const [birthDate, setBirthDate] = useState(null);

  const {data} = useCustomerQuery();

  const [userLocation, setUserLocation] = useState('');
 
  const memoizedLocation = useMemo(async () => {
    try {
      const { data: response } = await http.get(`${url}/${API_ENDPOINTS.IP_LOCATION}`);
      return response;
    } catch (error) {
      console.error('Error fetching IP location:', error);
      return null;
    }
  }, []);

  
  useEffect(()=>{
    const getIpLocation = async () => {
      const response = await memoizedLocation;
      setUserLocation(response?.city+","+response?.region_name+','+response?.zip);
    }
    getIpLocation();
  },[ userLocation]);

  // console.log('res',userLocation)

  const path = props?.data?.pathname;

  console.log('url', path)
  
  // const userLoc = [{
  //   formattedAddress: getLocation.formattedAddress,
  //   lat: getLocation?.lat,
  //   lng: getLocation?.lng,
  // }];

  // console.log('register', props.data);
//   const url2 = props?.data?.pathname;

  // const [userLocation, setUserLocation] = useState(userLoc);

  const {
    register,
    handleSubmit,
    setError,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(registerFormSchema),
  });

  

  const router = useRouter();

  const { authorize } = useUI();

  const { closeModal, openModal } = useModalAction();

  function handleNavigate(path: string) {
    router.push(`/${path}`);
    closeModal();
  }

  function getPhoneNumber(value:any){
    return value;
  }

  function getCurrentLocation(value:any){
    return value;
  }

  var { query ,pathname} = router;

  function changeLocation(data:any){

    var location=JSON.stringify(data);

    var { query ,pathname} = router;
    var pathname="/"+pathname
    
    router.push(
    {
        pathname,
        query: query,
    },
    {
        pathname,
        query: query,
    },
    );
    // handleLocation()
  }


  function handleClick(){
    query?.utm_source == 'shop_qr' ? 
    router.push('/login?utm_source=shop_qr&utm_campaign='+query?.utm_campaign+'&shop_id='+query?.shop_id) : 
    openModal("OTP_LOGIN")
  }

    console.log('path', router.pathname);


  function onSubmit({  phone_number,name,email,current_location,password  }: FormValues)   {
    // sessionStorage.setItem("uploadedPhotos", JSON.stringify(uploadedPhotos));
    
    console.log("new" , current_location)

    mutate(
        //@ts-ignore
      {
        name,
        email,
        password,
        phone_number,
        // invited_by:'',
        current_location: getLocation,
        // date_of_birth,
        // occupation,
        gender :'male',
      },
      {
        onSuccess: (data) => {
          router.push('/auth/'+data?.user.id);
          // alert('user registered')
          // query?.utm_source == 'shop_qr' ? 
          // router.push('/auth/'+data?.user.id+'?utm_source=shop_qr&utm_campaign='+query?.utm_campaign+'&shop_id='+query?.shop_id)
          // : path == '/quiz-form' ?  router.push('/auth/'+data?.user.id+'?name=quiz-form') 
          // : path === '/salon-near-me' ? router.push('/auth/'+data?.user.id+'?utm_source=salon-near-me') 
          // : router.push('/auth/'+data?.user.id);
          closeModal();
          
          // if (data?.token && data?.permissions?.length) {
          //   Cookies.set("auth_token", data.token);
          //   Cookies.set("auth_permissions", data.permissions);
          //   authorize();
          //   closeModal();
          //   return;
          // }
          // if (!data.token) {
          //   setErrorMsg(t("error-credential-wrong"));
          // }
          return ;
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

  // // console.log('birthday',birthDate?.toISOString().split('T')[0].split('-').reverse().join('/'))
  // // console.log('birthday',birthDate)

  function onChange(e: any) {
    const { name, value } = e.target;
    setValue(name, value);
  }

  console.log('photos',uploadedPhotos)

  return (
    
    <div className="flex items-center h-screen w-screen lg:w-full lg:h-full  justify-center bg-white sm:bg-gray-100 " >
    <div className="py-6 px-5 bg-light flex flex-col justify-center">
      {/* <div className="flex justify-center">
        <Logo />
      </div> */}

      {/* <MultipleImagesUpload onPhotosChange={setUploadedPhotos}/> */}
      {/* <FileInput control={control} name="profile"   multiple={true} /> */}

       
   <div className="flex items-start">
    {/* <div className="flex w-1/4 justify-center ">
        <Logo />
      </div>  */}
      <div className="">   
        {errorMsg && (
          <Alert
            variant="error"
            message={t(errorMsg)}
            className="mb-6"
            closeable={true}
            onClose={() => setErrorMsg("")}
          />

        )}
        <div className="text-sm sm:text-sm text-body  mt-4 text-center">
          {t(" If already registered, please")}{" "}
          <button
            onClick={handleClick}
            className="ms-1 underline text-blue-500 font-semibold transition-colors duration-200 focus:outline-none hover:text-blue-600 focus:text-blue-600 hover:no-underline focus:no-underline"
          >
            {t(" Login")}
          </button>
        </div>
        <p className="text-gray-700 font-semibold text-xl text-left mt-2 w-full">
          Register Form
        </p>
      </div>
    </div>

      <form className="grid grid-cols-1 gap-2 -mt-6 gap-x-1 place-content-center" 
            onSubmit={handleSubmit(onSubmit)} noValidate>

        <Input
          // label={t("Name")}
          label={t("Name")}
          {...register("name")}
          type="text"
          shadow={true}
          variant="solid"
          className="mb-2 lg:mb-5 col-span-2 "
          error={t(errors.name?.message!)}
        />

        {/* email */}
        <Input
          // label={t("Email")}
          label={t("Email")}
          {...register("email")}
          type="email"
          shadow={true}
          variant="solid"
          className="mb-2 lg:mb-5 col-span-2"
          error={t(errors.email?.message!)}
        />

        {/* phone number */}
        <Input
          label={"Phone Number"}
          {...register("phone_number")}
          type="text"
          inputMode="numeric"
          variant="solid"
          className="mb-2 lg:mb-5 col-span-2 "
          onChange={(e) => setValue("phone_number", getPhoneNumber(e.target.value))}
          error={t(errors.phone_number?.message!)}
        />

        <PasswordInput
          label={t("Password")}
          {...register("password")}
          error={t(errors.password?.message!)}
          variant="solid"
          className="mb-5 col-span-2"
          forgotPageRouteOnClick={() => openModal("FORGOT_VIEW")}
        />

        <Input
          defaultValue={userLocation}
          label={"Current Location"} 
          {...register("current_location")} 
          type="text" 
          variant="solid" 
          placeholder="Enter your city"
          className="col-span-2 text-xs hidden   " 
          error={t(errors.current_location?.message!)} 
        />


        <div className="w-full    flex mt-15">
            <Button className=" flex justify-center w-full rounded-full " 
            variant="normal"
            size="big"
            loading={loading} disabled={loading}>
              {t("Register")}
            </Button>
        </div>
      
      </form>

      
      {/* End of forgot register form */}

      <div className="flex flex-col items-center justify-center relative text-sm text-heading mt-0 sm:mt-4 lg:mt-0 mb-6 sm:mb-8">
        {/* <hr className="w-full" /> */}
        {/* <span className="absolute start-2/4 -top-2.5 px-2 -ms-4 bg-light">
          {t("or")}
        </span> */}
        <div className="text-sm sm:text-base text-body  mt-0 text-center">
          {t(" If already registered, please")}{" "}
          <button
            onClick={handleClick}
            className="ms-1 underline text-blue-500 font-semibold transition-colors duration-200 focus:outline-none hover:text-blue-600 focus:text-blue-600 hover:no-underline focus:no-underline"
          >
            {t(" Login")}
          </button>
        </div>

        <p className="text-center text-sm md:text-base leading-relaxed px-2 sm:px-0 text-body mt-4 sm:mt-5 mb-7 sm:mb-10">
          
          By signing up, you agree to our
          <span
            onClick={() => handleNavigate("terms")}
            className="mx-1 underline cursor-pointer text-blue-600 hover:no-underline"
          >
        
            Terms
          </span>
          &
          <span
            onClick={() => handleNavigate("privacy")}
            className="ms-1 underline cursor-pointer text-blue-600 hover:no-underline"
          >
            
            Policy
          </span>
        </p>
      </div>
      
    </div>
    </div>
    
  );
};

export default OtpRegisterForm;
