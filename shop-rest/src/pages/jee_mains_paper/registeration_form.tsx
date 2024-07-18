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
import http from "@utils/api/http";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import classNames from "classnames";



type FormValues = {
  name: string;
  email: string;
  password: string;
  // phone_number:number;
  // current_location:string;
  // occupation:string;
  // date_of_birth:Date;
  // gender: 'male' | 'female';
};

const registerFormSchema = yup.object().shape({
  name: yup.string().required(" Name required"),
  email: yup
    .string()
    .email("error-email-format")
    .required(" Email required"),
  password: yup.string().required(" Password required"),
  // phone_number:yup.string().max(10, "Phone number should be of 10 digits only").min(10, 'Phone number should be of 10 digits only').required("error-contact-required").matches(/^[0-9]{10}$/, "Invalid phone number"),
  // current_location:yup.string().required("error-location-required"),
});


const defaultValues = {
  name: "",
  email: "",
  password: "",
  // phone_number:"",
  // current_location:'',
  // date_of_birth:'',
  // occupation:'',
  // gender:'male'
};

// // console.log('loc',getLocation.formattedAddress)

const RegisterForm = (props:any) => {
  
  const {setToggle} = props
  

  const {getLocation} =useLocation();
  const { t } = useTranslation("common");
  const { mutate, isLoading: loading } = useRegisterMutation();
  const [errorMsg, setErrorMsg] = useState("");
  const[occupation, setOccupation] = useState(null);

  const [birthDate, setBirthDate] = useState(null);

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
  
  // const userLoc = [{
  //   formattedAddress: getLocation.formattedAddress,
  //   lat: getLocation?.lat,
  //   lng: getLocation?.lng,
  // }];

  // console.log('register', props.data);
  const url = props?.data?.pathname;

  // const [userLocation, setUserLocation] = useState(userLoc);

  const {
    register,
    handleSubmit,
    setError,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(registerFormSchema),
  });     

  useEffect(()=>
  {
    window.scroll({
      top: 50,
      left: 0,
      behavior: 'smooth' // You can use 'auto' for instant scrolling
    });
  },[] )



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

    // data.length ? setLocation(false) : setLocation(false)

    // console.log('address data',data)
    var location=JSON.stringify(data);
    // console.log(data?.formattedAddress);
    // document.getElementById("location_id").value = data?.formattedAddress;
    // setLocation(data?.formattedAddress);

    // if(location){
    //     setHasLoction(true);
        
    // }

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

    // console.log('path', router.pathname)

  function onSubmit({ name, email, password}: FormValues)   {
    mutate(
      {
        name,
        email,
        password,
     
      },
      {
        onSuccess: (data) => {
            // router.push('/auth/'+data?.user.id);
            Cookies.set("auth_token", data.token);
            Cookies.set("auth_permissions", data.permissions);
            authorize();
            router.push('/student-dashboard');
          // query?.utm_source == 'shop_qr' ? 
          // router.push('/shops/'+ query?.campaign)
          // router.push('/auth/'+data?.user.id+'?utm_source=shop_qr&utm_campaign='+query?.utm_campaign+'&shop_id='+query?.shop_id)
          // : url === '/salon-near-me' ? router.push('/auth/'+data?.user.id+'?utm_source=salon-near-me') 
          // : router.push('/auth/'+data?.user.id);
          closeModal();
          return ;
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


  function onChange(e: any) {
    const { name, value } = e.target;
    setValue(name, value);
  }

  return (
    
    
    <div className="bg-[#012B55] h-[720px]">
            <div className='flex justify-center '>
      
       
    
      <form className="flex flex-col  mt-3 max-w-[400px] ml-4 mr-4 bg-white" 
            onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="ml-6 text-2xl border-b pb-4 -mt-10">
        Register Form
      </div>

        {/* name */}
        <label className='ml-6 mt-2 text-lg  mb-1'>Name</label>
        <input type='text ' className='border pl-2 self-center hover:translate-x-2 w-[91%] h-[50px] bg-[#eee] rounded-md'
                   {...register("name")} />

        {/* email */}
      
        <label className='ml-6 mt-2 text-lg  mb-1'>Email</label>
        <input type='email ' className='border pl-2 self-center hover:translate-x-2  w-[91%] h-[50px] bg-[#eee] rounded-md'
                   {...register("email")} />


        

        
        
        <label className='ml-6 mt-2 text-lg  mb-1'>password</label>
                    <input type='password' className='border pl-2 hover:translate-x-2 self-center w-[91%] h-[50px] bg-[#eee] rounded-md'
                    {...register('password')} />
        
         

      

     

        <button type="submit" className='border font-bold text-xl text-white border-[#2e6da4]  ml-4 w-[91%] h-[50px] mt-8 bg-[#337ab7]'>REGISTER</button>
        
        <div className="text-lg self-center mt-4 -mb-6" >
                      
        If already registered, please <span onClick={()=>setToggle(true)} className="text-red-500 font-semibold cursor-pointer ">Login</span> here
                   </div>
      
      </form>

    </div>
    </div>
    
  );
};

export default RegisterForm;
