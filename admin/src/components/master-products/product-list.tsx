import Pagination from "@components/ui/pagination";
import Image from "next/image";
import { Table } from "@components/ui/table";
import ActionButtons from "@components/common/action-buttons";
import { siteSettings } from "@settings/site.settings";
import usePrice from "@utils/use-price";
import Badge from "@components/ui/badge/badge";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import {
  Product,
  ProductPaginator,
  ProductType,
  Shop,
} from "@ts-types/generated";
import { useIsRTL } from "@utils/locals";
import Checkbox from "@components/ui/checkbox/checkbox";
import {useUpdateProductMutation} from "@data/product/product-status-update.mutation"
import { useTaxesQuery } from "@data/tax/use-taxes.query";

export type IProps = {
  products?: ProductPaginator;
  onPagination: (current: number) => void;
};

const ProductList = ({ products, onPagination }: IProps) => {

  const { mutate: updateProduct, isLoading: updating } = useUpdateProductMutation();

  function checkboxChanged(e:any){

    var id=e.target.id.split('_')[1];

    var value=(e.target.checked)?1:0;

    updateProduct({
      variables: {
        id:id,
        input:{
          is_featured:value
        }
      }
    });

  }


  const { data, paginatorInfo } = products! ?? {};

  const router = useRouter();
  const { t } = useTranslation();
  const { alignLeft, alignRight } = useIsRTL();

  let columns = [

    {
      title: t("table:table-item-image"),
      dataIndex: "image",
      key: "image",
      align: alignLeft,
      width: 74,
      render: (image: any, { name }: { name: string }) => (

           < Image        quality='40'
          src={image?.thumbnail ?? siteSettings.product.placeholder}
          alt={name}
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
      width: 100,
      ellipsis: true,
      render: (name: string) => (
        <span className="whitespace-normal">{name}</span>
      )
    },

    {
      //tax
      title: t("Tax"),
      dataIndex: "tax",
      key: "tax",
      align: alignLeft,
      width: 100,
      render: (tax: string, { name }: { name: string }) => {
       const tx = tax?.toString();
       // convert tax to array
        const taxArray = tx?.split(',');
        // get tax name
        const taxName = taxArray?.[6].split(':')[1].replace('"','').replace('"','');
        
        return taxName ?? tax;
        
      },
    
     
    },
    
    
    {
      title: t("table:table-item-group"),
      dataIndex: "type",
      key: "type",
      width: 120,
      align: "center",
      ellipsis: true,
      render: (type: any) => (
        <span className="whitespace-nowrap truncate">{type?.name}</span>
      ),
    },

    {
      title: t("Categories"),
      dataIndex: "categories",
      key: "categories",
      width: 120,
      align: "left",
      ellipsis: true,
      render: (categories: any) => (
        <span className="whitespace-normal truncate">
          {categories?.map((category: any) => (
           <p>{'•' + ' ' + category?.name }</p>
          ))}
        </span>
      ),
    },

    {
      title: "Product Type",
      dataIndex: "product_type",
      key: "product_type",
      width: 120,
      align: "center",
      render: (product_type: string) => (
        <span className="whitespace-nowrap truncate">{product_type}</span>
      ),
    },

    {
      title: t("table:table-item-unit"),
      dataIndex: "price",
      key: "price",
      align: alignRight,
      width: 100,
      render: (value: number, record: Product) => {
        if (record?.product_type === ProductType.Variable) {
          const { price: max_price } = usePrice({
            amount: record?.max_price as number,
          });
          const { price: min_price } = usePrice({
            amount: record?.min_price as number,
          });
          return (
            <span
              className="whitespace-nowrap"
              title={`${min_price} - ${max_price}`}
            >{`${min_price} - ${max_price}`}</span>
          );
        } else {
          const { price } = usePrice({
            amount: value,
          });
          return (
            <span className="whitespace-nowrap" title={price}>
              {price}
            </span>
          );
        }
      },
    },

    {
      title: t("table:table-item-status"),
      dataIndex: "status",
      key: "status",
      align: "center",
      width: 100,
      render: (status: string) => (
        <Badge
          text={status}
          color={
            status.toLocaleLowerCase() === "draft"
              ? "bg-yellow-400"
              : "bg-accent"
          }
        />
      ),
    },
    
    {
      title: t("table:table-item-actions"),
      dataIndex: "id",
      key: "actions",
      align: "center",
      width: 80,
      render: (id: string, record: Product) => (
        <ActionButtons
          id={record?.id}
          editUrl={`${router.asPath}/${id}/edit`}
          deleteModalView="MASTER_DELETE_PRODUCT"
        />
      ),
    },
  ];

  if (router?.query?.shop) {
    columns = columns?.filter((column) => column?.key !== "shop");
  }

  return (
    <>
      <div className="rounded overflow-hidden shadow mb-6">
        <Table
          /* @ts-ignore */
          columns={columns}
          emptyText={t("table:empty-table-data")}
          data={data}
          rowKey="id"
          scroll={{ x: 900 }}
        />
      </div>

      {!!paginatorInfo.total && (
        <div className="flex justify-end items-center">
          <Pagination
            total={paginatorInfo.total}
            current={paginatorInfo.currentPage}
            pageSize={paginatorInfo.perPage}
            onChange={onPagination}
            showLessItems
          />
        </div>
      )}
    </>
  );
};

export default ProductList;
