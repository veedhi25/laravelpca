
import Pagination from "@components/ui/pagination";
import dayjs from "dayjs";
import { Table } from "@components/ui/table";
import ActionButtons from "@components/common/action-buttons";
import usePrice from "@utils/use-price";
import { formatAddress } from "@utils/format-address";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import {
  Order,
  OrderPaginator,
  OrderStatus,
  UserAddress,
  Shop
} from "@ts-types/generated";
import InvoicePdf from "./invoice-pdf";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useIsRTL } from "@utils/locals";
import { Children, useState } from "react";
import product from "@repositories/product";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

type IProps = {
  orders: OrderPaginator | null | undefined;
  onPagination: (current: number) => void;
};


const OrderList = ({ orders, onPagination }: IProps) => {
  
  const { data, paginatorInfo } = orders! ?? {};
  const { t } = useTranslation();
  const rowExpandable = (record: any) => record?.children?.length > 1 ? record?.children?.length : '';
  const router = useRouter();
  const { alignLeft } = useIsRTL();

  const [selectedOrders, setSelectedOrders] = useState([]);
  const [flaggedOrders, setFlaggedOrders] = useState([]);

  console.log('orders',orders);

  var today = new Date();

  var month = today.getMonth();

  const monthNames = ["Jan", "Feb", "March", "April", "May", "June",
  "July", "Aug", "Sep", "Oct", "Nov", "Dec"
];

  var currDate = today.getDate() + ' ' + monthNames[month]

  // console.log('date',today.getDate() + ' ' + monthNames[month] );


  // console.log('orders list', orders);

  const date = new Date();
  const ampm = date.getHours() >= 12 ? "PM" : "AM";
  const hours = date.getHours() % 12;
  const minutes = date.getMinutes();
  const formattedTime = `${hours}:${minutes} ${ampm}`;
  const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  const formattedDateTime = `${formattedDate} ${formattedTime}`;

  // console.log('time', formattedDateTime);
  // console.log('date',date);

  const consolidateInvoice = (acc, order) => {
    order.products.forEach((product) => {
      // Check if product already exists in the accumulated array
      const existingProduct = acc.find((item) => item.id === product.id);
      // const taxData = JSON.parse(product.pivot?.tax);
      if (existingProduct) {
        // Update the quantity and total of the existing product
        existingProduct.quantity += Number(product.pivot?.order_quantity);
        existingProduct.total += Number(product.pivot?.subtotal);
        // existingProduct.tax += Number(product.pivot?.subtotal) - (Number(product.pivot?.subtotal) / (1 + (taxData.rate / 100)));
      } else {
        // Push a new product into the accumulated array
        acc.push({
          id: product.id,
          name: product.name,
          quantity: Number(product.pivot?.order_quantity),
          unit: Number(product?.unit),
          total: Number(product.pivot?.subtotal),
          // tax: Number(product.pivot?.subtotal) - (Number(product.pivot?.subtotal) / (1 + (taxData.rate / 100))),
        });
      }
    });
    return acc;
  };
  
  
  const downloadPdf = (invoice) => {
    const doc = new jsPDF();
    const header = 'Retail Unnati';
    const invoiceNumber = `Invoice Number: ${Math.random().toString(36).substring(7)}`; // This is just a random string. Replace it with your actual invoice number generator
    const tableColumn = ["Product ID", "Product Name", "Quantity","Unit", "Total (₹)", "Tax (₹)"];
    const tableRows = [];
    let cumulativeTotal = 0;
    let cumulativeTax = 0;
  
    invoice.forEach((item) => {
      let product = [
        item.id,
        item.name,
        item.quantity,
        item.unit,
        `INR ${item.total.toFixed(2)}`,
        // `INR ${item.tax.toFixed(2)}`,
      ];
      cumulativeTotal += item.total; // Sum the total of each product
      // cumulativeTax += item.tax; // Sum the tax of each product
      tableRows.push(product);
    });
  
    doc.autoTable(tableColumn, tableRows, { startY: 30 });
  
    // Add the Cumulative Total
    doc.text(`Cumulative Total: INR ${cumulativeTotal.toFixed(2)}`, 14, doc.autoTable.previous.finalY + 20); // The value '20' here can be adjusted based on where you want to position the text
  
    // Add the Cumulative Tax
    // doc.text(`Cumulative Tax: INR ${cumulativeTax.toFixed(2)}`, 14, doc.autoTable.previous.finalY + 30); // The value '30' here can be adjusted based on where you want to position the text
  
    // Add header and invoice number
    doc.text(header, 14, 15);
    doc.text(invoiceNumber, 14, 20);
  
    // Save the PDF
    doc.save('Consolidated_Invoice.pdf');
  };

  const handleGenerateConsolidatedInvoice = () => {
    // Logic to generate the consolidated invoice using selectedOrders
    const consolidatedInvoice = selectedOrders.reduce((acc, currId) => {
      const order = data.find((order) => order.id === currId);
      if (order) {
        acc = consolidateInvoice(acc, order);
      }
      return acc;
    }, []);

    // Generate the PDF
    downloadPdf(consolidatedInvoice);

    // Add selected orders to the flagged orders
    setFlaggedOrders([...flaggedOrders, ...selectedOrders]);
  };
  
 

  const columns = [

    // invoice pdf download button

    

    {
      title: 'Select',
      dataIndex: 'id',
      render: (id: string) => (
        <input
          type="checkbox"
          checked={selectedOrders.includes(id)}
          onChange={(e) => {
            const newSelectedOrders = [...selectedOrders];
    
            if (e.target.checked) {
                newSelectedOrders.push(id);
            } else {
                const index = newSelectedOrders.indexOf(id);
                if (index > -1) {
                    newSelectedOrders.splice(index, 1);
                }
            }
    
            console.log('selected', newSelectedOrders)
            setSelectedOrders(newSelectedOrders);
          }}
        />
      ),
    },
    {
      title: t("table:table-item-actions"),
      dataIndex: "id",
      key: "actions",
      align: "center",
      width: 100,
      render: (id: string) => (
        <ActionButtons id={id} detailsUrl={`${router.asPath}/${id}`} />
      ),
    },
    


    {
      title: ("Edit"),
      dataIndex: "id",
      key: "actions",
      align: "left",
      width: 80,
      render: (id: string, record: { id: any; }) => (
        <ActionButtons
          id={record?.id}
          editUrl={`${router.asPath}/${id}/edit`}
          // deleteModalView="DELETE_PRODUCT"
        />
      ),
    },

    {
      title: t("Download Invoice"),
      dataIndex: "customer",
      key: "customer",
      align: alignLeft,
      render: (customer: any,order:any) => {

        return (

          

        <PDFDownloadLink
        
          document={<InvoicePdf  order={order} />}
          fileName={`${customer?.name}-invoice.pdf`}
          style={{
            textDecoration: "none",
            color: "blue",
            padding: "0.5rem",
          }}
        >
          {
              t("Download")
          }

        </PDFDownloadLink>
        )

    }},

    

    {
      title: t("table:table-item-total"),
      dataIndex: "total",
      key: "total",
      align: "center",
      width: 120,
      render: (value: any) => {
        const { price } = usePrice({
          amount: value,
        });
        return <span className="whitespace-nowrap  font-semibold">{price}</span>;
      },
    },

    
    {
      title: t("table:Retailer Name"),
      dataIndex: "customer",
      key: "customer",
      align: alignLeft,
      render: (customer: any) => (
        <div className="whitespace-nowrap font-semibold">{customer?.name}</div>
      ),
    },

    // {
    //   title: t('table: Items'),
    //   dataIndex: 'children',
    //   key: 'children',
    //   align: alignLeft,
    //   render: (children: any) => (
        
    //     <div className="whitespace-wrap w-48 font-semibold">{
    //       children?.map( (child:any) => child.products.map((item:any) => {
    //      var price = child.products.map((prod:any) => prod.sale_price)
    //       return <h1>◦{item.name  }</h1>
    //       }))
    //       }</div>
    //   ),
    // },

    // {
    //   title: t('table: Shops'),
    //   dataIndex: 'children',
    //   key: 'children',
    //   align: alignLeft,
    //   render: (children: any) => {
        
    //     var shopName =  children?.map( (child:any) =>
        
    //      <h1>⊛ {child?.shop?.name}</h1>
    //     )
    //     // console.log('children', children)
    //       return  <h1 className="whitespace-wrap w-48 font-light">
    //                   {shopName}
    //               </h1>
    //   },
    // },
    


    // {
    //   title: t("shop name"),
    //   dataIndex: "shop",
    //   key: "shop",
    //   align: "center",
    //   render: (shop: any) => {
       
    //     return <span>{shop?.name}</span>;
    //   },
    // },
    

    {
      title: t("table:Phone Number"),
      dataIndex: "customer",
      key: "customer",
      align: alignLeft,
      render: (customer: any) => (
        <div>{customer?.phone_number}</div>
      ),
    },


    // {
    //   title: t("table:Email Id"),
    //   dataIndex: "customer",
    //   key: "customer",
    //   align: alignLeft,
    //   render: (order: any) => (
    //     <div className="whitespace-nowrap">{order?.email}</div>
    //   ),
    // },



    // delivery time
    {
      title: t("table:Delivery/Appointment"),
      dataIndex: "delivery_time",
      key: "delivery_time",
      align: "center",
      render: (delivery_time: any) => {
        return <span>{ delivery_time.includes('Today') ? delivery_time.replace('Today', '') : delivery_time.includes('Tomorrow') ? delivery_time.replace('Tomorrow', '') : delivery_time } </span>
      },
    },

    //shop name

    

    {
      title: t("Time"),
      dataIndex: "created_at",
      key: "created_at",
      align: alignLeft,
      render: (created_at: string) => {
        return <span className="whitespace-nowrap font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-purple-600 to-blue-600">
          {dayjs(created_at).format("h:mm a")}
          </span>
      }
    
    },

    {
      title: t("table:table-item-order-date"),
      dataIndex: "created_at",
      key: "created_at",
      align: "center",
      render: (date: string) => {
        dayjs.extend(relativeTime);
        dayjs.extend(utc);
        dayjs.extend(timezone);
        return (
          <span className="whitespace-nowrap">
            {date.split('T')[0].split("-").reverse().join("-")}
          </span>
        );
      },
    },

    {
      title: t("table:table-item-status"),
      dataIndex: "status",
      key: "status",
      align: alignLeft,
      render: (status: OrderStatus) => (
        <span
          className="whitespace-nowrap font-semibold"
          style={{ color: status?.color! }}
        >
          {status?.name}
        </span>
      ),
    },

    {
      title: t("Payment Gateway"),
      dataIndex: "payment_gateway",
      key: "payment_gateway",
      align: alignLeft,
      render: (payment_gateway:any) => (
        <span
          className="whitespace-nowrap font-semibold"
        >
          {payment_gateway=="cod"?"COD":payment_gateway}
        </span>
      ),
    },

    {
      title: t("table:table-item-shipping-address"),
      dataIndex: "billing_address",
      key: "billing_address",
      align: alignLeft,
      render: (billing_address: UserAddress) => (
        <div>{formatAddress(billing_address)}</div>
      ),
    },
    
    {
      title: t("table:table-item-tracking-number"),
      dataIndex: "tracking_number",
      key: "tracking_number",
      align: "center",
      width: 150,
    },

    {
      title: t("table:table-item-delivery-fee"),
      dataIndex: "delivery_fee",
      key: "delivery_fee",
      align: "center",
      render: (value: any) => {
        const delivery_fee = value ? value : 0;
        const { price } = usePrice({
          amount: delivery_fee,
        });
        return <span>{price}</span>;
      },
    },

  ];

  // console.log('pagination', paginatorInfo?.total)
  // clg

  return (
    <div className="relative">
    
      <div className="rounded overflow-hidden shadow mb-6">
      {!!paginatorInfo?.total && (
        <div className="flex justify-end items-center">
          <Pagination
            total={paginatorInfo?.total}
            current={paginatorInfo?.currentPage}
            pageSize={paginatorInfo?.perPage}
            onChange={onPagination}
          />
        </div>
      )}
        <Table
          //@ts-ignore
          columns={columns}
          emptyText={t("table:empty-table-data")}
          data={data}
          rowKey="id"
          scroll={{ x: 1000 }}
          expandable={{
            expandedRowRender: () => "",
            rowExpandable: rowExpandable,
          }}
        />
      </div>

      <button className={` ${selectedOrders?.length ? 'fixed bottom-3 z-50 block transition-all duration-200 ': 'hidden'} 
                             transition-all duration-200 p-2 px-4 rounded-lg bg-blue-500 font-semibold text-white`} 
              onClick={handleGenerateConsolidatedInvoice}>
        Generate Invoice
      </button>

      
    </div>
  );
};

export default OrderList;
