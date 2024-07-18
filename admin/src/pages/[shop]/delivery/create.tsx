import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CreateOrUpdateDeliveryForm from "@components/deliveries/delivery-form";
import { adminOwnerAndStaffOnly } from "@utils/auth-utils";
import { parseContextCookie } from "@utils/parse-cookie";
import ShopLayout from "@components/layouts/shop";
import { GetServerSideProps } from "next";



export default function CreateDeliveryPage() {

  const { t } = useTranslation();

  return (
    
    <>
      <div className='invitation-status-page bg-gray-100 flex  flex-col'>  
        <div className='flex mx-4 lg:mx-10 space-x-4 lg:space-x-20'>

          <div className="w-full overflow-hidden">
            <div className="py-5 sm:py-8 flex border-b border-dashed border-gray-300">
              <h1 className="text-lg font-semibold  text-heading">
                {("Create Delivery")}
              </h1>
            </div>
            <CreateOrUpdateDeliveryForm />
          </div>
        </div>
      </div>
      
    </>
  );
}


CreateDeliveryPage.authenticate = {
  permissions: adminOwnerAndStaffOnly,
};
CreateDeliveryPage.Layout = ShopLayout;

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["common"])),
    },
  };
};