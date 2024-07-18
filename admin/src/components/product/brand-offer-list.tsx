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
import {
  adminOnly,
  getAuthCredentials,
  hasAccess,
} from "@utils/auth-utils";
import { useIsRTL } from "@utils/locals";
import Checkbox from "@components/ui/checkbox/checkbox";
import {useUpdateProductMutation} from "@data/product/offer-status-update.mutation"

export type IProps = {
  products?: ProductPaginator;
  onPagination: (current: number) => void;
};

const BrandOfferList = ({ products, onPagination }: IProps) => {
    
  const { permissions } = getAuthCredentials();
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

  // console.log('brand offer list', products)

  const router = useRouter();
  const { t } = useTranslation();
  const { alignLeft, alignRight } = useIsRTL();
   // console.log('category', products)

  let columns = [
    {
      title: t("table:table-item-image"),
      dataIndex: "image",
      key: "image",
      align: 'left',
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
      align: 'left',
      width: 200,
      ellipsis: true,
    },
    {
      title: t("table:table-item-group"),
      dataIndex: "type",
      key: "type",
      width: 120,
      align: "left",
      ellipsis: true,
      render: (type: any) => (
        <span className="whitespace-normal truncate">{type?.name}</span>
      ),
    },

    // product categories
    {
      title: t("Categories"),
      dataIndex: "categories",
      key: "categories",
      width: 120,
      align: "left",
      ellipsis: true,
      render: (categories: any) => (
        // console.log('product category',categories),
        <span className="whitespace-normal truncate">
          {categories?.map((category: any) => (
           <p>{'•' + ' ' + category?.name }</p>
          ))}
        </span>
      ),
    },
    
    {
      title: t("table:table-item-shop"),
      dataIndex: "shop",
      key: "shop",
      width: 120,
      align: "center",
      ellipsis: true,
      render: (shop: Shop) => (
        <span className="whitespace-normal truncate">{shop?.name}</span>
      ),
    },

    // {
    //   title: "Product Type",
    //   dataIndex: "product_type",
    //   key: "product_type",
    //   width: 120,
    //   align: "left",
    //   render: (product_type: string) => (
    //     <span className="whitespace-nowrap truncate">{product_type}</span>
    //   ),
    // },

    // {
    //   title: t("table:table-item-unit"),
    //   dataIndex: "price",
    //   key: "price",
    //   align: 'left',
    //   width: 100,
    //   render: (value: Product, record: Product) => {
    //     if (record?.product_type === ProductType.Variable) {
    //       const { price: max_price } = usePrice({
    //         amount: record?.sale_price as number,
    //       });
    //       const { price: min_price } = usePrice({
    //         amount: record?.min_price as number,
    //       });
    //       return (
    //         <span
    //           className="whitespace-nowrap"
    //           title={`${min_price} - ${max_price}`}
    //         >{`${min_price} - ${max_price}`}</span>
    //       );
    //     } else {
    //       const { price: sale_price } = usePrice({
    //         amount: record.sale_price as number,
    //       });
    //       const { price: price } = usePrice({
    //         amount: record.price as number,
    //       });
    //       return (
    //         <span className=" text-green-600 font-semibold font-xl flex flex-col whitespace-nowrap" title={sale_price}>
    //           {sale_price} <del className="font-light text-red-500">{price}</del>
    //         </span>
    //       );
    //     }
    //   },
    // },

    // product tax
    // {
       
    //   title: t("Tax"),
    //   dataIndex: "tax",
    //   key: "tax",
    //   align: alignLeft,
    //   width: 100,
    //   render: (tax: string, { name }: { name: string }) => {
    //    const tx = tax?.toString();
    //    // convert tax to array
    //     const taxArray = tx?.split(',');
    //     // get tax name
    //     const taxName = taxArray?.[6].split(':')[1].replace('"','').replace('"','');
        
    //     return taxName ?? tax;
        
    //   },
    
     
    // },

    
    // {
    //   title: t("table:table-item-quantity"),
    //   dataIndex: "quantity",
    //   key: "quantity",
    //   align: "center",
    //   width: 100,
    // },

   { 
     title: "Featured",
      dataIndex: "isfeatured",
      key: "isfeatured",
      align: "left",
      width: 74,
      render: (logo: any, record: any) => (
        hasAccess(adminOnly, permissions) && ( 
        <div className=" ">
          <Checkbox
              onChange={checkboxChanged}
              id={"isFeatured_"+record.id}
              name={"isFeatured_"+record.id}
              height={42}
              width={42}
              checked={(record.is_featured==1)?"checked":""}
            />
        </div> )
      ),
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
      dataIndex: "slug",
      key: "actions",
      align: "center",
      width: 80,
      render: (slug: string, record: Product) => (
        <ActionButtons
          id={record?.id}
          editUrl={`${router.asPath}/${slug}/edit`}
          deleteModalView="DELETE_PRODUCT"
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
          data={data.filter((item)=> item?.is_brand_offer == 1)}
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

export default BrandOfferList;
