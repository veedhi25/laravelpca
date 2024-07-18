
import Logo from "@components/ui/logo";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import RegistrationForm from "@components/auth/registration-form";
import { useRouter } from "next/router";
import { getAuthCredentials, isAuthenticated } from "@utils/auth-utils";
import { ROUTES } from "@utils/routes";
import Link from 'next/link';
import Footer from "@components/footer/Footer";
import CountUpAnimation from "@components/countup-animation/countup-animation";
import { CheckMarkCircle } from "@components/icons/checkmark-circle";
import { CheckMark } from "@components/icons/checkmark";

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ["common", "form"])),
  },
});

export default function RegisterPage() {

  const router = useRouter();
  const { token, permissions } = getAuthCredentials();
  if (isAuthenticated({ token, permissions })) {
    router.replace(ROUTES.DASHBOARD);
  }
  const { t } = useTranslation("common");

  return (
    
    <>
     <div className='border p-2 lg:p-4 w-full'>
                <Logo/>
            </div>
   
    <div className='w-full grid grid-cols-1  lg:grid-cols-2 lg:w-full lg:items-center 
                      bg-gray-50 '>


        {/* banner */}
        <div className='flex flex-col space-x-6 items-center mt-10 lg:mt-20 border-0 
                        lg:border-r lg:border-b-0 lg:border-l-0 '>

            <div className=' flex flex-col  items-center space-y-8 tracking-widest'>
                <h1 className='text-3xl lg:text-5xl font-serif font-bold w-3/4 space-y-6 text-center text-gray-800 '>

                Get Access to Your Area’s Local Customers with <span></span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-yellow-600 ">
                RetailUnnati.com 
                </span>

                <p className='text-lg font-light '> Customer loyalty with promotional and interactive campaigns. 
                                                    Hard cash earnings and cash back rewards for customers to shop from you.  </p>

                </h1>

                {/* <a className=' cursor-pointer text-lg hover:underline font-light mt-4' href='./register#vendor'><button className='w-60 px-4 p-3 rounded-md text-lg font-semibold items-center bg-green-700 text-white '>Register Now</button></a> */}

            </div>

            {/* banner image */}
            <div className='-mt-20 lg:mt-0 w-600'> 
              <img src='/banner-animated.png' className='w-full h-96 object-contain'/>
            </div>

        </div>
        
    

      <div id='vendor' className=' w-full sm:mt-8 sm:w-2/3 -mt-10 mx-auto md:mt-10 lg:mt-10 shadow-lg p-8'> 
        <RegistrationForm/>
      </div> 

    </div>

    {/* Countup Animation*/}
    <CountUpAnimation/>
    
    {/* feature blocks */}
    <div className=' flex flex-col items-center mx-auto space-y-6 mt-10 bg-green-50 py-6'>
        <h1 className='text-3xl lg:text-4xl font-serif font-bold w-3/4 space-y-6 text-center text-gray-800 '>
        Your Digital Shop Absolutely Free for Lifetime with Complete Control of
        </h1>
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-10 lg:gap-20  place-items-stretch  lg:grid-cols-4 xl:grid-cols-4 '>
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 text-center gap-2 place-items-center space-x-4 '>
          <img className='h-20 w-20' src='/customer.png'/>
          <h1 className='font-lg text-xl tracking-widest'>Customers</h1>

        </div>

        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 text-center gap-2 place-items-center space-x-4 '>
          <img className='h-20 w-20' src='/product.png'/>
          <h1 className='font-lg text-xl tracking-widest'>Products</h1>

        </div>

        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 text-center gap-2 place-items-center space-x-4 '>
          <img className='h-20 w-20' src='/inventory.png'/>
          <h1 className='font-lg text-xl tracking-widest'>Inventories</h1>

        </div>

        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 text-center gap-2 place-items-center space-x-4 '>
          <img className='h-20 w-20' src='/offers.png'/>
          <h1 className='font-lg text-xl tracking-widest'>Offers</h1>

        </div>

        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 text-center gap-2 place-items-center space-x-4 '>
          <img className='h-20 w-20' src='/billing.png'/>
          <h1 className='font-lg text-xl tracking-widest'>Billing</h1>

        </div>

        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 text-center gap-2 place-items-center space-x-4 '>
          <img className='h-20 w-20' src='/staff.png'/>
          <h1 className='font-lg text-xl tracking-widest'>Staff</h1>

        </div>

        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 text-center gap-2 place-items-center space-x-4 '>
          <img className='h-20 w-20' src='/money-bag.png'/>
          <h1 className='font-lg text-xl tracking-widest'>Money</h1>

        </div>

        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 text-center gap-2 place-items-center space-x-4 '>
          <img className='h-20 w-20' src='/insight.png'/>
          <h1 className='font-lg text-xl tracking-widest'>Consumer Insights</h1>

        </div>
      </div>

      <div className='font-md text-gray-600 text-lg tracking-widest mx-6 text-center '>
           Free Access to Local Customer Looking for Your Products in Your Locality
      </div>

    </div>

    <div className ='w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3  my-2 lg:my-8 gap-6
                    place-items-center justify-evenly items-center mb-8  lg:shadow-none mx-auto'>

      <div className='flex flex-col max-w-96 text-lg shadow-lg p-8 font-semibold space-y-4 
                    text-gray-800 tracking-wide items-center'>
          
          <h1>Easy to use UI with Shop Dashboard</h1>

          <p className='text-sm font-light  text-center text-gray-900'> 
            Track your sales and revenue and more in your shop dashboard  
          </p>
          
          <img src='/shop-image.png' 
                className='w-full border-1 h-72 object-fill lg:object-contain  lg:hover:transition-transform duration-700 ease-in-out hover:scale-125'/>

      </div>

      <div className='flex w-auto flex-col max-w-96 text-lg font-semibold p-8 shadow-lg space-y-4 
                    text-gray-800 tracking-wide items-center'>

          <h1>Add Products on go</h1>
          <p className='text-sm font-light text-center text-gray-900'> 
           Master prodcuts contains all product that you need for your shop </p>
          <img src='/master-product.png' 
                className='w-full border-1 h-72 object-fill lg:object-contain  lg:hover:transition-transform duration-700 ease-in-out hover:scale-125'/>
        
      </div>

      <div className='flex flex-col  max-w-96 text-lg font-semibold shadow-lg p-8 space-y-4 
                    text-gray-800 tracking-wide items-center'>

          <h1> Your shop  </h1>

          <p className='text-sm font-light text-center text-gray-900'> 
           Your Ecommerce shop ready to serve the end customers
          </p>

          <img 
          src='/shop-shot.png'
          // src='https://redq.io/landing/_next/static/images/1-73db406dcd877c4776e7a485a4767d5d.png'
          // src='/shop-dashboard.png' 
          className='w-full border-1 h-72 object-fill lg:object-contain  lg:hover:transition-transform duration-700 ease-in-out hover:scale-125'/>
        
      </div>

    </div>
     
     {/* how to get customer */}
    <div className='grid grid-cols-1 sm:grid-cols-2 place-items-center lg:place-items-center  w-full   mt-20 space-x-0 lg:space-x-0 lg:mt-40'>

        <div className=' flex flex-col items-center sm:hidden '>
          <h1 className='block sm:hidden font-bold tracking-widest text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-center '>How we get customers? </h1>
          <img src='/animated-customer.png' className='h-72 w-72 sm:h-80 sm:w-80 mt-10 sm:mt-0 lg:w-full  lg:h-full'/>
        </div>

        <div className='hidden sm:flex'>
          <img src='/animated-customer.png' 
              className='hidden sm:block h-72 w-72 sm:h-80 sm:w-80 mt-10 sm:mt-0 lg:w-full  lg:h-full'/>
        </div>

        <div className=' flex flex-col space-y-8 lg:space-y-16 items-center '>
          <h1 className='hidden sm:block font-bold tracking-widest text-3xl lg:text-4xl xl:text-5xl  '>How we get customers?</h1>

          <div className='flex flex-col space-y-5 lg:space-y-10 w-80 xs+:w-80 sm:w-full'>
            <h4 className='flex items-center text-md font-md text-gray-700 text-left tracking-wider space-x-4'><span className=''><CheckMark className='h-4 lg:h-6 text-white mr-4 w-4 lg:w-6 bg-green-600 rounded-full '/></span>Hard Cash Earning on Shopping</h4>
            <h4 className='flex items-center text-md font-md text-gray-700 text-left tracking-wider space-x-4'><span className=''><CheckMark className='h-4 lg:h-6 text-white mr-4 w-4 lg:w-6 bg-green-600 rounded-full '/></span>Customer Engagement & Loyalty</h4>
            <h4 className='flex items-center text-md font-md text-gray-700 text-left tracking-wider space-x-4'><span className=''><CheckMark className='h-4 lg:h-6 text-white mr-4 w-4 lg:w-6 bg-green-600 rounded-full '/></span>Rewards</h4>
            <h4 className='flex items-center text-md font-md text-gray-700 text-left tracking-wider space-x-4'><span className=''><CheckMark className='h-4 lg:h-6 text-white mr-4 w-4 lg:w-6 bg-green-600 rounded-full '/></span>Free and Discounted promotional products</h4>
            <h4 className='flex items-center text-md font-md text-gray-700 text-left tracking-wider space-x-4'><span className=''><CheckMark className='h-4 lg:h-6 text-white mr-4 w-4 lg:w-6 bg-green-600 rounded-full '/></span>Consumer Behaviour Intelligence</h4>
          </div>
        
        </div>
     

    </div>

       <div className=''> <Footer /> </div>
    </>
  );
}
