import Pagination from "@components/ui/pagination";
import { Table } from "@components/ui/table";
import ActionButtons from "@components/common/action-buttons";
import { ROUTES } from "@utils/routes";
import { CategoryPaginator } from "@ts-types/generated";
import { useTranslation } from "next-i18next";
import { useIsRTL } from "@utils/locals";
import { useEffect,useState } from "react";

export type IProps = {
  logs: CategoryPaginator | undefined | null;
  onPagination: (key: number) => void;
};

const ShopVisitorList = ({ logs,shopSlug, onPagination }: IProps) => {

  const { t } = useTranslation();
  const { data, paginatorInfo } = logs!;
  const rowExpandable = (record: any) => record?.children?.length;
  
  // console.log('logs', logs)
  const { alignLeft } = useIsRTL();

  function generateData(data:any){
    
    if(data?.type=="order"){
      return `order ${data?.order?.tracking_number} created`
    }
    if(data?.type=="item-added"){
      return `${data?.products} is added in cart`
    }
    if(data?.type=="item-removed"){
      return `${data?.products} is removeed from cart`
    }
    if(data?.type=="search_item"){
      return data?.search_item+" is Searched"
    }
    if(data?.type=="item-added-to-wishlist"){
      return `${data?.products} is added to wishlist`
    }
    if(data?.type=="item-removed-from-wishlist"){
      return `${data?.products} is removed from wishlist`
    }
    
  }
 

//   async function getLocation () {
//   let url = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${adr}`;

//   await fetch(url).then((response) =>
//     response.json().then((json) => {
//       const output = `
//           ---------------------
//           Country: ${json.country_name}
//           State: ${json.state_prov}
//           City: ${json.city}
//           District: ${json.district}
//           Lat / Long: (${json.latitude}, ${json.longitude})
//           ---------------------
//           `;
//       // console.log(output);
//       return output;
//     })
//   );
// };

// console.log('datalogs',logs)


  function formateDate(data:any)
  {
    var time=data?.created_at.split('T')[1];
    var date=data?.created_at.split('T')[0].split('-');
    return date[2]+"/"+date[1]+"/"+date[0]+"  "+time.split('.')[0]
  }

  function formateType(data:any){

    if(data?.type=="order"){
      return "Order created"
    }

    if(data?.type=="item-removed"){
      return "Item removed form cart"
    }

    if(data?.type=="item-added"){
      return "Item added in cart"
    }

    if(data?.type=="search_item"){
      return "Item searched"
    }

    if(data?.type=="location"){
      return "Location searched"
    }

    if(data?.type=="item-added-to-wishlist"){
      return "Item added to wishlist"
    }

    if(data?.type=="item-removed-from-wishlist"){
      return "Item removed from wishlist"
    }     

    return data?.type

  }

  // console.log('shop log', data?.created_at)

  const filteredShop = data?.filter((itm:any)=> itm.type == 'shop-visited');

  const shopLogs = filteredShop?.filter((itm:any)=>itm.shop?.slug == shopSlug)

  console.log('shoplogs',shopLogs);

  const columns = [

    // {
    //   title: ("Type"),
    //   align: alignLeft,
    //   render: (data:any) => formateType(data),
    // },
    // {
    //   title: ("Ip Address"),
    //   dataIndex: "ip_address",
    //   key: "ip_address",
    //   align: "center",
    //   width: 60,
    // },
    // column for getLocation
    // {
    //   title: ("Ip Location"),
    //   dataIndex: "ip_location",
    //   key: "ip_location",
    //   align: "center",
    //   width: 60,
    // },
    
    {
      title: ("User"),
      align: alignLeft,
      render: (data:any) => (data?.user)?data?.user?.name:"Guest user",
    },
    {
      title: ("Phone no."),
      align: alignLeft,
      render: (data:any) => (data?.user)?data?.user?.phone_number:"---",
    },
    {
      title: ("Email id"),
      align: alignLeft,
      render: (data:any) => (data?.user)?data?.user?.email:"---",
    },
    // {
    //   title: ("Date of Birth"),
    //   align: alignLeft,
    //   render: (data:any) => (data?.user)?data?.user?.date_of_birth.replace(/T.*/,'').split('-').reverse().join('-')   : "---",
    // },
    // {
    //   title: ("Occupation"),
    //   align: alignLeft,
    //   render: (data:any) => (data?.user)?data?.user?.profile?.occupation : "---",
    // },

    // {
    //   title: ("Data"),
    //   align: alignLeft,
    //   render: (data:any) => generateData(data),
    // },
    // {
    //   title: ("Location"),
    //   align: alignLeft,
    //   dataIndex: "location",
    //   key: "location",
    // },
    // {
    //   title: ("Shop"),
    //   align: alignLeft,
    //   render: (data:any) => (data?.shop)?data?.shop?.name:"---",
    // },
    {
      title: ("Visited On"),
      align: alignLeft,
      render: (data:any) => (
       <div className="text-gray-500 font-semibold"> {data?.visited_on ? data?.visited_on.split(' ')[0]  : formateDate(data)}</div>
       )
    },

    {
      title: ("Time"),
      align: alignLeft,
      render: (data:any) => (
        <div className="text-blue-700 font-semibold"> { data?.visited_on != null ? data?.visited_on.split(' ')[1] + ' ' + data?.visited_on.split(' ')[2] : formateDate(data)}</div>
      )
    },

    {
      title: t("table:table-item-actions"),
      dataIndex: "id",
      key: "actions",
      align: "center",
      width: 90,
      render: (id: string) => (
        <ActionButtons
          id={id}
          deleteModalView="DELETE_LOG"
        />
      ),
    },
    
  ];

  return (
    <>
      <div className="rounded overflow-hidden shadow mb-6">
        <Table
          //@ts-ignore
          columns={columns}
          emptyText={t("table:empty-table-data")}
          data={shopLogs}
          rowKey="id"
          scroll={{ x: 1000 }}
          expandable={{
            expandedRowRender: () => "",
            rowExpandable: rowExpandable,
          }}
        />
      </div>

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
    </>
  );
};

export default ShopVisitorList;
