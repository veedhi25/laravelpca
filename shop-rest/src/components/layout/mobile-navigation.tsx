import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useUI } from "@contexts/ui.context";
import { NavbarIcon } from "@components/icons/navbar-icon";
import { SearchIcon } from "@components/icons/search-icon";
import { HomeIcon } from "@components/icons/home-icon";
import { ShoppingBagIcon } from "@components/icons/shopping-bag-icon";
import { UserIcon } from "@components/icons/user-icon";
import { useTranslation } from "next-i18next";
import { useCart } from "@contexts/quick-cart/cart.context";
import { useModalAction } from "@components/ui/modal/modal.context";
import AuthorizedMenu from '@components/layout/navbar/authorized-menu';
import Image from "next/image";


type MobileNavigationProps = {
  search?: boolean;
};

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  search = true,
}) => {
  const router = useRouter();

  const { t } = useTranslation("common");

  const { openSidebar, setSidebarView, toggleMobileSearch, isAuthorize } =
    useUI();

  const { openModal } = useModalAction();

  const { totalUniqueItems } = useCart();

  function handleSidebar(view: string) {
    setSidebarView(view);
    return openSidebar();
  }

  function handleAuthModal() {
    return openModal("LOGIN_VIEW");
  }

  return (
    
    <div className="visible lg:hidden h-12 md:h-14 z-50">
      <nav className="h-12 md:h-14 w-full py-1.5 px-2 flex justify-between fixed start-0 bottom-0 z-50 bg-light shadow-10">
        <motion.button
          whileTap={{ scale: 0 }}
          onClick={() => handleSidebar("MAIN_MENU_VIEW")}
          className="flex p-2 h-full items-center justify-center focus:outline-none focus:text-accent"
        >
          <span className="sr-only">{t("text-burger-menu")}</span>
            {/* < Image quality='1' 
             
          layout="intrinsic"
          width={30}
          height={30}
          objectFit="contain"
           src='/list.png' className='h-8 w-8'/> */}
            <img src="/list.png" className='h-7 w-7'/>
        </motion.button>

        {/* {isAuthorize && (
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick= //navigate to wishlist page
            {() => {
              router.push("/wishlists");
            }
            }
            className="flex p-2 h-full items-center justify-center focus:outline-none focus:text-accent"
          >
            <span className="sr-only">{t("text-search")}</span>
               
              <img src="/wishlist.png" className='h-7 w-7'/>
          </motion.button>
        )} */}

       

      { isAuthorize && <motion.button
          whileTap={{ scale: 0.88 }}
          // onClick={()=>openModal('USER_MESSAGE_LIST')}
          onClick={() => router.push('/user/messages')}
          // onClick={() => router.push("/user/messages")}
          className="flex p-2 h-full items-center justify-center focus:outline-none focus:text-accent"
        >
          <span className="sr-only">{t("msg")}</span>
             
            <img src="/msg.png" className='h-6 w-6'/>
        </motion.button>
     }
        
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => router.push("/home")}
          className="flex p-2 h-full items-center justify-center focus:outline-none focus:text-accent"
        >
          <span className="sr-only">{t("text-home")}</span>
             {/* < Image        quality='1' 
             
            layout="intrinsic"
            width={30}
            height={30}
            objectFit="contain"
            src='/home.png' 
           /> */}
            <img src="/home.png" className='h-7 w-7'/>
        </motion.button>
        

        {/* scanner */}
        {/* <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => openModal("SCANNER")}
          className="flex p-2 h-full items-center justify-center focus:outline-none focus:text-accent"
        >
          <span className="sr-only">{t("text-burger-menu")}</span>
            
            <img src="/qr.png" className='h-7 w-7'/>
        </motion.button> */}

        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => handleSidebar("CART_VIEW")}
          className="flex p-2 product-cart h-full relative items-center justify-center focus:outline-none focus:text-accent"
        >
          <span className="sr-only">{t("Cart")}</span>
             {/* < Image         quality='1' 
             
            layout="intrinsic"
            width={30}
            height={30}
            objectFit="contain"
           src='/cart.png' 
           
           /> */}
            <img src="/cart.png" className='h-7 w-7'/>
          {totalUniqueItems > 0 && (
            <span className="bg-accent py-1 px-1.5 text-10px leading-none font-semibold text-light rounded-full absolute top-0 end-0 mt-0.5 -me-0.5">
              {totalUniqueItems}
            </span>
          )}
        </motion.button>

        {!!isAuthorize ? (
          <motion.button
            whileTap={{ scale: 0 }}
            onClick={() => handleSidebar("AUTH_MENU_VIEW")}
            className="flex p-2 h-full items-center justify-center focus:outline-none focus:text-accent"
          >
            <span className="sr-only">{t("text-user")}</span>
                {/* < Image       
             
             quality='1' 
             
              layout="intrinsic"
              width={30}
              height={30}
              objectFit="contain"
              src='/boy.png' 
              
              /> */}
               <img src="/boy.png" className='h-7 w-7'/>
          </motion.button>
        ) : (
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={handleAuthModal}
            className="flex p-2 h-full items-center justify-center focus:outline-none focus:text-accent"
          >
            <span className="sr-only">{t("text-user")}</span>
                {/* <Image quality='1' 
                
              layout="intrinsic"
              width={30}
              height={30}
              objectFit="contain"
              src='/boy.png' 
              
              /> */}
              <img src="/boy.png" className='h-7 w-7'/>
          </motion.button>
        )}
      </nav>
    </div>
  );
};

export default MobileNavigation;
