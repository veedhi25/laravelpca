import { ArrowNext, ArrowPrev } from "@components/icons";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslation } from "next-i18next";
import "swiper/swiper-bundle.css";
// dummy data
import { fetchShops, Salon } from "useSalonShopsQuerydata/shop/use-search-shop-query";
import { useLocation } from "@contexts/location/location.context";
import { useRouter } from "next/router";
import { Fragment, useEffect, useRef, useState } from "react";
import { ROUTES } from "@utils/routes";
import Link from 'next/link';
import { CheckMarkFill } from "@components/icons/checkmark-circle-fill";
import { useSalonShopsQuery } from "@data/shop/use-search-salon-shop.query";
import Spinner from "@components/ui/loaders/spinner/spinner";
 
const data = [

  {
    id: 3,
    title: "banner:promotion-slide-three",
    bannerUrl: "/ad-banner/sevensky.jpg",
  },
  {
    id: 8,
    title: "banner:promotion-slide-eight",
    bannerUrl: "/ad-banner/fly.jpg",
  },
  {
    id: 18,
    title: "banner:promotion-slide-eight",
    bannerUrl: "/ad-banner/hanif.jpg",
  },
  {
    id: 48,
    title: "banner:promotion-slide-eight",
    bannerUrl: "/ad-banner/ki-ka.jpg",
  },
  {
    id: 9,
    title: "banner:promotion-slide-nine",
    bannerUrl: "/ad-banner/2.jpeg",
  },
  {
    id: 10,
    title: "banner:promotion-slide-ten",
    bannerUrl: "/ad-banner/4.jpeg",
  },
  {
    id: 11,
    title: "banner:promotion-slide-eleven",
    bannerUrl: "/ad-banner/11.jpeg",
  },
  {
    id: 1,
    title: "banner:promotion-slide-one",
    bannerUrl: "/ad-banner/1.jpeg",
  },
  {
    id: 2,
    title: "banner:promotion-slide-two",
    bannerUrl: "/ad-banner/9.jpeg",
  },
  
  {
    id: 5,
    title: "banner:promotion-slide-five",
    bannerUrl: "/ad-banner/5.jpeg",
  },
  {
    id: 6,
    title: "banner:promotion-slide-six",
    bannerUrl: "/ad-banner/6.jpeg",
  },
  {
    id: 7,
    title: "banner:promotion-slide-seven",
    bannerUrl: "/ad-banner/7.jpeg",
  },
  {
    id: 4,
    title: "banner:promotion-slide-four",
    bannerUrl: "/ad-banner/10.jpeg",
  },
 
];

const offerSliderBreakpoints = {
  240: {
    slidesPerView: 3,
    spaceBetween: 16,
  },
  320: {
    slidesPerView: 3,
    spaceBetween: 5,
  },
  580: {
    slidesPerView: 4,
    spaceBetween: 4,
  },
  1024: {
    slidesPerView: 6,
    spaceBetween: 2,
  },
  1920: {
    slidesPerView: 6,
    spaceBetween: 10,
  },
};


SwiperCore.use([Navigation]);

export default function PromotionSlider(props:any) {

  const {selectedShop, offer, handleShopImages} = props;

  // console.log('shops',props)

  const [loading,setLoading] = useState(false);

  const [shopName, setShopName] = useState(null);
 
  // useEffect(() => {
  //        setLoading(true)
  // }, [props.offer])
 
  const router = useRouter();
  const { t } = useTranslation();
  const {getLocation} = useLocation();


  const { data: shopData, isLoading } = useSalonShopsQuery({
    // category:props?.shopCategory,
    limit:3000000,
    location:((getLocation?.formattedAddress)?JSON.stringify(getLocation):null ) as any,
    is_active:1,
    price: props?.offer?.sale_price,
    // page:1,
    search:getSearch()
  },  
  {
    enabled: !!props?.offer 
  }
  );

  function handleSelect(data:any) {
    const shopList = shopData?.pages;
    console.log('prop',data)
    setShopName(data?.name)
    // handleShopImages(false)
    props.selectedShop(data)
    // props.allShops(shopList)
    // console.log('shop',data?.offer?.name)
  }

  console.log(shopName)

  useEffect(()=>{
      handleShopImages(false);
  },[shopName])


  function getSearch():string {
    
    const { query } = useRouter();
    
    if(props?.offer?.name){
      return props?.offer?.name  as string
    }
    return "";
  }

   
   console.log('pages',props?.shopCategory)



  
  console.log('slider shops',shopData)

  function setShopImages(){
    handleShopImages(true)
  }

  return (

    <> { isLoading ? <div className="w-full h-4"> <Spinner/></div> :
    <div className=" px-2 md:px-5 xl:px-4">

    {/* <button onClick={downloadLogos}>
         Download All
        </button> */}

      <div className="">

        {/* <Swiper
          id="offer"
          // loop={true}
          breakpoints={offerSliderBreakpoints}
          navigation={{
            nextEl: ".next",
            prevEl: ".prev",
          }}
        > */}
          {shopData?.pages?.map((page, idx) => {
              return (
                <div className='w-full h-full grid grid-cols-3 lg:grid-cols-6' key={idx}>
                  {page?.data?.filter((shop) =>  shop?.is_active === 1).map((shop: any) => (
            // <SwiperSlide key={shop}>
            <div className="relative h-full " >
              {/* <Link href={`${ROUTES.SHOPS}/${shop.slug}`}> */}
                <div   className={` ${shop?.name === shopName ? '' : '' }  border py-1 w-34 sm:w-54 md:w-54 lg:w-38 xl:w-60 h-full rounded hover:border-gray-400 cursor-pointer border-gray-100 flex hover:shadow-lg flex-col items-center `}>
                  
                  <CheckMarkFill width={30} className={` ${shop?.name === shopName? 'block' : 'hidden'} absolute z-40 right-0 md:right-10 top-0 me-2 bg-white rounded-full text-green-600`} />
                  <img onClick={()=>handleSelect(shop)}
                   className="relative w-24 cursor-pointer object-contain rounded h-24 lg:h-36    lg:w-36 "
                   src={shop?.logo?.thumbnail}
                   alt={t(shop?.name)}
                  />

                  <span className = "flex flex-col text-xs lg:text-sm  mt-2 h-28 text-center font-semibold">
                    <p className="h-10 text-md ">{shop?.name}</p>
                    <p className="h-5 mt-2 text-gray-700 font-light"> 
                    {/* {shop?.name?.includes(shop?.settings?.location?.sector) ? '' : shop?.settings?.location?.sector} */}
                       {shop?.address?.sector}
                    </p>
                    <p className ="text-xs h-10 text-center font-semibold text-gray-800 tracking-widest">
                    {/* {shop?.name?.includes(shop?.settings?.location?.city) ? '' : shop?.settings?.location?.city} */}
                     {(shop?.address?.city)}
                    </p>
                    <span className={` ${shopName == shop?.name ? 'flex' : 'hidden'}   flex-col space-y-2`}>
                      <p onClick={()=>handleShopImages(true)} 
                       className="cursor-pointer text-blue-600 active:text-blue-800 ">
                        View Images
                        </p>
                        <p className="cursor-pointer text-red-700 active:text-red-900">
                        <Link href={`/shops/${shop.slug}`} as={`/shops/${shop.slug}`}>
                            <a target="_blank" rel="noopener noreferrer">Visit Salon</a>
                        </Link>
                      </p>
                    </span>
                  </span>
                   
                </div>
              {/* </Link> */}
              </div>
            // </SwiperSlide>
             ))}
             </div>
           );
           })}
         
        {/* </Swiper> */}
        {/* <div
          className="prev cursor-pointer bg-gold absolute text-white top-2/4 -start-2 md:-start-5 z-10 -mt-4 md:-mt-5 w-8 h-8 md:w-9 md:h-9 rounded-full bg-light shadow-xl border border-border-200  flex items-center justify-center text-heading transition-all duration-200 hover:bg-accent hover:text-light hover:border-accent"
          role="button"
        >
          <span className="sr-only">{t("common:text-previous")}</span>
          <ArrowPrev width={24} height={24} />
        </div>
        <div
          className="next cursor-pointer bg-gold  text-white absolute top-2/4 -end-2 md:-end-5 z-10 -mt-4 md:-mt-5 w-8 h-8 md:w-9 md:h-9 rounded-full bg-light shadow-xl border border-border-200  flex items-center justify-center text-heading transition-all duration-200 hover:bg-accent hover:text-light hover:border-accent"
          role="button"
        >
          <span className="sr-only">{t("common:text-next")}</span>
          <ArrowNext width={24} height={24} />
        </div> */}
      </div>
    </div>
}
    </>
  );
}
