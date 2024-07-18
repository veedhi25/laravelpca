import React from 'react'
import { useOrderQuery } from "@data/order/use-order.query";
import { useRouter } from "next/router";
import { useTranslation } from 'react-i18next';
import dayjs from "dayjs";
import { useIsRTL } from "@utils/locals";
import Badge from "@components/ui/badge";
import { formatAddress } from "@utils/format-address";
import Spinner from '@components/ui/loaders/spinner/spinner';




export default function Invoice() {

    const { t } = useTranslation('common');
    const { alignLeft, alignRight } = useIsRTL();


    const { query } = useRouter();

    const { data, isLoading: loading } = useOrderQuery({
        tracking_number: query.tracking_number as string,
      });

      // const orderTableColumns = [

      //   {
      //     title: t("Tracking Number"),
      //     dataIndex: "tracking_number",
      //     key: "tracking_number",
      //     align: alignLeft,
      //   },
    
      //   {
      //     title: t("Date"),
      //     dataIndex: "date",
      //     key: "date",
      //     align: alignLeft,
      //     render: (created_at: string) => dayjs(created_at).format("MMMM D, YYYY"),
      //   },
    
      //   {
      //     title: t("Status"),
      //     dataIndex: "status",
      //     key: "status",
      //     align: "center",
      //     render: (status: any) => (
      //       <Badge text={status?.name} style={{ backgroundColor: status?.color }} />
      //     ),
      //   },
        
      //   {
      //     title: t("Items"),
      //     dataIndex: "products",
      //     key: "products",
      //     align: "center",
      //     render: (products: any) => formatString(products?.length, t("Items")),
      //   },
    
      //   {
      //     title: t(" Total-price"),
      //     dataIndex: "paid_total",
      //     key: "paid_total",
      //     align: alignRight,
      //     // width: 100,
      //     render: (paid_total: any) => {
      //       const { price } = usePrice(data && { amount: Number(paid_total) });
      //       return <p>{price}</p>;
      //     },
      //   },
    
      //   {
      //     title: "",
      //     dataIndex: "tracking_number",
      //     key: "tracking_number",
      //     align: alignRight,
      //     // width: 100,
      //     render: (tracking_number: string) => (
      //       <Link
      //         href={`${ROUTES.ORDERS}/${tracking_number}`}
      //         className="inline-flex items-center justify-center flex-shrink-0 font-semibold leading-none rounded outline-none transition duration-300 ease-in-out focus:outline-none focus:shadow bg-gray-700 text-light border border-transparent hover:bg-gray-900 px-4 py-0 h-10 text-xs"
      //       >
      //         {t("text-view")}
      //       </Link>
      //     ),
      //   },
      // ];

      if (loading) {
        <Spinner/>

      }

      // console.log('delivery time',data?.order.delivery_time);

    
    return (
        
    <div className='flex flex-col p-0 lg:p-6 sm:p-8  max-w-screen-lg w-full mx-auto bg-light rounded space-y-8'>

      <div className='flex text-center font-md flex-col'>
          <h1 className='font-semibold text-sm md:text-md lg:tex-md'>
            Tax Invoice
          </h1>
      </div>

      <div className=' mt-0 lg:mt-4 flex items-center justify-between'>

        <h1 className='flex items-center font-extrabold text-sm lg:text-xl'>RetailUnnati.com</h1>
        
      </div>

       <div className='flex  flex-col w-full space-y-6 p-4 rounded border bg-gray-50'>
                     {/* 1st row */}
                    <div className='flex w-full  space-x-8 justify-between'>
                    {/* {
                        data?.order?.children.map(product=>{
                           return ( */}
                  <div className='flex flex-col  w-1/2  space-y-2'>
                        <div className='grid grid-cols-1 lg:flex w-full lg:space-x-6 '>
                            <h1 className='text-xs sm:text-sm lg:tex-md font-semibold'>Seller :</h1>
                            <p className='text-xs sm:text-sm lg:text-md text-gray-700 font-body'>{data?.order?.products[0]?.shop?.name}</p>
                            
                        </div>

                        <div className='flex flex-col w-full space-y-3'>
                            <h1 className='text-xs sm:text-sm lg:tex-md font-semibold'>Seller Address :</h1>
                            <p className='w-full sm:w-8/12 text-gray-700 tracking-wide text-xs'>{data?.order?.products[0]?.shop?.settings?.location.formattedAddress}</p>
                            
                        </div>
                  </div>
                {/* )})} */}

                     
                        <div className='flex w-1/2 space-y-2 flex-col'>
                            <span className='grid grid-cols-1 lg:flex items-center w-full lg:space-x-2'>
                                <h1 className='text-xs sm:text-sm lg:tex-md font-semibold'>
                                  Customer:
                                </h1>
                                <p className='text-xs sm:text-sm lg:text-md font-body text-gray-700'>{data?.order?.customer?.name!}</p>
                            </span>
                            <h1 className='text-xs sm:text-sm lg:tex-md font-semibold'>Shipping Address:</h1>
                            
                            <p className='text-xs sm:text-sm font-body tracking-wide'> 
                             <span className="w-7/12 sm:w-8/12 text-gray-700  text-xs">
                               {formatAddress(data?.order?.billing_address!)}
                             </span>
                            </p>

                            <h1 className='text-xs sm:text-sm lg:tex-md font-semibold'>
                              Delivery/Appointment
                            </h1>

                            <p className='text-xs sm:text-sm font-body tracking-wide'> 
                            <span className="w-7/12 sm:w-8/12 text-gray-700  text-xs">
                              {data?.order?.children[0]?.shop?.shop_categories?.replace(/[{":,0123456789}]/g,'').slice(5,-3) !== 'Salon & Spa' ? data?.order?.delivery_time : data?.order?.delivery_time}
                            </span>
                            </p>
                            <span className='grid grid-cols-1 lg:flex items-center  w-full lg:space-x-2'>
                                <h1 className='text-xs sm:text-sm lg:tex-md font-semibold'>Pin Code :</h1>
                                <p className='text-xs sm:text-sm lg:text-md font-body text-gray-700'>
                                  {data?.order?.billing_address?.zip}
                                </p>
                            </span>

                            <div className=' grid grid-cols-1 lg:flex items-center  w-full lg:space-x-2 '> 
                              <h1 className='text-xs sm:text-sm lg:tex-md  font-semibold'>Phone No :</h1>
                              <p className='text-xs sm:text-sm lg:tex-md font-body text-gray-700'>
                                {data?.order?.customer_contact!}
                              </p>
                            </div>
                        </div>

                    </div>

                   

                     {/* 2nd row */}
                     {/* {
              data?.order?.products.map(product=>{
                return ( */}
                  <>
                    <div className='flex w-full space-x-8 justify-between'>

                        <div className='flex w-1/2 space-y-2 flex-col'>

                              <span className='grid grid-cols-1 lg:flex items-center'>
                                    <h1 className='text-xs sm:text-sm w-20 lg:tex-md font-semibold'>
                                      FSSAI No :
                                    </h1>
                                    <p className='text-xs sm:text-sm lg:tex-md font-body tracking-wide text-gray-700'>
                                        {data?.order?.products[0]?.shop?.fssai_number} 
                                    </p>
                              </span>

                              <span className='grid grid-cols-1 lg:flex items-center'>
                                    <h1 className='text-xs sm:text-sm w-20 lg:tex-md font-semibold'>
                                      GST No :
                                    </h1>
                                    <p className='text-xs sm:text-sm lg:tex-md font-body tracking-wide text-gray-700'> 
                                      {data?.order?.products[0]?.shop?.gst_number} 
                                    </p>
                              </span>

                        </div>


                        <div className='flex w-1/2 space-y-2 flex-col'>
                              <span className='grid grid-cols-1 lg:flex items-center'><h1 className='text-xs sm:text-sm lg:tex-md font-semibold'>
                                Order No:
                                </h1>
                                <p className='text-xs sm:text-sm lg:tex-md text-gray-700 font-body ml-2'>
                                  {data?.order?.tracking_number}
                                </p>
                              </span>
                              <span className='grid grid-cols-1 lg:flex items-center'>
                                <h1 className='text-xs sm:text-sm lg:tex-md font-semibold'>
                                  Order Date:
                                  </h1>
                                  <p className='text-xs sm:text-sm  lg:tex-md text-gray-700 font-body ml-2'>
                                    {dayjs(data?.order?.created_at).format("MMMM D, YYYY")}
                                  </p>
                              </span>
                        </div>

                    </div>
                    </>
                {/* )
              })
            } */}

      </div>
      </div> 
            
    
    )
}
