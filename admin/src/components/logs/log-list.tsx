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
const LogList = ({ logs, onPagination }: IProps) => {
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

  const columns = [

    {
      title: ("Type"),
      align: alignLeft,
      render: (data:any) => formateType(data),
    },
    {
      title: ("Ip Address"),
      dataIndex: "ip_address",
      key: "ip_address",
      align: "center",
      width: 60,
    },
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
      render: (data:any) => (data?.user)?data?.user?.name:"---",
    },
    {
      title: ("Phone no."),
      align: alignLeft,
      render: (data:any) => (data?.user)?data?.user?.phone_number:"---",
    },
    {
      title: ("Data"),
      align: alignLeft,
      render: (data:any) => generateData(data),
    },
    {
      title: ("Location"),
      align: alignLeft,
      dataIndex: "location",
      key: "location",
    },
    {
      title: ("Shop"),
      align: alignLeft,
      render: (data:any) => (data?.shop)?data?.shop?.name:"---",
    },
    {
      title: ("Timestamp"),
      align: alignLeft,
      render: (data:any) => formateDate(data),
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
          data={data}
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

export default LogList;
