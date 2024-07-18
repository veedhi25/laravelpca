import ShopLayout from '@components/layouts/shop';
import { useModalAction } from '@components/ui/modal/modal.context';
import { useOrdersQuery } from '@data/order/use-orders.query';
import { useShopQuery } from '@data/shop/use-shop.query';
import { adminOwnerAndStaffOnly } from '@utils/auth-utils';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { SortOrder } from "@ts-types/generated";
import { LIMIT } from "@utils/constants";
import Table from 'rc-table';
import Input from '@components/ui/input';
import { useIsRTL } from '@utils/locals';
import Card from '@components/common/card';
import { useForm } from 'react-hook-form';
import { useUpdateOrderMutation } from '@data/order/use-order-update.mutation';
import Button from '@components/ui/button';
import { useOrderStatusesQuery } from '@data/order/use-order-statuses.query';
import { toast } from 'react-toastify';
import { useOrderQuery } from '@data/order/use-order.query';
import AdminLayout from '@components/layouts/admin';


export default function OrdersEditForm() {

    const {
        query: { shop },
      } = useRouter();
    
      const { t } = useTranslation();
      const { openModal } = useModalAction();
      const { alignLeft } = useIsRTL();
    
      const [orderBy, setOrder] = useState("created_at");
      const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
      const { data: shopData, isLoading: fetchingShop } = useShopQuery(
        shop as string
      );
    
      const shopId = shopData?.shop?.id!;
      const [searchTerm, setSearchTerm] = useState("");
      const [page, setPage] = useState(1);

      const { data: orderStatusData } = useOrderStatusesQuery();
      const { query } = useRouter();

      

      const {
        data,
        isLoading: loading,
        error,
      } = useOrderQuery(query.orderId as string);

      

      const [products, setProducts] = useState([]);



      useEffect(() => {
        if (data?.order) {
            const allProducts = data?.order?.products.map((product:any) => ({
                ...product,
                order_id: data.order.id,
                isChecked: true,
                customer_name: data.order.customer?.name,
                phone_number: data.order.customer?.phone_number,
                pivot: product.pivot
            }));
            setProducts(allProducts);
        }
    }, [data]);
    
      
       //@ts-ignore
       const handleQuantityChange = (event, productId, orderId) => {
        const updatedProducts = products?.map(product => {
            if (product.id === productId && product.order_id === orderId) {
                const newQuantity = event.target.value;
                const updatedProduct = {
                    ...product,
                    pivot: {
                        ...product.pivot,
                        order_quantity: newQuantity,
                        subtotal: product.pivot.unit_price * newQuantity
                    }
                };
                return updatedProduct;
            } else {
                return product;
            }
        });
        setProducts(updatedProducts);
    }
    
      
    
      
      const handleCheck = (event: React.ChangeEvent<HTMLInputElement>, productId: any, orderId: any) => {
        const updatedProducts = products?.map(product => {
           //@ts-ignore
          if (product.id === productId && product.order_id === orderId) {
            return {
               //@ts-ignore
              ...product,
              isChecked: event.target.checked
            };
          } else {
            return product;
          }
        });
        //@ts-ignore
        setProducts(updatedProducts);
      }
      

      const paid_total = products
      //@ts-ignore
      .filter(product => product.isChecked)
      //@ts-ignore
      .reduce((total, product) => total + Number(product.pivot?.subtotal || 0), 0);

          
      const columns = [
        //...existing columns
        {
          title: "Select",
          key: "select",
          align: alignLeft,
          render: (_text: any, record: { isChecked: any; id: any; order_id: any; }) => (
            <input type="checkbox" 
              checked={record.isChecked || false}
              className='cursor-pointer p-1 '
              onChange={e => handleCheck(e, record.id, record.order_id)} />
          ),
        },
        {
          title: t("table:Customer Name"),
          dataIndex: "customer_name",
          key: "customer",
          align: alignLeft,
          render: (customer_name: any) => (
            <div className="whitespace-nowrap font-semibold">{customer_name}</div>
          ),
        },
        
        {
          title: "Quantity",
          dataIndex: ['pivot', 'order_quantity'],
          key: "quantity",
          align: alignLeft,
          render: (_text: any, record: any) => {
            //@ts-ignore
              return <Input type="number" 
                  min={1}
                  className='w-28'
                  value={record.pivot?.order_quantity}
                  disabled={!record.isChecked} 
                  onChange={e => handleQuantityChange(e, record.id, record.order_id)} />
          },
      },
      {
          title: "Subtotal",
          dataIndex: ['pivot', 'subtotal'],
          key: "subtotal",
          align: alignLeft,
          render: (text, record) => {
            // ₹
              return <span>₹{record.pivot?.subtotal}.00</span>
          },
      },
      
         
      ];
      console.log('orders', query)

      const { handleSubmit, control } = useForm(); // Initialize react-hook-form


      const { mutate: updateOrder, isLoading: loadingg } = useUpdateOrderMutation();
      //@ts-ignore
      console.log('selected',products?.filter((m)=> m.isChecked))
     
      const onSubmit = () => {
        const selectedProducts = products?.filter(product => product?.isChecked);
    
        let updatedTotal = 0;
        let updatedProducts = selectedProducts?.map(product => {
            let updatedQuantity = parseInt(product?.pivot?.order_quantity) || 1;
            let updatedPrice = parseFloat(product?.pivot?.unit_price) || 0;
            let subtotal = updatedQuantity * updatedPrice;
            updatedTotal += subtotal;
    
            return {
                id: product?.id,
                order_quantity: updatedQuantity,
                subtotal: subtotal,
                unit_price: updatedPrice, 
                isChecked: product?.isChecked
            };
        });
    
        const orderUpdatePayload = {
            id: data?.order?.id,
            total: updatedTotal,
            paid_total: updatedTotal,
            amount: updatedTotal,
            products: updatedProducts,
            status: orderStatusData?.order_statuses?.data[0]?.id ?? 1,
        };
    
        updateOrder(
            { variables: { id: orderUpdatePayload.id, input: orderUpdatePayload } },
            {
                onError: (error: any) => {
                    toast.error("An error occurred while updating the order. Please try again.");
                },
                onSuccess: (data) => {
                    router.push(`/orders`)
                }
            }
        );
    };
    
      

      return (
        <> 
        <Card>
          Edit order
        </Card>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Table
        //@ts-ignore
        columns={columns}
        emptyText={t("table:empty-table-data")}
        data={products}
        rowKey={record => `${record.order_id}-${record.id}`}
        scroll={{ x: 1000 }}
      />
      {/* // @ts-ignore */}


       
        <Card className='w-full p-2 border-t border-gray-500 flex items-center justify-between lg:px-32'>
        <div className=''>
          <span className=''>Total</span>
        </div>
        <div className=''>
          <strong> {'₹' +' '+paid_total}.00</strong> 
          {/* Display the computed total instead of data from API */}
        </div>
      </Card>

      <Button
        loading={loadingg}
        // disabled={!subtotal || total < 0 || notAvailableItems.length > 0}
        className="w-full mt-5 lg:w-auto lg:ms-auto"
      >
        Update
      </Button>
      </form>
      </>
      );
}

OrdersEditForm.authenticate = {
    permissions: adminOwnerAndStaffOnly,
  };
  OrdersEditForm.Layout = AdminLayout;
  
  
  export const getServerSideProps = async ({ locale }: any) => ({
    props: {
      ...(await serverSideTranslations(locale, ["table", "common", "form"])),
    },
  });
  
