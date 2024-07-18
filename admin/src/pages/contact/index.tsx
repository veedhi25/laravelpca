
import Card from "@components/common/card";
import Layout from "@components/layouts/admin";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { adminOnly } from "@utils/auth-utils";
import { useContactsQuery } from "@data/contact/use-contacts.query";
import { useState } from "react";
import SortForm from "@components/common/sort-form";
import { SortContacts } from "@ts-types/generated";
import ContactsList from "@components/contacts/contacts-list";

export default function ContactsPage() {

  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState("created_at");
  const [sortedBy, setColumn] = useState<SortContacts>(SortContacts.Desc);
  
  const {
    data,
    isLoading: loading,
    error,
  } = useContactsQuery({
    limit: 10,
    page,
    sortedBy,
    orderBy,
  });

  if (loading) return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error.message} />;

  

  function handlePagination(current: any) {
    setPage(current);
  }

  // console.log('contact data',data?.contacts.paginatorInfo);
  
  return (
    <>
      <Card className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div className="md:w-1/4 mb-4 md:mb-0">
          <h1 className="text-lg font-semibold text-heading">
            {t("Customer Queries")}
          </h1>
        </div>

        <SortForm
          showLabel={false}
          className="w-full md:w-2/4"
          onSortChange={({ value }: { value: SortContacts }) => {
            setColumn(value);
          }}
          onOrderChange={({ value }: { value: string }) => {
            setOrder(value);
          }}
          options={[
            { value: "amount", label: "Amount" },
            { value: "created_at", label: "Created At" },
            { value: "updated_at", label: "Updated At" },
          ]}
        />
      </Card>

      <ContactsList
        contacts={data?.contacts}
        onPagination={handlePagination}
      />

    </>
  );
}
ContactsPage.authenticate = {
  permissions: adminOnly,
};

ContactsPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["table", "common", "form"])),
  },
});
