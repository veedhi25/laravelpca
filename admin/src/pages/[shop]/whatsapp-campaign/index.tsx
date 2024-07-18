
import Card from "@components/common/card";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import WithdrawList from "@components/withdraw/withdraw-list";
import LinkButton from "@components/ui/link-button";
import ShopLayout from "@components/layouts/shop";
import router, { useRouter } from "next/router";
import { adminAndOwnerOnly } from "@utils/auth-utils";
import { useShopQuery } from "@data/shop/use-shop.query";
import { useWithdrawsQuery } from "@data/withdraw/use-withdraws.query";
import { useEffect, useState } from "react";
import { SortOrder } from "@ts-types/generated";
import SortForm from "@components/common/sort-form";
import Button from "@components/ui/button";
import PasswordInput from "@components/ui/password-input";
import Input from "@components/ui/input";
import Radio from "@components/ui/radio/radio";
import Form from "@components/signup-offers/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useRegisterMutation } from "@data/auth/use-register.mutation";
import { Head } from "next/document";


import FacebookLogin from 'react-facebook-login'; 
 

export default function WhatsappCampaign() {

  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState("created_at");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);

  const router = useRouter();

  const {
    query: { shop },
  } = useRouter();

  const { data: shopData } = useShopQuery(shop as string);
  const shopId = shopData?.shop?.id!;


  function getPhoneNumber(value:any){
    return value;
  }


  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState('');


  const responseFacebook = (response:any) => {
    console.log(response);
    setData(response);
    setPicture(response.picture.data.url);
    if (response.accessToken) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }
 


  function callBackRedirect() {
        router.push(`${shop}/dashboard/`)
  }

 
  const fb_login = () => {
    window.FB.login((response)=> {
      if(response.status === 'connected') {
        // alert('SUCESSFUL')
        FB.api('/me', function(response){
          console.log(response)
        })
        // console.log(response.authResponse.accessToken);
        console.log('response',response);
        router.push(`https://admin.retailunnati.com/${shop}/whatsapp-campaign/${response?.authResponse.userID}`)
        // router.push(`https://localhost:3002/${shop}/whatsapp-campaign/${response?.authResponse.userID}`)
        // console.log('new')
        // console.log('Connected successfully with access token XXXXXXXXX...')
      }
    },
    {
      scope: 'business_management,whatsapp_business_management,whatsapp_business_messaging',
    }
    );
  };

  
  return (

    <>

    {/* <div id="fb-root"></div>

    <body>

     
        <script
            dangerouslySetInnerHTML={{
            __html: `
                window.fbAsyncInit = function() {
                    FB.init({
                    appId      : 381786777315073,
                    cookie     : true,
                    xfbml      : true,
                    version    : v14.0,
                    });
                    
                    FB.AppEvents.logPageView();   
                    
                };

                `}} 
        />

          <script
            dangerouslySetInnerHTML={{
            __html: `

            function checkLoginState() {
              FB.getLoginStatus(function(response) {
                statusChangeCallback(response);
              console.log(response)
              });
            }


            `}} 
          />

        

        <script

            dangerouslySetInnerHTML = {{
            __html: `
                    (function(d, s, id){
                        var js, fjs = d.getElementsByTagName(s)[0];
                        if (d.getElementById(id)) {return;}
                        js = d.createElement(s); js.id = id;
                        js.src = "https://connect.facebook.net/en_US/sdk.js";
                        fjs.parentNode.insertBefore(js, fjs);
                    }(document, 'script', 'facebook-jssdk'));

                `}}
        />
        
    
    </body> */}

    <div className="bg-white w-full h-full py-4">

        <h1 className="  text-xl lg:text-3xl text-gray-900 tracking-normal font-serif font-bold my-2 lg:my-5 text-center">
            Re-target your shop visitors with exciting offers and campaigns
        </h1>
       
           <div className='w-full flex flex-col space-y-12 justify-evenly'>
       
            <div className="flex flex-col items-center"> 
            {/* <img src='https://about.fb.com/wp-content/uploads/2020/07/image-48.png?w=2690' 
            className="object-contain   h-96"/> */}
              <div className='w-full h-full'>

                  <div className="flex flex-col text-center space-y-6">
                        <h3 className="text-xl lg:text-2xl text-gray-700 ">
                          Activate your WhatsApp Business Number with us
                        </h3>
                        <div className="flex flex-col items-center justify-center space-y-10 ">
                          <p className="font-semibold text-2xl text-green-500">Requirements</p>
                          <ul className="text-gray-900 space-y-4 flex flex-col items-start text-lg">
                            <li className=""> ~ Access to your Facebook Business Manager</li>
                            <li> ~ Your company or brand legal name and business</li>
                            <li> ~ A Phone number where you can receive OTP on</li>
                            <li> ~ A valid Business website</li>
                          </ul>
                        </div>
                  </div>

                  <button  onClick={fb_login}
                      className='rounded p-2 px-4 mt-20 mx-auto text-center bg-blue-700 flex justify-center my-auto items-center text-white font-semibold '>
                      
                      Join with Facebook

                      {/* <FacebookLogin
                        appId="381786777315073"
                        autoLoad={true}
                        fields="name,email,picture"
                        scope="public_profile,user_friends"
                        version='14.0'
                        callback={responseFacebook}
                        icon="fa-facebook" /> */}
                    
                  </button>

                    <p className='w-full text-center  h-7  text-gray-900 font-light' id='status'>
          
                    </p>
 
              </div>

              </div>  


            <div className="flex flex-col space-y-10 bg-gray-50 p-3">   
                <p className="text-center text-gray-800 text-4xl">What you'll get</p> 
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 text-gray-800 items-center place-content-center">
                     
                      <div className="flex flex-col  text-center space-y-3 items-center  ">
                            <img className="w-20 h-20" src='/whatsapp.png'/>
                            <p className="text-sm lg:text-sm text-gray-700 tracking-wide font-sans">Have a dedicated number for your brand to communicate</p>
                      </div>
                      <div className="flex flex-col  text-center items-center space-y-3">
                            <img className="w-20 h-20 " src='/chat.png'/>
                            <p className="text-sm lg:text-sm text-gray-700 tracking-wide font-sans">Respond to unlimited customer-initiated conversations</p>
                      </div>
                      <div className="flex flex-col  text-center space-y-3 items-center">
                            <img className="w-20 h-20" src='/conversation.png'/>
                            <p className="text-sm lg:text-sm text-gray-700 tracking-wide font-sans">Send business-initiated conversations to up to 50 customers per day
                            </p>
                      </div>
                      <div className="flex flex-col  text-center space-y-3 items-center" >
                            <img className="w-20 h-20" src='/facebook.png'/>
                            <p className="text-sm lg:text-sm text-gray-700 tracking-wide font-sans">Complete Facebook business verification to remove messaging restrictions</p>
                      </div>

                </div>
            </div>
       
               {/* <div className="fb-login-button" data-width=" " data-size="large" data-button-type="continue_with" data-layout="default" data-auto-logout-link="true" data-use-continue-as="true">
               
                   
       
               </div> */}
       
               {/* <fb:login-button scope="public_profile,email"
                            onlogin="checkLoginState();">
           </fb:login-button>  */}
       
       
               
           </div>
        
    </div>

    </>
    );
  }

  WhatsappCampaign.authenticate = {
    permissions: adminAndOwnerOnly,
  };
  WhatsappCampaign.Layout = ShopLayout;

  export const getServerSideProps = async ({ locale }: any) => ({
    props: {
      ...(await serverSideTranslations(locale, ["table", "common", "form"])),
    },
  });
 
 

