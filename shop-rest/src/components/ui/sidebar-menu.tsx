
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import cn from "classnames";
import { ExpandLessIcon } from "@components/icons/expand-less-icon";
import { ExpandMoreIcon } from "@components/icons/expand-more-icon";
import { getIcon } from "@utils/get-icon";
import * as CategoryIcons from "@components/icons/category";
import { useUI } from "@contexts/ui.context";
import { useEffect, useState } from "react";
import { useModalAction, useModalState } from "./modal/modal.context";
import { useCategoriesQuery } from "@data/category/use-categories.query";
import { useWindowDimensions } from "@components/common/search";
import Image from "next/image";


export function SidebarMenuItem({ className, item, depth = 0 }: any) {

   const { height, width } = useWindowDimensions();

  const router = useRouter();
  
  const active = router?.query?.category;

  const isActive =
    active === item.slug ||
    item?.children?.some((_item: any) => _item.slug === active);

  const [isOpen, setOpen] = useState<boolean>(isActive);
  const [pageURL, setPageUrl] = useState('');

  useEffect(() => {
    setOpen(isActive);
    setPageUrl(window.location.href)
  }, [isActive]);


  // console.log('url',pageURL)

  
  const { pathname, query } = router;



  const {
    data : categoryData,
    isLoading: loading,
    error,
  } = useCategoriesQuery({
    type: query.slug as string,
  });

  const { slug, name, children: items, icon } = item;
  const { displaySidebar, closeSidebar } = useUI();

  function toggleCollapse() {
    setOpen((prevValue) => !prevValue);
  }

  // // console.log(' product item', item)
  

  const { closeModal } = useModalAction();

  const shop_slug = ['chandigarh-grocery-store', 'kosmetics-india'];
  

  function onClick() {
   
    const { pathname, query } = router;

    const navigate = () =>
    // setOpen(false);
   displaySidebar && closeSidebar();

   { width < 976 ?
    ( shop_slug?.some(el => pageURL.includes(el)) ?   window.scrollTo(0, 150) : 
     window.scrollTo(0, 620) ) : 
     ( shop_slug?.some(el => pageURL.includes(el)) ?   window.scrollTo(0, 570) :
     window.scrollTo(0, 550) )
  };
    
      router.push(
        {
          pathname,
          query: { ...query, category: slug , text: null || null },
          
        },
       
        undefined,
        {
          scroll: false,
        }
      );

    if (Array.isArray(items) && !!items.length) {

      toggleCollapse();
      navigate();

      displaySidebar && closeSidebar()
    } else {
     
      navigate();
      closeSidebar();
    }
  }

    let expandIcon;
    if (Array.isArray(items) && items.length) {
    
      expandIcon = !isOpen ? (
        <ExpandLessIcon className="w-4 h-4" />
        
      ) : (
        <ExpandMoreIcon className="w-4 h-4" />
      );
    }

    

    // // console.log('sidebar menu data', categoryData)

  return (

    <>

      {/* <div 
        // initial={false}
        // animate={{ backgroundColor: "black" }}/
        onClick={onClick}
        className="grid grid-cols-1 items-center w-auto relative"
      > */}
        
        {/* <div className='flex items-center justify-between'> */}
          <button
          onClick={onClick}
              className={cn(
                "w-full border-b h-16 min-h-16 max-h-20",
                isOpen ? "text-blue-700 font-semibold tracking-wide   transition duration-800 ease-in-out" : "text-body-dark",
                className ? className : "text-sm"
              )}
            >
            {/* <button className=""> */}
            {/* <div className='relative py-2 flex flex-col mx-auto h-auto  w-auto   px-2  place-items-center lg:grid-cols-2    items-center'> */}
                  {/* { item?.image.id ? (
                    <span className="flex text-center w-auto h-auto items-center justify-center">
                        { pageURL.includes('kosmetics-india')  ? 
                        <Image 
                          quality='100'
                          priority={true}
                          src={item?.image?.thumbnail}
                          alt={item?.image?.altText}
                          width={115}
                          height={115}
                          layout="intrinsic"
                          objectFit="cover" 
                          // className={` ${pageURL.includes('kosmetics-india') ? 'object-contain' : 'h-16 w-16 object-contain rounded-full'}  `}
                          />
                        :
                        <Image 
                           priority={true} 
                          quality='40'
                          src={item?.image?.thumbnail}
                          alt={item?.image?.altText}
                          width={70}
                          height={70}
                          layout="intrinsic"
                          objectFit="cover" 
                          // className={` ${pageURL.includes('kosmetics-india') ? 'object-contain' : 'h-16 w-16 object-contain rounded-full'}  `} 
                          />
                        }
                    </span>
                  ) :
                    <span className="flex  text-center  w-full items-center justify-center">
                      {getIcon({
                        iconList: CategoryIcons,
                        iconName: icon,
                        className: " w-6 h-6 lg:h-8 lg:w-8",
                      })}
                    </span>
                  } */}
                  
                  <div className="flex  text-center">
                    <span className={` ${pageURL.includes('kosmetics-india')   ?  'hidden' :'block' } hidden lg:block text-10px lg:text-xs   mx-auto h-10 mt-5 rounded whitespace-wrap lg:whitespace-nowrap text-center`}>
                      {name}
                      {/* {name} */}
                    </span>
                    <span className='block mt-3 lg:hidden text-10px lg:text-xl w-full whitespace-wrap lg:whitespace-wrap text-center'>
                      {/* { pageURL.includes('kosmetics-india')   ?  null : name } */}
                      {name}
                    </span>
                    {/* <span className="block lg:hidden text-center ">{expandIcon}</span> */}
                  </div>
                  
            {/* </div> */}

          </button>
        {/* </div> */}

      {/* </div> */}

    {/* <div style={{zIndex:1000000}} className="text-lg">
      <AnimatePresence initial={false}>
        {Array.isArray(items) && isOpen ? (
          <li className='  z-50' style={{zIndex: 100000}}>
            <motion.ul
              key="content"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: "auto" },
                collapsed: { opacity: 0, height: 0 },
              }}
              // transition={{ duration: 1, ease: [0.6, 0.1,0.1, 1.3] }}
              style={{zIndex: 10000}}  className="static lg:absolute text-xs z-100  bg-light text-left lg:text-center border-b
                                                  lg:top-16  w-auto  lg:px-auto lg:shadow-lg  text-light"
            >
              {items?.map((currentItem) => {
                const childDepth = depth + 1;

                return (

                  <SidebarMenuItem
                    key={`${currentItem.name}${currentItem.slug}`}
                    item={currentItem}
                    depth={childDepth}
                    className={cn("text-sm lg:text-lg text-body ")}
                  />
                );
              })}
            </motion.ul>
          </li>
        ) : null}
       </AnimatePresence>
      </div> */}
    </>
  );
}

function SidebarMenu({ items, className }: any) {
  // const router = useRouter();
  // const { pathname, query } = router;

  return (
    <>

    {/* web */}
      <ul  className='hidden lg:flex  lg:justify-evenly xl:justify-evenly 
                     w-full items-center'>
      {/* <ul className={cn("text-xs", className)}> */}
        {items?.map((item: any) => (
         <a>
           <SidebarMenuItem key={`${item.name}${item.slug}`} item={item} />
          </a>
        ))}
        
      </ul>

      {/* mobile */}
      <ul className='flex flex-col lg:hidden justify-between 
                      overflow-x-hidden  mb-24'>
      {/* <ul className={cn("text-xs", className)}> */}
        {items?.map((item: any) => (
        <a> 
        <SidebarMenuItem key={`${item.name}${item.slug}`} item={item} />
        </a> 
        ))}

      </ul>
    </>
  );
}

export default SidebarMenu;
