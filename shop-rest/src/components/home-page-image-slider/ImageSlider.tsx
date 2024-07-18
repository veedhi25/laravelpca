
import Slider from "react-slick";

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/router";
import { useLocation } from "@contexts/location/location.context";

export default function ImageSlider() {

  const router = useRouter();
  const { query } = useRouter();
  const {getLocation} =useLocation();

  const address =   getLocation?.formattedAddress || "chandigarh";

  function location(){
    return address?.includes('Mohali') || address?.includes('Chandigarh') || address.includes('Panchkula') ;
}


    function getLink(category:String){

      var pathname="/"+router.locale+"/shops?category="+category.replace("&","-");
      

      return pathname;
      
    }

    function getLinkGrocery(){

      var pathname="/shops/chandigarh-grocery-store";
      return pathname;
    }

    function getLinkKosmetics(){
      var pathname="/shops/kosmetics-india";
       return pathname;
    }


    function getLinkSalon(){
      var pathname="/salon-page";
       return pathname;
    }

    var settings = {

      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      autoplay: true,
      slidesToScroll: 1,
      arrows: false,
     
     

      // responsive: [
      //   {
      //     breakpoint: 320,
      //     settings: { slidesToShow: 1, slidesToScroll: 1, infinite: false }
      //   },
      //   {
      //     breakpoint: 768,
      //     settings: { slidesToShow: 1, slidesToScroll: 1, infinite: false }
      //   },
      //   {
      //     breakpoint: 1024,
      //     settings: { slidesToShow: 1, slidesToScroll: 1, infinite: false }
      //   }
      // ]
    };

   
    

    return (


      <div className='mx-1'>
      
      <Slider {...settings}>

        <div className="card flex relative w-full h-40 lg:h-72 xl+:h-80 2xl:h-72 md:h-64 ">

            <img className="object-fill h-full w-full"
            //  className='rounded-md w-full opacity-90  h-40 lg:w-full lg:h-72 xl+:h-80 md:h-64  2xl:h-72 2xl:w-full space-x-9 object-fill object '  
                  src={'/banner/community.jpg'} 
                  />

          </div>


        <div className="card flex relative w-full h-40 lg:h-72 xl+:h-80 2xl:h-72 md:h-64 ">

            <img className="object-fill h-full w-full"
            //  className='rounded-md w-full opacity-90  h-40 lg:w-full lg:h-72 xl+:h-80 md:h-64  2xl:h-72 2xl:w-full space-x-9 object-fill object '  
                  src={'/banner/shop-community.jpg'} 
                  />

          </div>

            <div className=' cursor-pointer card  relative w-full h-40 lg:h-72 xl+:h-80 2xl:h-72 md:h-64'>

            <Link  
              href={ location() ?  getLinkSalon() : getLink('salon spa')}>
              <picture className="w-full h-full" >
                  <source media="(max-width: 1023px)" style={{objectFit:'cover'}} srcset="/banner/salon-mb.jpg"/>
                  <source media="(min-width: 1024px)" style={{objectFit:'contain'}} srcset="/banner/salon-web.jpg"/>
                  <img src="/ad-banner.jpg" style={{height:'100%', width:'100%'}} alt="best salon offers"/>
              </picture></Link>

          </div>


         <div className=' cursor-pointer card  relative w-full h-40 lg:h-72 xl+:h-80 2xl:h-72 md:h-64'>

            <Link  
              href={ location() ?  getLinkKosmetics() : getLink('cosmetics')}>
              <picture className="w-full h-full" >
                  <source media="(max-width: 1023px)" style={{objectFit:'cover'}} srcset="/banner/kosmetic-mob.jpg"/>
                  <source media="(min-width: 1024px)" style={{objectFit:'contain'}} srcset="/banner/kosmetic-web.jpg"/>
                  <img src="/ad-banner.jpg" style={{height:'100%', width:'100%'}} alt="best salon offers"/>
              </picture></Link>

          </div>


          <div className=' cursor-pointer card  relative w-full h-40 lg:h-72 xl+:h-80 2xl:h-72 md:h-64'>

            <Link  
              href={ location() ?  getLinkGrocery() : getLink('groceries')}>
              <picture className="w-full h-full" >
                  <source media="(max-width: 1023px)" style={{objectFit:'contain'}} srcset="/banner/online-grocery.jpg"/>
                  <source media="(min-width: 1024px)" style={{objectFit:'contain'}} srcset="/banner/online-grocery-web.jpg"/>
                  <img src="/ad-banner.jpg" style={{height:'100%', width:'100%'}} alt="best salon offers"/>
              </picture></Link>

          </div>

        
            <div className="cursor-pointer flex card  relative w-full h-40 lg:h-72 xl+:h-80 2xl:h-72 md:h-64 ">

                <Link href='/appointment'><picture className="w-full h-full" >
                              <source media="(max-width: 1023px)" style={{objectFit:'fill'}} srcset="/ad-banner.jpg"/>
                              <source media="(min-width: 1024px)" style={{objectFit:'fill'}} srcset="/banner/salon-ad.jpg"/>
                              <img src="/ad-banner.jpg" style={{height:'100%', width:'100%'}} alt="best salon offers"/>
                        </picture></Link>
                    
            </div>

            {/* <div className="hidden cursor-pointer card  lg:block relative w-full h-40 lg:h-72 xl+:h-80 2xl:h-72 md:h-64 ">

                <Link href='/appointment'><img className="hidden lg:block lg:w-full lg:object-contain" 
               
                    src={'/banner/salon-ad.jpg'}
                    
                    /></Link>
                    
            </div> */}
        

          <div className="card flex relative w-full h-40 lg:h-72 xl+:h-80 2xl:h-72 md:h-64 ">

             < Image        quality='40' layout='fill' objectFit='fill'
            //  className='rounded-md w-full opacity-90  h-40 lg:w-full lg:h-72 xl+:h-80 md:h-64  2xl:h-72 2xl:w-full space-x-9 object-fill object '  
                  src={'/banner/electronics.jpg'} 
                  />

          </div>

          <div className="card flex relative w-full h-40 lg:h-72 xl+:h-80 2xl:h-72 md:h-64 ">

             < Image        quality='40' layout='fill' objectFit='fill'
          //  className='rounded-md  w-full  h-40 lg:w-full lg:h-72 xl+:h-80 md:h-64 2xl:h-72 2xl:w-full object-fill space-x-9 '   
              src={'/banner/grocery-offer.jpg'} 
              />

          </div>

          {/* <div className="card flex relative w-full h-40 lg:h-72 xl+:h-80 2xl:h-72 md:h-64 ">
            <img className="object-fill"
            //  className='rounded-md  w-full h-40 lg:w-full lg:h-72 xl+:h-80 md:h-64  2xl:h-72 2xl:w-full object-fill  space-x-9 '   
                  src={'/banner/salon.jpg'} 
                  />
          </div>  */}
    

          {/* <div className="card flex relative w-full h-40 lg:h-72 xl+:h-80 2xl:h-72 md:h-64 ">
               < Image        quality='40' layout='fill' objectFit='fill'
            //  className='rounded-md w-full h-40 lg:w-full lg:h-72 2xl:h-72 xl+:h-80 md:h-64 2xl:w-full object-fill  space-x-9 '   
                src={'/banner/pharma.jpg'} 
                />
          </div> */}
        

        
          <div className="card flex relative w-full h-40 lg:h-72 xl+:h-80 2xl:h-72 md:h-64 ">

               < Image        quality='40' layout='fill' objectFit='fill'
            //  className='rounded-md  w-full  h-40 lg:w-full lg:h-72 xl+:h-80 md:h-64 2xl:h-72 2xl:w-full object-fill space-x-9 '   
                src={'/banner/cosmetics.jpg'} 
                />

          </div>
        
        
         <div className="card flex relative w-full h-40 lg:h-72 xl+:h-80 2xl:h-72 md:h-64 ">

               < Image        quality='40' layout='fill' objectFit='fill'
            //  className='rounded-md  w-full  h-40 lg:w-full lg:h-72 xl+:h-80 md:h-64 2xl:h-72 2xl:w-full object-fill space-x-9 '   
                src={'/banner/restaurant.jpg'} 
                />

          </div>
        
          <div className="card flex relative w-full h-40 lg:h-72 xl+:h-80 2xl:h-72 md:h-64 ">

                 < Image        quality='40' layout='fill' objectFit='fill'
              //  className='rounded-md  w-full  h-40 lg:w-full lg:h-72 xl+:h-80 md:h-64 2xl:h-72 2xl:w-full object-fill space-x-9 '   
                  src={'/banner/pharma.jpg'} 
                  />

            </div>
      

        
          {/* <div className="card flex relative w-full h-40 lg:h-72 xl+:h-80 2xl:h-72 md:h-64 ">

               < Image        quality='40' layout='fill' objectFit='fill'
            //  className='rounded-md  w-full  h-40 lg:w-full lg:h-72 xl+:h-80 md:h-64 2xl:h-72 2xl:w-full object-fill space-x-9 '   
                src={'/banner/gym.jpg'} 
                />

          </div> */}
        

        
          {/* <div className="card flex relative w-full h-40 lg:h-72 xl+:h-80 2xl:h-72 md:h-64 ">

               < Image        quality='40' layout='fill' objectFit='fill'
            //  className='rounded-md  w-full  h-40 lg:w-full xl+:h-80 md:h-64 lg:h-72 2xl:h-72 2xl:w-full object-fill  space-x-9 '   
                src={'/banner/furniture.jpg'} 
                />

          </div> */}
      

        {/* <div>
          <div className="card flex relative w-full h-40 lg:h-72 xl+:h-80 2xl:h-72 md:h-64 ">

               < Image        quality='40' layout='fill' objectFit='fill'
            //  className='rounded-md  w-full  h-40 lg:w-full xl+:h-80 md:h-64 lg:h-72  2xl:h-full 2xl:w-full object-fill space-x-9 '   
                src={'/banner/hotel.jpg'} 
            />

          </div>
        </div> */}


       
       
      </Slider>
      </div>
    )
}

{/* <div className='' >

<Slider   className='mt-10' {...settings} >
     
        <img className="object-fill"
        //  className='rounded-md w-48 h-32 md:h-48 md:w-full lg:w-96  lg:h-48 space-x-9'  src={'/images/nearbuy-banner3.jpg'} 
             style={{objectFit:"fill"}}   />

           < Image        quality='40' layout='fill' objectFit='fill'
        //  className='rounded-md w-48 h-32 md:h-48 md:w-full lg:w-96 lg:h-48 space-x-9 '   src={'/images/nearbuy-banner1.jpg'} 
                 style={{objectFit:"fill"}}  />

           < Image        quality='40' layout='fill' objectFit='fill'
        //  className='rounded-md w-48 h-32 md:h-48 md:w-full lg:w-96 lg:h-48  space-x-9 '   src={'/images/nearbuy-banner1.jpg'} 
              style={{objectFit:"fill"}}  />
        
           < Image        quality='40' layout='fill' objectFit='fill'
        //  className='rounded-md w-48  h-32 md:h-48 md:w-full lg:w-96 lg:h-48 space-x-9 '    src={'/images/nearbuy-banner3.jpg'} 
                style={{objectFit:"fill"}}  />

</Slider>
</div> */}

// var settings = {
//   dots: true,
//   infinite: true,
//   speed: 500,
//   slidesToShow: 1,
//   slidesToScroll: 1,
//   autoplay: true,
//   centerMode: true,
//   centerPadding: '200px',
//   adaptiveHeight: true,
//   // variableWidth: true,
// };
