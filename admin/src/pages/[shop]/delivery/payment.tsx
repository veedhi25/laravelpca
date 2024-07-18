import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PaymentForm from "@components/deliveries/payment-form";
import { GetServerSideProps } from "next";
import { adminOwnerAndStaffOnly } from "@utils/auth-utils";
import { parseContextCookie } from "@utils/parse-cookie";
import ShopLayout from "@components/layouts/shop";

export default function DeliveryPayment() {
  const { t } = useTranslation();
  return (
    <>
    <div className='invitation-status-page bg-gray-100 flex  flex-col'>  
      <div className='flex mx-4 lg:mx-10 space-x-4 lg:space-x-20'>

        <div className="w-full overflow-hidden">
          <div className="py-5 sm:py-8 flex border-b border-dashed border-gray-300">
            <h1 className="text-lg font-semibold  text-heading">
              {("Delivery Payment")}
            </h1>
          </div>
          <div className="lg:max-w-2xl w-full space-y-6 order-2 lg:order-1">
            <div className="shadow-700 bg-light p-5 md:p-8">
                <PaymentForm />
            </div>
          </div>
       
        </div>
      </div>
    </div>
      
    </>
  );
}

DeliveryPayment.authenticate = {
  permissions: adminOwnerAndStaffOnly,
};
DeliveryPayment.Layout = ShopLayout;

export const getServerSideProps: GetServerSideProps = async (context: any) => {  
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["common"])),
    },
  };
};
