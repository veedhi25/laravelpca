import { useProductsQuery } from "@data/master-products/products.query";
import { useProductQuery } from "@data/master-products/master-product.query"
import ErrorMessage from "@components/ui/error-message"
import NotFound from "@components/common/not-found";
import Input from "@components/ui/input";
import Button from "@components/ui/button";
import { useEffect ,Fragment,useState , useRef,useCallback} from "react";
import useIntersectionObserver from "./useIntersectionObserver";
import Product from './product';
import Checkbox from "@components/ui/checkbox/checkbox";
import { PriceWalletIcon } from "@components/icons/shops/price-wallet";
import { useTaxQuery } from "@data/tax/use-all-taxes.query";


export type FeedType ={
  shopId:string,
  searchTerm:string,
  type:string,
  category:string,
  orderBy:string,
  sortedBy:any,
}
export default function ProductsFeed({shopId,searchTerm,type,category,orderBy,sortedBy}:FeedType) {
  const [page, setPage] = useState(1);
  const [masterProduct,setMasterProduct]=useState([])

  const {
    data:master,
  } = useProductQuery(shopId as string);
  const { data:taxes } = useTaxQuery();
  const {
    data,
    isFetchingNextPage,
    isFetching: loading,
    fetchNextPage,
    hasNextPage,
    isError,
    error,
  } = useProductsQuery(
    {
      text: searchTerm,
      limit: 10,
      shop_id: Number(shopId),
      type,
      category,
      orderBy,
      sortedBy,
      page,
    },
    {
      enabled: Boolean(shopId),
    }
  );
  useEffect(()=>{
    // console.log(master,'master');
    
  },[])

  function addProduct(id:number):any{
    const price = document.getElementById("price_"+id)?.nodeValue;
    const quantity = document.getElementById("quantity_"+id)?.nodeValue;
    // console.log(price,quantity)
    if(!(price&&quantity)){
      return ;
    }
    // console.log(price,quantity);
    // console.log(id);
  }

  // console.log('product', data?.pages.map((products, _idx) => (
  //   products
  // )))
    

  function handleLoadMore() {    
    // console.log("handleLoadMore");
    fetchNextPage();
  }
  const loadMoreRef = useRef()

  useIntersectionObserver({
        target: loadMoreRef,
        onIntersect: fetchNextPage,
        enabled: hasNextPage,
  })
  
  if (isError && error) return <ErrorMessage message={error?.message} />;

  if (!loading && !data?.pages?.length) {
    return (
      <div className="bg-gray-100 pt-6 pb-8 px-4 lg:p-8">
        <NotFound text="not found" className="w-7/12 mx-auto" />
      </div>
    );
  }

  return (
    <>
    <table className="">
      <thead className=" rc-table-thead">
          <tr className="">
              <th className="rc-table-cell w-auto text-xs lg:w-48 " >Image</th>
              <th title="Name" className="rc-table-cell w-auto text-xs lg:w-48 " >Name</th>
              <th className="rc-table-cell w-auto text-xs lg:w-48 " >Price</th>
              <th className="rc-table-cell w-auto text-xs lg:w-48 " >Sale Price</th>
              <th className="rc-table-cell w-auto text-xs lg:w-48 " >Quantity</th>
              
              {/* <th className="rc-table-cell w-auto text-xs lg:w-48 " >Tax</th> */}
              <th className="rc-table-cell w-auto text-xs lg:w-48 " >Actions</th>
          </tr>
      </thead>
      <tbody className="rc-table-tbody">
      {data?.pages.map((products, _idx) => (
          <Fragment key={_idx}>
            {products?.products?.data?.map((product:any,id:any) => (

              <Product taxes={taxes} 
                      product={product} 
                      shopId={shopId} key={id} 
                      masterIds={master} 
                      className={`${master?.includes(product?.id)} : "hidden" : ""`}
                />
            
            ))}
          </Fragment>
        ))}
      
      </tbody>
    </table>
      
      <div ref={loadMoreRef} className={`${!hasNextPage ? "hidden" : ""}`}>
            <div className="flex justify-center items-center">
                {
                  (isFetchingNextPage)
                  &&
                  (
                    <>
                      <span>Loading </span>
                      <img src="/preloader/cir.gif" style={{width:"40px",height:"40px"}}/>
                    </>
                  ) 
                }
              
            </div>
      </div>
    </>
  );
}

