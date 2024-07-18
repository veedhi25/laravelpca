// import MobileNavigation from "./mobile-navigation";
import dynamic from "next/dynamic";
import NavbarWithTypes from "./navbar/navbar-with-types";
import ShopNavbar from "./navbar/shop-navbar";

const MobileNavigation = dynamic(() => import('./mobile-navigation'), { ssr: false });

const ShopVisitorLayout: React.FC = ({ children }) => {

  return (

    <div className="flex flex-col transition-colors duration-150">
        {/* <ShopNavbar /> */}
        <div>{children}</div>
        <MobileNavigation />
    </div>
  );
};

export default ShopVisitorLayout;
