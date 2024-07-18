import { ArrowNext, ArrowPrev } from "@components/icons";
import SwiperCore, { Navigation, SwiperOptions } from "swiper";
import { Swiper, SwiperSlide  } from "swiper/react";
import { useTranslation } from "next-i18next";
import "swiper/swiper-bundle.css";
// dummy data
import { fetchShops, useShopsQuery } from "@data/shop/use-search-shop-query";
import { useLocation } from "@contexts/location/location.context";
import { useRouter } from "next/router";
import { Fragment, useRef, useState } from "react";
import { ROUTES } from "@utils/routes";
import Link from 'next/link';
import { useIsRTL } from "@utils/locals";
import { useProductsQuery } from "@data/product/use-products.query";
import Argon from "@components/product/product-card/argon";
import { MotionConfig } from "framer-motion";
import { motion } from "framer-motion";
import Neon2 from "@components/product/product-card/neon2";
import Neon from "@components/product/product-card/neon";
import OfferCard from "@components/product/product-card/offer-card";


 

const offerSliderBreakpoints = {
  240: {
    slidesPerView: 3,
    spaceBetween: 16,
  },
  320: {
    slidesPerView: 4,
    spaceBetween: 5,
  },
  580: {
    slidesPerView: 6,
    spaceBetween: 2,
  },
  1024: {
    slidesPerView: 7,
    spaceBetween: 4,
  },
  1920: {
    slidesPerView: 6,
    spaceBetween: 10,
  },
};


SwiperCore.use([Navigation]);

export default function PromotionSlider({shopId, data,text,category}) {

  const router = useRouter();
  const { t } = useTranslation();
  const {getLocation} = useLocation()
  const { isRTL } = useIsRTL();

  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);
 

  function getSearch():string{
    
    const { query } = useRouter();
    
    if(query.text){
      return query.text as string
    }
    return "";
  }

   

  return (

    <div className="w-full px-2 md:px-5 xl:px-4">
      <div className="w-full relative">
        <Swiper
          id="offer"
          // loop={true}
          breakpoints={offerSliderBreakpoints}
          modules={[Navigation]}
          navigation={{
            nextEl,
            prevEl,
            disabledClass: 'swiper-button-disabled',
            hiddenClass: 'swiper-button-hidden',
          }}
        >
          {data?.data?.filter(product => product?.status === 'publish').map((product, idx) => (
              product?.is_brand_offer !== 1 ? 
             <Fragment key={idx}>
                              
                <SwiperSlide key={idx}>
                  {/* <motion.div key={product.id}> */}
                    <div className="w-auto lg:w-full">   
                     <Argon shop={data?.shop} product={product} /> 
                    </div>
                  {/* </motion.div> */}
                </SwiperSlide>
                
              </Fragment> : 
              <OfferCard product={product} productSlug={product.slug} />
          ))}
         
        </Swiper>
        <div
         ref={(node) => setPrevEl(node)}
         className="offer cursor-pointer   absolute   top-2/4 -start-2 md:-start-5 z-10 -mt-4 md:-mt-5 w-8 h-8 md:w-16 md:h-16 rounded-full bg-light shadow-xl border border-border-200  flex items-center justify-center text-heading transition-all duration-200 hover:bg-accent hover:text-light hover:border-accent"
         role="button"
        >
          <span className="sr-only">{t("common:text-previous")}</span>
          <ArrowPrev width={24} height={24} />
        </div>
        <div
         ref={(node) => setNextEl(node)}
          className="offer cursor-pointer absolute top-2/4 -end-2 md:-end-5 z-10 -mt-4 md:-mt-5 w-8 h-8 md:w-16 md:h-16 rounded-full bg-light shadow-xl border border-border-200  flex items-center justify-center text-heading transition-all duration-200 hover:bg-accent hover:text-light hover:border-accent"
          role="button"
        >
          <span className="sr-only">{t("common:text-next")}</span>
          <ArrowNext width={24} height={24} />
        </div>
      </div>
    </div>
  );
}
