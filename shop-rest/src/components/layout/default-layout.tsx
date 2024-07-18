// import NavbarWithSearch from '@components/layout/navbar/navbar-with-search';
// import HeaderTop from '@components/home-page-header/HeaderTop';
import HeaderMiddle from '@components/home-page-header/HeaderMiddle';
// import Footer from '@components/footer/Footer';
import { useEffect,useState } from 'react';
import dynamic from 'next/dynamic';
import MobileNavigation from './mobile-navigation';
import { useRouter } from 'next/router';
import { useLocation } from '@contexts/location/location.context';
// import { useShopAvailabilityQuery } from '@data/home/use-shop-availability-query';
 

const Footer = dynamic(() => import('@components/footer/Footer'),
 { ssr: false });

const DefaultLayout: React.FC = ({ children }) => {

  const router = useRouter();
  const {getLocation} =useLocation()

  // const {
  //   data,
  //   isLoading: loading,
  //   isFetchingNextPage,
  //   fetchNextPage,
  //   hasNextPage,
  //   error,
  // } = useShopAvailabilityQuery({
  //   limit: 16 as number,
  //   search:"",
  //   location : ((getLocation?.formattedAddress) ? JSON.stringify(getLocation):null ) as any
  // });

  // const shop_check = data?.ShopAvailability?.data?.check;

  // function useScrollDirection() {
    
  //   const [scrollDirection, setScrollDirection] = useState(null);
 
  //   useEffect(() => {
  //     let lastScrollY = typeof window !== "undefined" ?  window.pageYOffset : '';
  
  //     const updateScrollDirection = () => {
  //       const scrollY = window.pageYOffset;
  //       const direction = scrollY > lastScrollY ? "down" : "up";
  //       if (direction !== scrollDirection && (scrollY - lastScrollY > 5 || scrollY - lastScrollY < -5)) {
  //         setScrollDirection(direction);
  //       }
  //       lastScrollY = scrollY > 0 ? scrollY : 0;
  //     };
      
  //     window.addEventListener("scroll", updateScrollDirection); // add event listener
  //     return () => {
  //       window.removeEventListener("scroll", updateScrollDirection); // clean up
  //     }
  //   }, [scrollDirection]);
  
  //   return scrollDirection;
  // };
  
  // const scrollDirection = useScrollDirection();

  // console.log('router', router)

  return (
       
    // <div className="relative flex flex-col  transition-colors duration-150">
    //     {/* <HeaderTop/>  */}
    //   <div className={` sticky ${ scrollDirection === "down" ? "-top-44" : "top-0"}   transition-all duration-500 sticky z-50 bg-white top-0`}> 
    //   { shop_check == 0 ? <HeaderMiddle searchbar={false}  />  : router?.asPath == '/shops/retail-store' ? null : <HeaderMiddle searchbar={true} />  }
    //   </div>
    //   <div>{children}</div>
    //   { router?.pathname == '/salon-near-me' || router?.pathname == '/find-people' || router?.asPath == '/shops/retail-store' ? null : <MobileNavigation /> }
    //   {/* { router?.pathname == '/salon-near-me' || router?.asPath == '/shops/retail-store' ? null : <Footer/> } */}
      <div>hi</div>
    // </div>

  );
};

export default DefaultLayout;
