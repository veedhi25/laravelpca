import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useMeQuery } from "@data/user/use-me.query";
import ShopCard from "@components/shop/shop-card";
import NoShopSvg from "../../../public/no-shop.svg";
import { ROUTES } from "@utils/routes";
import LinkButton from "@components/ui/link-button";
import { useLogoutMutation } from "@data/auth/use-logout.mutation";
import { useRouter } from "next/router";
import { useEffect } from "react";


export default function OwnerDashboard() {
  const { t } = useTranslation();
  const { data, isLoading: loading, error } = useMeQuery();


  const { mutate: logout } = useLogoutMutation();

  const router = useRouter();

  useEffect(() => {
    logout();
  }, [logout, router]);

  if (loading) return <Loader text={t("common:loading")} />;
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <>
      <div className="border-b border-dashed border-border-base mb-5 sm:mb-8 pb-8">
        <h1 className="text-lg font-semibold text-heading">
          {t("My Shops")}
        </h1>
      </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 3xl:grid-cols-5 gap-5">
          {data?.shops?.map((myShop) => (
            <ShopCard shop={myShop} />
          ))}
        </div>

      {!data?.managed_shop && !data?.shops?.length ? (

        <div className=' flex py-10 lg:py-10  justify-around pt-0 items-start overflow-y-hidden shadow-sm space-y-8 h-11/12 w-full  opacity-75'>
         
        

                {/* <div className='bg-yellow-400 rounded-lg h-80 w-72
                                hover:transform translate-x-4 translate-y-4'></div> */}

                <div className='flex flex-col space-y-4 sm:space-y-8 lg:space-y-10'> 
                    <h1 className='text-center text-2xl lg:text-4xl  mt-10 font-extrabold font-serif '>
                      Take Your Business to Millions of Customers Near You
                    <p className='text-xl lg:text-2xl mt-10 tracking-widest font-light text-gray-700 px-4 md:px-20 lg:px-20 xl:px-60 text-center'>
                    Create your shop, build an active and engaged audience for your business
                    </p>
                    </h1> 

                    <img 
                      src='https://bluerayws.com/sites/default/files/2019-12/E-COMMERCE-%26-ONLINE-SHOPPING-SERVICES_2.gif'
                      // src='https://previews.123rf.com/images/zuperia/zuperia2003/zuperia200300413/142389355-online-shopping-concept-couple-man-and-woman-are-shopping-online-man-is-carrying-cart-with-purchases.jpg' 
                      className=' w-36 h-36 mx-auto object-contain sm:hidden '
                    />
                    <p className='text-center text-gray-700'>  </p>

                   <div className='mx-auto'> 
                      <LinkButton  href={ROUTES.CREATE_SHOP} 
                         className='  text-lg text-white font-semibold lg:text-xl px-6 p-4 rounded-md bg-green-700'>
                         Create Shop now
                      </LinkButton>
                   </div>

                    
                </div>

          

          <img 
                src='https://bluerayws.com/sites/default/files/2019-12/E-COMMERCE-%26-ONLINE-SHOPPING-SERVICES_2.gif'
                // src='https://previews.123rf.com/images/zuperia/zuperia2003/zuperia200300413/142389355-online-shopping-concept-couple-man-and-woman-are-shopping-online-man-is-carrying-cart-with-purchases.jpg' 
                className='hidden sm:block object-contain lg:w-80 lg:h-80 '
                />
         


        </div>

        // <div className="w-full flex flex-col items-center p-10">
        //   <div className="w-[800px] sm:w-[800px] h-[180px] sm:h-[370px] relative">

         
        //        < Image        quality='40'
        //       alt={t("common:text-image")}
        //       src={NoShopSvg}
        //       layout="fill"
        //       objectFit="cover"
        //     />

        //   </div>
        //   <span className="text-lg font-semibold text-center text-body-dark mt-6 sm:mt-10">
        //     {t("common:text-no-shop")}
        //   </span>
        // </div>

      ) : null}
      {!!data?.managed_shop ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-5">
          <ShopCard shop={data?.managed_shop} />
        </div>
      ) : null}
    </>
  );
}
