
import { useRef, useState } from "react";
import { siteSettings } from "@settings/site.settings";
import Logo from "@components/ui/logo";
import NavLink from "@components/ui/link/nav-link";
import JoinButton from "@components/layout/navbar/join-button";
import { addActiveScroll } from "@utils/add-active-scroll";
import { useUI } from "@contexts/ui.context";
import dynamic from "next/dynamic";
import { ROUTES } from "@utils/routes";
import Link from "@components/ui/link";
import { useTranslation } from "next-i18next";
import MobileJoinButton from "./mobile-join-button";
import { isAbsolute } from "path/posix";

const AuthorizedMenu = dynamic(
  () => import("@components/layout/navbar/authorized-menu"),
  { ssr: false }
);
type DivElementRef = React.MutableRefObject<HTMLDivElement>;

const Navbar = ({label}) => {
  const navbarRef = useRef() as DivElementRef;
  const { isAuthorize } = useUI();
  const { t } = useTranslation("common");
  addActiveScroll(navbarRef);

  const [category, setCategory] = useState(false);


  return (

    <header ref={navbarRef} className="site-header h-14 md:h-16 lg:h-22">
      <nav className="h-14 md:h-16 lg:h-22 fixed w-full z-50 bg-light shadow-sm py-5 px-4 lg:px-5 xl:px-8 flex justify-between items-center">
       
      <div className='flex items-center justify-between w-full space-x-8'> 
       
        <div className='flex items-center '> 
            <Logo className="mx-auto lg:mx-0" /> 
            <h2 className='font-semibold text-lg '>{label}</h2>
        </div>

        <div className='block lg:hidden mr-8'> 
            {isAuthorize ? <AuthorizedMenu/> : <MobileJoinButton/>} 
        </div>
          {/* <div className='flex '>
              <button className=''>  </button>
          </div> */}

      </div> 

        <ul className="hidden lg:flex  items-center space-s-8">
          {isAuthorize ? (
            <li key="track-orders">

              <Link
                href={ROUTES.ORDERS}
                className="font-semibold text-heading flex items-center transition
                            duration-200 w-24 no-underline hover:text-accent focus:text-accent"
              >

                 { 'Track Order'}

              </Link>

            </li>
          ) : null}
          {siteSettings.headerLinks.map(({ href, label, icon }) => (
            <li key={`${href}${label}`}>
              <NavLink activeClassName="text-accent" href={href}>
                <a className="no-underline font-semibold flex items-center transition-colors duration-200 hover:text-accent focus:text-accent">
                  {icon && <span className="me-2">{icon}</span>}
                  {t(label)}
                </a>
              </NavLink>
            </li>
          ))}
          {isAuthorize ? (
            <li>
              <AuthorizedMenu />
            </li>
          ) : (
            <li>
              <JoinButton />
            </li>
          )}
        </ul>

      </nav>
    </header>
  );
};

export default Navbar;
