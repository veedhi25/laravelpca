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
const BrandList = ({ categories, onPagination }: IProps) => {
  const { t } = useTranslation();
  const { data, paginatorInfo } = categories!;
  const rowExpandable = (record: any) => record.children?.length;
  const router = useRouter();
  const {
    query: { shop },
  } = useRouter();

  const { alignLeft } = useIsRTL();

  const filteredCategories = data?.filter((cat)=> cat?.parent == null)
  
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
          editUrl={`${router.asPath}/edit/${id}`}
          deleteModalView="DELETE_CATEGORY"
        />
      ),
    },
    {
      title: t("table:table-item-id"),
      dataIndex: "id",
      key: "id",
      align: "center",
      width: 60,
    },
    {
      title: t("table:table-item-title"),
      dataIndex: "name",
      key: "name",
      align: alignLeft,
      width: 150,
    },
    // {
    //   title: t("table:table-item-details"),
    //   dataIndex: "details",
    //   key: "details",
    //   align: alignLeft,
    //   width: 200,
    // },
    {
      title: t("table:table-item-image"),
      dataIndex: "image",
      key: "image",
      align: "left",

      render: (image: any, { name }: { name: string }) => {
        if (!image?.thumbnail) return null;

        return (
          <Image quality='40'
            src={image?.thumbnail ?? "/"}
            alt={name}
            layout="intrinsic"
            width={24}
            height={24}
            className="rounded overflow-hidden"
          />
        );
      },
    },
    // {
    //   title: t("table:table-item-icon"),
    //   dataIndex: "icon",
    //   key: "icon",
    //   align: "center",
    //   render: (icon: string) => {
    //     if (!icon) return null;
    //     return (
    //       <span className="flex items-center justify-center">
    //         {getIcon({
    //           iconList: categoriesIcon,
    //           iconName: icon,
    //           className: "w-5 h-5 max-h-full max-w-full",
    //         })}
    //       </span>
    //     );
    //   },
    // },
    {
      title: t("Type"),
      dataIndex: "type",
      key: "type",
      align: 'left',
      width: 120,
      render: (type: any) => (
        <div
          className="whitespace-nowrap truncate overflow-hidden"
          title={type?.name}
        >
          {type?.name}
        </div>
      ),
    },
    {
      title: t("table:table-item-slug"),
      dataIndex: "slug",
      key: "slug",
      align: "left",
      // ellipsis: true,
      width: 150,
      render: (slug: any) => (
        <div
          className="whitespace-nowrap truncate overflow-hidden"
          title={slug}
        >
          {slug}
        </div>
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
          data={filteredCategories}
          rowKey="id"
          scroll={{ x: 1000 }}
          expandable={{
            expandedRowRender: () => "",
            rowExpandable: rowExpandable,
          }}
        />
      </div>

      {!!paginatorInfo.total && (
        <div className="flex justify-end items-center">
          <Pagination
            total={paginatorInfo.total}
            current={paginatorInfo.currentPage}
            pageSize={paginatorInfo.perPage}
            onChange={onPagination}
          />
        </div>
      )}
    </>
  );
};

export default BrandList;
