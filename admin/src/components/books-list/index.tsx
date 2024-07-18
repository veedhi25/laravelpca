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
import { API_ENDPOINTS } from "@utils/api/endpoints";

export type IProps = {
  categories: CategoryPaginator | undefined | null;
  onPagination: (key: number) => void;
};
const BooksList = ({ books, onPagination }: IProps) => {
    
  const { t } = useTranslation();
  const { data, paginatorInfo } = books!;
  console.log('books',books);
//   return ''
  const rowExpandable = (record: any) => record.children?.length;
  const router = useRouter();
  const {
    query: { shop },
  } = useRouter();

  const { alignLeft } = useIsRTL();

//   const filteredClasses = data?.filter((cat)=> cat?.parent == null)
  
  console.log('filtered', data)
  const columns = [
    {
      title: t("table:table-item-actions"),
      dataIndex: "id",
      key: "actions",
      align: "left",
      width: 90,
      render: (id: string) => (
        <ActionButtons
          id={id}
          editUrl={`${router.asPath}/${id}/edit`}
          // deleteModalView="DELETE_CATEGORY"
        />
      ),
    },

    {
      title: t("PDF"),
      dataIndex: "pdf_url",
      key: "pdf_url",
      align: alignLeft,
      width: 150,
      render: (pdf_url) => {
          return (
              <a href={`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT+pdf_url}`} target="_blank" rel="noopener noreferrer">
                  <img src={`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT+pdf_url}`} className="h-10 w-10"/>
              </a>
          );
      }
    },
  
   
    {
        title: t("Book"),
        dataIndex: "name",
        key: "name",
        align: alignLeft,
        width: 150,
        render: (name) => {
            return `${name}`;
        }
    },

    {
        title: t("Class"),
        dataIndex: "student_class",
        key: "student_class",
        align: alignLeft,
        width: 150,
        render: (student_class) => {
            return `${student_class}th`;
        }
    },
    
    {
        title: t("Course"),
        dataIndex: "course_name",  
        key: "course_name",       
        align: alignLeft,
        width: 150,
        render: (course_name) => {  
            return <span className="">{course_name}</span>;  
        }
    },

    {
        title: t("author"),
        dataIndex: "author_name",  
        key: "author_name",       
        align: alignLeft,
        width: 150,
        render: (author_name) => {  
            return <span className="">{author_name}</span>;  
        }
    },

    {
        title: t("Description"),
        dataIndex: "description",  
        key: "description",       
        align: alignLeft,
        width: 150,
        render: (description) => {  
            return <span className="">{description}</span>;  
        }
    }
    
  ];

  return (
    <>
      <div className="rounded overflow-hidden shadow mb-6">
        <Table
          //@ts-ignore
          columns={columns}
          emptyText={t("table:empty-table-data")}
          data={books}
          rowKey="id"
          scroll={{ x: 1000 }}
        //   expandable={{
        //     expandedRowRender: () => "",
        //     rowExpandable: rowExpandable,
        //   }}
        />
      </div>

      {/* {!!paginatorInfo.total && ( */}
        <div className="flex justify-end items-center">
          <Pagination
            // total={paginatorInfo.total}
            // current={paginatorInfo.currentPage}
            // pageSize={paginatorInfo.perPage}
            onChange={onPagination}
          />
        </div>
      {/* )} */}
    </>
  );
};

export default BooksList;
