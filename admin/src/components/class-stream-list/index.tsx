import Pagination from "@components/ui/pagination";
import { Table } from "@components/ui/table";
import ActionButtons from "@components/common/action-buttons";
import { getIcon } from "@utils/get-icon";
import * as categoriesIcon from "@components/icons/category";
import { ROUTES } from "@utils/routes";
import { CategoryPaginator } from "@ts-types/generated";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { useIsRTL } from "@utils/locals";
import { useRouter } from "next/router";


export type IProps = {
  categories: CategoryPaginator | undefined | null;
  onPagination: (key: number) => void;
};
const ClassStreamList = ({ class_stream }) => {
    
  const { t } = useTranslation();
  const { data, paginatorInfo } = class_stream!;
  console.log('class',class_stream);
//   return ''
  const rowExpandable = (record: any) => record.children?.length;
  const router = useRouter();
  const {
    query: { shop },
  } = useRouter();

  const { alignLeft } = useIsRTL();
  //  const filteredClasses = data?.filter((cat)=> cat?.parent == null)
  console.log('filtered', data)
  const columns = [
    // {
    //   title: t("table:table-item-actions"),
    //   dataIndex: "id",
    //   key: "actions",
    //   align: "left",
    //   width: 90,
    //   render: (id: string) => (
    //     <ActionButtons
    //       id={id}
    //       editUrl={`${router.asPath}/edit/${id}`}
    //       deleteModalView="DELETE_CATEGORY"
    //     />
    //   ),
    // },
   
    {
        title: t("Stream"),
        dataIndex: "name",
        key: "name",
        align: alignLeft,
        width: 150,
        render: (text) => {
            return `${text}`;
        }
    },
    
    // {
    //     title: t("Stream"),
    //     dataIndex: "name",  
    //     key: "stream",       
    //     align: alignLeft,
    //     width: 150,
    //     render: (text, record) => {  
    //         return <span className="">{record?.stream?.name}</span>;  
    //     }
    // }
    
  ];

  return (
    <>
      <div className="rounded overflow-hidden shadow mb-6">
        <Table
          //@ts-ignore
          columns={columns}
          emptyText={t("table:empty-table-data")}
          data={class_stream}
          rowKey="id"
          scroll={{ x: 1000 }}
          expandable={{
            expandedRowRender: () => "",
            rowExpandable: rowExpandable,
          }}
        />
      </div>

      {/* {!!paginatorInfo.total && ( */}
        <div className="flex justify-end items-center">
          <Pagination
            // total={paginatorInfo.total}
            // current={paginatorInfo.currentPage}
            // pageSize={paginatorInfo.perPage}
            // onChange={onPagination}
          />
        </div>
      {/* )} */}
    </>
  );
};

export default ClassStreamList;
