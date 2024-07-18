
import SearchBox from "@components/ui/search-box";
import { useSearch } from "@contexts/search.context";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
 import { useEffect, useState } from "react";


interface Props {
  label: string;
  [key: string]: unknown;
}

function getWindowDimensions() {
  // window is not defined
  if (typeof window === "undefined") {
    return {
      width: 0,
      height: 0,
    };
  }

  const { innerWidth: width, innerHeight: height } = window   ;
  return {
    width,
    height
  };
}

export  function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  
  return windowDimensions;
}




const Search: React.FC<Props> = ({ label, ...props }) => {

  const slug = ['chandigarh-grocery-store', 'kosmetics-india'];
  const slug2 = ['salon-page', 'salon-products']

  const { height, width } = useWindowDimensions();

  const { t } = useTranslation();
  const router = useRouter();
  const { searchTerm, updateSearchTerm } = useSearch();
  
  const handleOnChange = (e: any) => {
    const { value } = e.target;
    updateSearchTerm(value);
  };

  const { pathname, query } = router;

  //allow suggestions while typing
  const handleOnKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      router.push(`/search?q=${searchTerm}`);
    }
  };


 

  const [pageURL, setPageUrl] = useState('');


  useEffect(() => {
    setPageUrl(window.location.href)
  }, []);


  const scrollToProduct = () => {
    const element = document.getElementById("product-feed");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  

  const onSearch = (e: any) => {
    
    e.preventDefault();
    scrollToProduct();

    if (!searchTerm) return;
    const { pathname, query } = router;
    const { type, ...rest } = query;
    //scroll down to product feed on lg screens
    // if (type === "shop") {
    //   window.scrollTo({
    //     top: document.querySelector(".product-feed")?.offsetTop,
    //     behavior: "smooth",
    //   });
    // }

    { width < 976 ?
      ( slug?.some(el => pageURL.includes(el)) ?   window.scrollTo(0, 150) : 
       window.scrollTo(0, 620) ) : 
       ( slug?.some(el => pageURL.includes(el)) ?   window.scrollTo(0, 570) :
       slug2?.some(el => pageURL.includes(el)) ?   window.scrollTo(0, 0) :
       window.scrollTo(0, 560) )
    };

    // console.log('pathname', pathname)

  { pathname !== '/salon-page' ? router.push(
      {
        // pathname,
        query: { ...rest, text: searchTerm, category: null },
      },
      {
        pathname: type ? `/${type}` : '',
        query: { ...rest, text: searchTerm, category: null },
      },
      {
        scroll: false,
      }
    )    :   router.push(
     
      {
        pathname: '/salon-products',
        query: { ...rest, text: searchTerm, category: null },
      },
     
      )
  }
  };

  function clearSearch() {

    updateSearchTerm("");

    const { pathname, query } = router;
    const { type, text, ...rest } = query;
 
    { width < 976 ?
      ( slug.some(el => pageURL.includes(el)) ?   window.scrollTo(0, 150) : 
       window.scrollTo(0, 620) ) : 
       ( slug.some(el => pageURL.includes(el)) ?   window.scrollTo(0, 570) :
       slug2?.some(el => pageURL.includes(el)) ?   window.scrollTo(0, 0) :
       window.scrollTo(0, 560) )
    };

    // console.log('pathname',pathname);
    // console.log('query',query);
    // console.log('url',query.slug)

    if (text) {
      router.push(
        {
          query: { ...rest, category: pathname === '/salon-products' ? 'menicure-pedicure' : null},
          
         },
       


        {
          // pathname: type ? `/${type}` : pathname,
          query: { ...rest },
       
        },
        {
          scroll: false,
        }
      );
    }
  }

  // console.log('width',width);

  return (

    <SearchBox
      label={label}
      onSubmit={onSearch}
      onClearSearch={clearSearch}
      onChange={handleOnChange}
      value={searchTerm}
      name="search"
      placeholder={'Search Products'}
      {...props}
    />

  );
};

export default Search;
