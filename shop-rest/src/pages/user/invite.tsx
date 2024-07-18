
import Input from "@components/ui/input";
import { useForm } from "react-hook-form";
import Button from "@components/ui/button";
import { useContactMutation } from "@data/customer/use-contact.mutation";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ProfileSidebar from "@components/profile/profile-sidebar";
import { useEffect, useRef, useState } from "react";
import Footer from '@components/footer/Footer';
import url from "@utils/api/server_url";
import { useCustomerQuery } from "@data/customer/use-customer.query";
import Navbar from "@components/layout/navbar/navbar";
import Link from 'next/link';
import {ClipboardIcon} from '@heroicons/react/outline';
import { toast } from "react-toastify";
import { RWebShare } from "react-web-share";


const contactFormSchema = yup.object().shape({
  name: yup.string().required(" Name required"),
  email: yup
    .string()
    .email("error-email-format")
    .required(" Email required"),
  PhoneNumber: yup.string().required("You must need to provide your Phone Number "),
  description: yup.string().required("error-description-required"),
});

export const InvitePage = () => {

  const { t } = useTranslation("common");
  const { mutate, isLoading } = useContactMutation();
  const { data } = useCustomerQuery();
  const tooltext =useRef("copy") as any;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(contactFormSchema) });
  
  function onSubmit(values: any) {
    mutate(values);
    reset();
  }
  
  function copyLink(url:string){
    navigator.clipboard.writeText(url.toString());
    tooltext.current.innerHTML="copied!"
    setTimeout(() => {
      tooltext.current.innerHTML="copy"
    }, 2000);
  }

  const [click, setClick] = useState(false);


	const copyText = () => {
        setClick(true);
	}

  // const supportsContacts = ('contacts' in navigator && 'ContactsManager' in window)

  //   // console.log('contacts',supportsContacts);

  //   let windowNav : any;
  //   let nav : any;
  //   windowNav = window.navigator;
  //   nav = navigator;


  //   async function checkProperties() {
  //     const supportedProperties = await windowNav.contacts.getProperties();
  //     if (supportedProperties.includes('name')) {
  //       // run code for name support
  //     }
  //     if (supportedProperties.includes('email')) {
  //       // run code for email support
  //     }
  //     if (supportedProperties.includes('tel')) {
  //       // run code for telephone number support
  //     }
  //     if (supportedProperties.includes('address')) {
  //       // run code for address support
  //     }
  //     if (supportedProperties.includes('icon')) {
  //       // run code for avatar support
  //     }
  //   }

  //   const props = ['name', 'email', 'tel', 'address', 'icon'];
  // const opts = {multiple: true};

  // const [contacts, setContacts] = useState('');
  //  const [prop, setProps] = useState('');
  // //  const [opts, setOpts] = useState([]);


  // async function getContacts() {
  //   try {
  //       const contacts = await windowNav?.contacts.select(props, opts);
  //      setContacts(JSON.stringify(contacts)?.tel);
  //      alert(JSON.stringify(contacts));
     
      
  //   } catch (ex) {
  //       alert('Sorry, not supported on web');
  //   }
  // }


const ShareButton = () => {

  return (

    <div>
      <RWebShare
        data={{
          text: "Hey," + data?.me?.name +" has invited you to join the Acharyakulam community. Click on this link and register now.",
          url: "https: //retailunnati.com/invite/"+data?.me?.id,
          title: "Send this invite link",
        }}

        closeText="Close"

      >
        <button className="bg-green-600 text-white p-2 px-3 rounded-lg">Send 🔗</button>
      </RWebShare>
    </div>
  );
};


  return (

    <>

    <Navbar label='Invite Friends'/>
    <div className="w-full bg-gray-100">
      <div className="flex flex-col md:flex-row max-w-7xl w-full mx-auto py-10 px-5 xl:py-14 xl:px-8 2xl:px-0">
        {/* Left sidebar */}
        <div className='flex flex-col '>
          <ProfileSidebar className="flex-shrink-0 hidden xl:block xl:w-80 me-4" />  
        </div> 
        {/* Right side content */}
        <div className="w-full order-1 md:order-2 mb-8 md:mb-0 md:ms-7 lg:ms-9 p-5 md:p-8 bg-light">
          <div className='flex  w-full justify-between'>
            <div className='flex flex-col w-full   mb-3'>
              <h1 className='text:sm sm:text-sm md:text-md lg:text-2xl 3xl:text-3xl font-bold tracking-wide '>Save and Earn Hard Cash Each Time You or Your Friends, Family, Network Shops </h1>
              <p className='text-gray-500 text-sm tracking-wide mt-2'>
                <h4 className='text:sm sm:text-sm md:text-md lg:text-lg font-bold mt-2 '>Shop - Save – Earn</h4>
                BuyLowcal rewards you with money each time you shop from your nearest shops 
                and also by referring to anyone in your network. 
                <h4 className='text-sm font-semibold mt-2'>Be an Entrepreneur, Be Your Own Boss</h4>
                <h5 className='text-green-500 font-semibold mt-2 '> Terms apply </h5>
              </p>
              <span  className="font-semibold text-gray-800  mt-4">Share this link with your friends</span>
            </div>
          </div>
          {data?.me&&
          (
            <div className="flex  items-center">  
              <div className="tip">
                <ClipboardIcon onClick={()=>{copyLink(process.env.NEXT_PUBLIC_URL+"/invite/"+data?.me?.id)}} className="icon-clipboard"/>
                <span ref={tooltext} className="tiptext">copy</span>
              </div>
              <p className="invite-link">{process.env.NEXT_PUBLIC_URL+"/invite/"+data?.me?.id}</p>
            </div>
          )}

          {/* <button onClick={getContacts} 
                  className='rounded-lg mt-5 p-2 px-3 bg-blue-600 
                           hover:bg-blue-700 text-white'>
                  Get Contacts
          </button> */}

         <div className="mt-4">
           <ShareButton/>
         </div> 

          {/* <p className="text-md text-black">
            {contacts}
          </p> */}
          {/* <p>{prop}</p> */}
          {/* <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label={t("Name")}
                // {...register("name")}
                variant="outline"
                error={t(errors.name?.message!)}
              />
              <Input
              label={t("Phone Number")}
              //   {...register("subject")}
              variant="outline"
              //   className="my-6"
              error={t(errors.PhoneNumber?.message!)}
              />
              <Input
                label={t("Email")}
                // {...register("email")}
                type="email"
                variant="outline"
                className="my-6 w-full "
                error={t(errors.email?.message!)}
              />
            </div>
            <Button loading={isLoading} disabled={isLoading}>
              {t("Invite")}
            </Button>
            <div className='flex-shrink-0 mt-6 w-full   xl:w-1/2 py-4 mb-4 border rounded-sm  block xl:hidden  me-10 bg-white '>
              <h2 className='font-semibold p-4'>Your Referral Score</h2>
                <div className='flex flex-col justify-between space-y-8 mx-6  '> 
                  <span className='flex justify-between border-b '><h2 className='text-green-700 font-semibold'>Pending</h2>
                    <h3> 1200 </h3> </span>
                  <span className='flex justify-between border-b'><h2 className='text-green-700 font-semibold'>  Successful </h2>
                  <h3>0</h3></span>	
                </div>
              <Link href='./referral-network'>
                <button className=' flex justify-center w-70 sm:w-80 bg-green-500 mx-auto text-white p-1  xl:p-3 rounded-md px-2 mt-4'> 
                  See your network 
                </button>
              </Link>   
            </div> 
          </form> */}

          {/* Video   */}
          {/* <div className='flex w-auto max-w-96 flex-col mt-8'>
            <iframe 
              width="560" height="315" src="https://www.youtube.com/embed/fSttx_Wuwtg" 
                title="YouTube video player" className='w-full '
              frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen>
            </iframe>
          </div> */}

        </div>
      </div>

      <div className='flex flex-col items-center '>

			</div>
      <Footer/>
    </div>
    
    </>
  );
};

    // InvitePage.Layout = Layout;
    export default InvitePage;

    export const getStaticProps = async ({ locale }: any) => {
      return {
        props: {
          ...(await serverSideTranslations(locale, ["common"])),
        },
      };
    };
