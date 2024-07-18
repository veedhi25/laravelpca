import Navbar from "@components/layout/navbar/navbar";
import MobileNavigation from "./mobile-navigation";
// import Footer from "@components/footer/Footer";
import NavbarWithSearch from "./navbar/navbar-with-search";
import dynamic from 'next/dynamic';
import { useRouter } from "next/router";
 

const Footer = dynamic(() => import('@components/footer/Footer'),
 { ssr: false });


 const Layout: React.FC = ({ children }) => {

  const router = useRouter();

  return (

    <div className="min-h-screen flex flex-col transition-colors duration-150 bg-gray-100">
        <NavbarWithSearch />
      <div className="h-full">{children}</div>
      {/* { router?.pathname == '/buylowcal-community' ? null : <Footer/>} */}
      
      <MobileNavigation search={false} />
    </div>

 )};

export default Layout;
