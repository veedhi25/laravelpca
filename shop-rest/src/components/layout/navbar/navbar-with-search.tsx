
 
import { useUI } from "@contexts/ui.context";
import Logo from "@components/ui/logo";
import JoinButton from "@components/layout/navbar/join-button";
import dynamic from "next/dynamic";
import { useTypesQuery } from "@data/type/use-types.query";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import MobileJoinButton from "./mobile-join-button";
import { useUpdateCustomerMutation } from "@data/customer/use-update-customer.mutation";
import { useCustomerQuery } from "@data/customer/use-customer.query";


 
const AuthorizedMenu = dynamic(
  () => import("@components/layout/navbar/authorized-menu"),
  { ssr: false }
);

 
const NavbarWithSearch = () => {

  const { t } = useTranslation("common");
  const { asPath } = useRouter();
  const { data } = useTypesQuery();
  const {data:userData} = useCustomerQuery();
  const { mutate: updateProfile } = useUpdateCustomerMutation();
  const router = useRouter();
  const { isAuthorize, displayHeaderSearch, displayMobileSearch } = useUI();
  
  return (

    <header
      // ref={navbarRef}
      className="flex flex-col bg-white    h-14 md:h-16 lg:h-auto"
    >
        <nav
          className =
            "w-full h-14 md:h-16 bg-white lg:h-22 py-5 px-4 lg:px-8 flex justify-evenly items-center  top-0 end-0 z-50 transition-transform duration-300 fixed   lg:bg-transparent lg:absolute"
          
        >
            <div className="fixed top-0 w-full  flex space-x-6 items-center bg-white py-5 px-4 justify-between">
            
                <div className="w-28" > 
                  <Logo className="" />
                </div>
                  
                <div className=' flex justify-end  ml-10 space-x-4'>  
                  {
                      isAuthorize ? (
                          <AuthorizedMenu />
                      ) : (
                      <>
                        <div className='block lg:hidden'><MobileJoinButton /></div>
                        <div className='hidden lg:block'><JoinButton /></div>
                      </>
                        
                      )
                    } 
                </div>
            </div>
          
        </nav>
     </header>
    
    
  );
};

export default NavbarWithSearch;

