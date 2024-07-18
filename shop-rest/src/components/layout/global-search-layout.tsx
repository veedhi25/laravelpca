// import NavbarWithSearch from '@components/layout/navbar/navbar-with-search';
// import HeaderTop from '@components/home-page-header/HeaderTop';
import HeaderMiddle from '@components/home-page-header/HeaderMiddle';
import Footer from '@components/footer/Footer';
import { useEffect,useState } from 'react';
import DropDown from '@components/ui/dropDown';
import { Logo } from '..';
import MobileJoinButton from './navbar/mobile-join-button';
// import Footer from '@components/footer/Footer';
import { useUI } from '@contexts/ui.context';
import JoinButton from '@components/layout/navbar/join-button';
import AuthorizedMenu from './navbar/authorized-menu';
import { useWindowSize } from 'react-use';

const GlobalSearchLayout: React.FC = ({ children }) => {


  const { isAuthorize, displayHeaderSearch, displayMobileSearch } = useUI();
  const { width } = useWindowSize();
  function useScrollDirection() {
    const [scrollDirection, setScrollDirection] = useState(null);
    //window dimensions
     
    useEffect(() => {
      
      
      let lastScrollY = typeof window !== "undefined" ?  window.pageYOffset : '';
  
      const updateScrollDirection = () => {
        const scrollY = window.pageYOffset;
        const direction = scrollY > lastScrollY ? "down" : "up";
        if (direction !== scrollDirection && (scrollY - lastScrollY > 5 || scrollY - lastScrollY < -5)) {
          setScrollDirection(direction);
        }
        lastScrollY = scrollY > 0 ? scrollY : 0;
      };
      window.addEventListener("scroll", updateScrollDirection); // add event listener
      return () => {
        window.removeEventListener("scroll", updateScrollDirection); // clean up
      }
    }, [scrollDirection]);
  
    return scrollDirection;
  };
  
  const scrollDirection = useScrollDirection();

  return (
       
    <div className="relative flex flex-col transition-colors duration-150">
        {/* <HeaderTop/>  */}
       <div className={` sticky ${ scrollDirection === "down" ? "-top-44" : "top-0"}   transition-all duration-500 sticky z-50 bg-white top-0`}> 
       <div className='flex items-center space-x-4 lg:space-x-96 p-2  px-2 lg:px-10 justify-evenly'>
        <Logo />
       <DropDown/>
       { isAuthorize &&  <AuthorizedMenu/>   }
       { !isAuthorize && (width < 768 ?  <MobileJoinButton/> : <JoinButton/> )  }
       </div>  </div>
            <div>{children}</div>
            <Footer/>
    </div>
  );
};

export default GlobalSearchLayout;
