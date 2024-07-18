import Card from "@components/common/card";
import Layout from "@components/layouts/admin";
import Image from "next/image";
import { Table } from "@components/ui/table";
import ProgressBox from "@components/ui/progress-box/progress-box";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Button from "@components/ui/button";
import ErrorMessage from "@components/ui/error-message";
import { siteSettings } from "@settings/site.settings";
import usePrice from "@utils/use-price";
import { formatAddress } from "@utils/format-address";
import Loader from "@components/ui/loader/loader";
import ValidationError from "@components/ui/form-validation-error";
import { Attachment } from "@ts-types/generated";
import { useOrderQuery } from "@data/order/use-order.query";
import { useUpdateOrderMutation } from "@data/order/use-order-update.mutation";
import { useOrderStatusesQuery } from "@data/order-status/use-order-statuses.query";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import SelectInput from "@components/ui/select-input";
import { useIsRTL } from "@utils/locals";
import {Children, useRef} from 'react';
import {  PDFExport, savePDF} from '@progress/kendo-react-pdf'
import { features } from "process";



type FormValues = {
  order_status: any;
};


export default function OrderDetailsPage() {
  const pdfExportComponent = useRef(null);
  const contentArea = useRef(null);

  const handleExportWithComponent = (event) => {
    pdfExportComponent.current.save();
  }

  const handleExportWithMethod = (event) =>{
    savePDF(contentArea.current, {paperSize:'A4'});
  }
  const { t } = useTranslation();
  const { query } = useRouter();
  const { alignLeft, alignRight } = useIsRTL();

  const { mutate: updateOrder, isLoading: updating } = useUpdateOrderMutation();
  const { data: orderStatusData } = useOrderStatusesQuery({});
  const {
    data,
    isLoading: loading,
    error,
  } = useOrderQuery(query.orderId as string);

  console.log('order data',data)

  const {
    handleSubmit,
    control,

    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { order_status: data?.order?.status?.id ?? "" },
  });

  const ChangeStatus = ({ order_status }: FormValues) => {
    updateOrder({
      variables: {
        id: data?.order?.id as string,
        input: {
          status: order_status?.id as string,
        },
      },
    });
  };

 
  
 
  console.log('order', data?.order?.paid_total)


  const { price: subtotal } = usePrice(
    data && {
      amount: data?.order?.amount - data?.order?.delivery_fee,
    }
  );
  const { price: delivery_fee } = usePrice(
    data && {
      amount: data?.order?.delivery_fee!,
    }
  );
  const { price: total } = usePrice(
    data && {
      // amount: data?.order?.paid_total,
      // /add delivery fee to total
      amount: data?.order?.paid_total,
    }
  );
  const { price: discount } = usePrice(
    data && {
      amount: data?.order?.discount!,
    }
  );
  
  const { price: sales_tax } = usePrice(
    data && {
      amount: data?.order?.sales_tax!,
    }
  );

  
  const getShopName = (itemdata: any, orderdata: any) => {
    const childrens = orderdata?.children;
    const shop_id = itemdata?.shop_id;

    for(let item of childrens)
    {
      if(item?.shop?.id === shop_id)
      {
        return item?.shop?.name;
      }
    }
  };


  if (loading) return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error.message} />;

  const columns = [

    {
      dataIndex: "image",
      key: "image",
      width: 70,
      render: (image: Attachment) => (
           < Image        quality='40'
          src={image?.thumbnail ?? siteSettings.product.placeholder}
          alt="alt text"
          layout="fixed"
          width={50}
          height={50}
        />
      ),
    },
    
    {
      title: t("table:table-item-products"),
      dataIndex: "name",
      key: "name",
      align: alignLeft,
      render: (name: string, item: any) => (
        
        <div>
          <span className=" mx-2">
            {item.unit}
          </span>
          <span>{name}</span>
          <span className="mx-2">x</span>
          <span className="font-semibold text-heading">
            {item.pivot.order_quantity}
          </span>
        </div>
      ),
    },

    {
      title: t("table:Shop Name"),
      dataIndex: "shop",
      key: "shop",
      align: alignLeft,
      render: (name: string, item: any) => (
        <div>
          {/* <span>{name}</span> */}
          <span className="">
            {getShopName(item,data?.order)}
          </span>
        </div>
      ),
    },

    {
      title: t("table:table-item-total"),
      dataIndex: "price",
      key: "price",
      align: alignRight,
      render: (_: any, item: any) => {
        const amt = data?.order?.products?.length == 1 ? (data?.order?.products[0]?.type_id == 7 ? data?.order?.amount : item.pivot.subtotal ): item.pivot.subtotal
        const { price } = usePrice({
           
          amount: parseFloat(amt),
        });
        return <span>{price}</span>;
      },
    },
  ];

  return (
    
    <Card>
      <div className="flex flex-col lg:flex-row items-center">
        <h3 className="text-2xl font-semibold text-heading text-center lg:text-start w-full lg:w-1/3 mb-8 lg:mb-0 whitespace-nowrap">
          {t("form:input-label-order-id")} - {data?.order?.tracking_number}
        </h3>

        <form
          onSubmit={handleSubmit(ChangeStatus)}
          className="flex items-start ms-auto w-full lg:w-2/4"
        >
          <div className="w-full me-5 z-20">
            <SelectInput
              name="order_status"
              control={control}
              getOptionLabel={(option: any) => option.name}
              getOptionValue={(option: any) => option.id}
              options={orderStatusData?.order_statuses?.data}
              placeholder={t("form:input-placeholder-order-status")}
            />

            <ValidationError message={t(errors?.order_status?.message)} />
          </div>
          <Button loading={updating}>
            <span className="hidden sm:block">
              {t("form:button-label-change-status")}
            </span>
            <span className="block sm:hidden">
              {t("form:button-label-change")}
            </span>
          </Button>
        </form>
      </div>

      <div className="my-5 lg:my-10 flex justify-center items-center">
        <ProgressBox
          data={orderStatusData?.order_statuses?.data}
          status={data?.order?.status?.serial!}
        />
      </div>

     <div className=''>
     <PDFExport ref={pdfExportComponent} paperSize='A4'>
    <div className="p-4 font-serif" ref={contentArea}>

      <span className='flex items-center py-3 font-extrabold text-sm lg:text-xl'>
        Buyl<span>
          <img src='/transparent-logo.png' 
            className='h-3 w-3 lg:mx-1 lg:h-5 lg:w-5 '/>
          </span>wcal.com
      </span>

      <div className="mb-10">
        {data?.order ? (
          <Table
            //@ts-ignore
            columns={columns}
            emptyText={t("table:empty-table-data")}
            data={data?.order?.products!}
            rowKey="id"
            scroll={{ x: 300 }}
          />
        ) : (
          <span>{t("common:no-order-found")}</span>
        )}

        <div className="border-t-4 border-double border-border-200 flex flex-col w-full sm:w-1/2 md:w-1/3 ms-auto px-4 py-4 space-y-2">
          <div className="flex font-semibold items-center justify-between text-sm text-body">
            <span>{t("common:order-sub-total")}</span>
            <span className="font-semibold">{subtotal}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-body">
            <span>{t("common:order-tax")}</span>
            <span>{sales_tax}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-body font-semibold">
            <span>{t("common:order-delivery-fee")}</span>
            <span className='font-semibold'>{delivery_fee }</span>
          </div>
          <div className="flex items-center justify-between text-sm text-body">
            <span>{t("common:order-discount")}</span>
            <span>{discount}</span>
          </div>
          <div className="flex items-center justify-between text-base text-heading font-semibold">
            <span>{t("common:order-total")}</span>
            <span>{total}</span>
          </div>
          <div className="flex items-center justify-between text-base text-body">
            <span>{("Payment Type")}</span>
            <span >{data?.order?.payment_gateway=="cod"?"Cash On Delivery":data?.order?.payment_gateway}</span>
          </div>
        </div>
      </div>
      

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
        <div className="w-full sm:w-1/2 sm:pe-8 mb-10 sm:mb-0">
          <h3 className="text-heading font-semibold mb-3 pb-2 border-b border-border-200">
            {t("common:billing-address")}
          </h3>

          <div className="text-sm text-body flex flex-col items-start space-y-1">
            <span>{data?.order?.customer?.name}</span>
            {data?.order?.billing_address && (
              <span>{formatAddress(data.order.billing_address)}</span>
            )}
            {data?.order?.customer_contact && (
              <span>{data?.order?.customer_contact}</span>
            )}
          </div>
        </div>

        <div className="w-full sm:w-1/2 sm:ps-8">
          <h3 className="text-heading text-start font-semibold sm:text-end mb-3 pb-2 border-b border-border-200">
            {t("common:shipping-address")}
          </h3>

          <div className="text-sm text-body text-start sm:text-end flex flex-col items-start sm:items-end space-y-1">
            <span>{data?.order?.customer?.name}</span>
            {data?.order?.shipping_address && (
              <span>{formatAddress(data.order.shipping_address)}</span>
            )}
            {data?.order?.customer_contact && (
              <span>{data?.order?.customer_contact}</span>
            )}
          </div>
        </div>
      </div>
      </div>
      </PDFExport>
      </div>
      <div className='w-full text-center'> 
          <button className=' text-blue-700 text-lg hover:underline mt-8 h-9  w-38' 
            onClick={handleExportWithComponent}>Download Invoice
            </button>
      </div>
      {/* <button className=' text-sm h-16 w-28' onClick={handleExportWithMethod}> Download Invoice</button> */}
      
    </Card>
   
  );
}
OrderDetailsPage.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "form", "table"])),
  },
});
