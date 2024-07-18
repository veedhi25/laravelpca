import Card from "@components/common/card";
import Layout from "@components/layouts/admin";
import Search from "@components/common/search";
import CustomerList from "@components/user/user-list";
import LinkButton from "@components/ui/link-button";
import { useState } from "react";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useUsersQuery } from "@data/user/use-users.query";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ROUTES } from "@utils/routes";
import { MoreIcon } from "@components/icons/more-icon";
import Link from "next/link";
import Button from "@components/ui/button";
import { useRouter } from "next/router";
import { useModalAction } from "@components/ui/modal/modal.context";
import { SortOrder } from "@ts-types/generated";
import { useStudentsQuery } from "@data/user/use-students.query";
import Pagination from "@components/ui/pagination";

// object of indian cities with lat lng




export default function Customers() {

  const [searchTerm, setSearchTerm] = useState("");
    const [type, setType] = useState("");
    const [category, setCategory] = useState("");
    const [page, setPage] = useState(1);
    const { t } = useTranslation();
    const [orderBy, setOrder] = useState("created_at");
    const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
    const [visible, setVisible] = useState(false);

    const { openModal } = useModalAction();

    const {data:users} = useStudentsQuery({limit: 50, text: searchTerm, page})

   
    const {query} = useRouter();
    console.log('query', query)

    const toggleVisible = () => {
        setVisible((v) => !v);
      };

    function handleImportModal() {
        openModal("EXPORT_IMPORT_ADMIN_PRODUCT");
      }

      function handleSearch({ searchText }: { searchText: string }) {
        setSearchTerm(searchText);
        setPage(1);
      }
      
      function handlePagination(current: any) {
        setPage(current);
      }


  return (

    <>

    <Card className="flex flex-col mb-8">
      <div className="w-full flex flex-col md:flex-row space-x-2 justify-evenly items-center">
        
        <div className="md:w-1/4 mb-4 md:mb-0">
          <h1 className="text-lg font-semibold text-heading">
            {t("Students")}
          </h1>
        </div>

        <div className="w-full md:w-2/4 flex flex-col   items-center ms-auto">
          <Search onSearch={handleSearch} />
        </div>
        <Link href='/users/create'><Button className="bg-green-700">
          Add Student +
        </Button></Link>

        {/*<Button
            onClick={handleImportModal}
            className="mt-5 w-full md:hidden"
          >
            {t("common:text-export-import")}
        </Button>
        
        <button
            onClick={handleImportModal}
            className="hidden md:flex w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 items-center justify-center flex-shrink-0 ms-5 transition duration-300"
          >
          <MoreIcon className="w-3.5 text-body" />
        </button>*/}
        
      </div>

    </Card>
    <CustomerList customers={users}  />
    {/* <Pagination current={page} 
                total={users?.total} 
                pageSize={users?.per_page} 
                onChange={handlePagination}
                /> */}
  </>
  );
}

Customers.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["table", "common", "form"])),
  },
});

