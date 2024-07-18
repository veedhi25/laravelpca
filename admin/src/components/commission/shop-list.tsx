import Pagination from "@components/ui/pagination";
import Image from "next/image";
import { Table } from "@components/ui/table";
import ActionButtons from "@components/common/action-buttons";
import { siteSettings } from "@settings/site.settings";
import { useTranslation } from "next-i18next";
import { useIsRTL } from "@utils/locals";
import { ShopPaginator } from "@ts-types/generated";

type IProps = {
  shops: ShopPaginator | null | undefined;
  onPagination: (current: number) => void;
};


const ShopList = ({ shops, onPagination }: IProps) => {
  const { data, paginatorInfo } = shops! ?? {};
  const { t } = useTranslation();
  const { alignLeft, alignRight } = useIsRTL();

  const columns = [
    {
      title: t("table:table-item-logo"),
      dataIndex: "logo",
      key: "logo",
      align: "center",
      width: 74,
      render: (logo: any, record: any) => (
           < Image        quality='40'
          src={logo?.thumbnail ?? siteSettings.product.placeholder}
          alt={record?.name}
          layout="fixed"
          width={42}
          height={42}
          className="rounded overflow-hidden"
        />
      ),
    },
    {
      title: t("table:table-item-title"),
      dataIndex: "name",
      key: "name",
      align: alignLeft,
      render: (name: any) => <span className="whitespace-nowrap">{name}</span>,
    },
    {
      title: t("table:table-item-owner-name"),
      dataIndex: "owner",
      key: "owner",
      align: "center",
      render: (owner: any) => owner.name,
    },
    {
      title: t("table:table-item-total-products"),
      dataIndex: "products_count",
      key: "products_count",
      align: "center",
    },
    {
      title: ("Commission Type"),
      dataIndex: "commission_type",
      key: "commission_type",
      align: "center",
      render: (commission_type: any) => (commission_type)?commission_type:"not defined",
    },
    {
      title: t("table:table-item-actions"),
      dataIndex: "id",
      key: "actions",
      align: alignRight,
      render: (id: string, { slug, is_active }: any) => {
        return (
          <ActionButtons
            id={id}
            detailsUrl={`/commission/${id}`}
          />
        );
      },
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
          scroll={{ x: 800 }}
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

export default ShopList;
