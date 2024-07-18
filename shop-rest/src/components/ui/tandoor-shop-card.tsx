
import Image from "next/image";
import { MapPin } from "@components/icons/map-pin";
import { useTranslation } from "next-i18next";
import { formatAddress } from "@utils/format-address";
import { ROUTES } from "@utils/routes";
import Link from "./link";
import isEmpty from "lodash/isEmpty";
import Avatar from 'react-avatar';

type ShopCardProps = {
  shop: any;
};

const imageCheck = (logo: any , record:any, imgsize:any, imgDim:any, classname: string) => {
  // console.log(logo)
  let check = false;
  let splitLength = logo.split("/").length;
  let lastSplit = logo.split("/")[splitLength - 1];
  if (lastSplit != "") {
    check = true;
  }
  return (check ? <img src={logo} alt={record?.name} style={{ objectFit: "contain" }} className={classname} />:<Avatar name={record?.name} size={imgsize} round={imgDim}  />);
};

const TandoorShopCard: React.FC<ShopCardProps> = ({ shop }) => {

  const { t } = useTranslation();

  const isNew = false;

  return (

    <Link href={`${ROUTES.SHOPS}/${shop.slug}`}>
        {/* <div className='flex flex-col w-68 h-80 xs+:w-62 xs+:h-80 xs++:w-44 xs++:h-96 sm:w-36 sm:h-96  md:w-60 md:h-72  md+:w-56 md+:h-96 md++:w-64 md++:h-96 lg:w-54 lg:h-96 
                        lg+:w-52 lg+:h-96 xs+:h-500  xl:w-58 xl+:w-52 xl+:h-800 xl++:w-60 xl++:h-96  2xl:w-96 2xl:h-96 border rounded-xl
                        bg-white shadow-md p-6 py-6 mx-1 my-2  cursor-pointer' > */}


                          <div className='flex p-4 px-2 rounded-lg bg-white flex-col w-auto shadow-md hover:shadow-lg h-auto'>

         <div className='h-1/2 w-full'>
            {imageCheck(shop?.logo?.thumbnail, shop, '190', false,'h-48 w-full object-contain')}
    
          </div> 

              <div className='flex flex-col space-y-1 mt-8
                              justify-evenly h-52  md:h-auto xl:h-auto 2xl:h-auto' >

                      <div className='flex justify-between mx-2  h-10  '> 

                       
                          <h4 className='font-semibold text-xs mx-3 w-2/3 sm:text-xs md:text-sm  '> {shop?.name} </h4>
                          <h4 className='text-green-600 text-xs lg:text-md  font-bold'> Open </h4>
                   

                      </div>


                       <div className='h-20  '> 

                              <h5 className='text-xs text-body flex'>
                              
                                <MapPin className="w-3.5 h-3.5 me-1 text-muted flex-shrink-0" />
                                {!isEmpty(formatAddress(shop?.address))
                                  ? formatAddress(shop?.address)
                                  : t("common:No Address")}  
                              view
                               </h5>
                          </div> 
                          <button className='bg-gradient-to-r shadow-md mx-4 from-magenta rounded-sm to-gold hover:from-gold hover:to-magenta focus:from-pink-500 focus:to-yellow-500  text-xs lg:text-sm  mb- mt-10 py-1 px-0 text-white '> 
                              Products and offers
                      </button> 


                          

              </div>

                     
          
        </div>
      </Link>
  );
};

export default TandoorShopCard;
