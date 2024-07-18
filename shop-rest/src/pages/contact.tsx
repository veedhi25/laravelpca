import Input from "@components/ui/input";
import Layout from "@components/layout/layout";
import { useForm } from "react-hook-form";
import TextArea from "@components/ui/text-area";
import Button from "@components/ui/button";
import { useContactMutation } from "@data/customer/use-contact.mutation";
import { siteSettings } from "@settings/site.settings";
import { useTranslation } from "next-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { parseContextCookie } from "@utils/parse-cookie";
import pick from "lodash/pick";
import { useRouter } from "next/router";
import { useCustomerQuery } from "@data/customer/use-customer.query";
import ErrorMessage from "@components/ui/error-message";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import { ContactUpload, User } from "@ts-types/generated";
import { toast } from "react-toastify";
import { useContactUploadMutation } from "@data/contact/use-contact-upload.query";
import Head from "next/head";



export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const cookies = parseContextCookie(context?.req?.headers?.cookie);
  if (!cookies?.auth_token) {
    return { redirect: { destination: "/", permanent: false } };
  }
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["common", "forms"])),
    },
  };
};


const contactFormSchema = yup.object().shape({
  name: yup.string().required(" Name required"),
  email: yup
    .string()
    .email("error-email-format")
    .required(" Email required"),
  subject: yup.string().required("error-subject-required"),
  description: yup.string().required("error-description-required"),
});



interface Props {
    user: ContactUpload;
  }
  
  type UserFormValues = {
    name?: ContactUpload["name"];
    email?: ContactUpload["email"];
    subject?: ContactUpload["subject"];
    description?: ContactUpload["description"];
  };

export default function ContactPage({user} : Props) {

    const { register, handleSubmit,formState: { errors }, reset, control } = useForm<UserFormValues>(
        {
            defaultValues: {
              ...(user &&
                pick(user, [
                  "name",
                  'email',
                  'subject',
                  'description',
                ])),
            },
            resolver: yupResolver(contactFormSchema),
          }
        );
        
  const router = useRouter();

  const { t } = useTranslation("common");

  const { isLoading, data, error } = useCustomerQuery();

  const { mutate: storeContact } =useContactUploadMutation();

  if (error) return <ErrorMessage message={error.message} />;


  function onSubmit(values: any) {
    storeContact(
      {
        name: values.name,
        email: values.email,
        subject: values.subject,
        description: values.description,
      },
      {
        onSuccess: () => {
          toast.success(t("Thank You for your Query. Our team will get back to you soon."));
          reset();
          setTimeout(() => {
            router.push("/contact")
          }, 1000);
        },
      }
    );
  }
  
  return (

    <> 

    <Head>
      <link rel="canonical" href={`https: //retailunnati.com/contact`}/>
    </Head>
    
    <div className="mt-0 lg:mt-16 w-full bg-gray-100">
      <div className="flex flex-col md:flex-row max-w-7xl w-full mx-auto py-10 px-5 xl:py-14 xl:px-8 2xl:px-14">
        {/* sidebar */}
        <div className="w-full md:w-72 lg:w-96 bg-light p-5 flex-shrink-0 order-2 md:order-1">
          <div className="w-full flex items-center justify-center overflow-hidden mb-8">
            <img
              src="/buylowcal-logo.webp"
              alt={t("nav-menu-contact")}
              className="w-full h-auto"
            />
          </div>

          <div className="flex flex-col mb-8">
            <span className="font-semibold text-heading mb-3">
              {t(" address")}
            </span>
            <span className="text-sm text-body">
              {siteSettings.author.address}
            </span>
          </div>

          <div className="flex flex-col mb-8">
            <span className="font-semibold text-heading mb-3">
              {t("Phone No")}
            </span>
            <span className="text-sm text-body">
              {siteSettings.author.phone}
            </span>
          </div>

          <div className="flex flex-col mb-8">
            <span className="font-semibold text-heading mb-3">
              {t("Website")}
            </span>
            <div className="flex items-center justify-between">
              <span className="text-sm text-body">
                {siteSettings.author.websiteUrl}
              </span>
              
              <a
                href={siteSettings.author.websiteUrl}
                target="_blank"
                className="text-sm text-accent font-semibold hover:text-accent-hover focus:outline-none focus:text-blue-500"
              >
                {t("visit")}
              </a>
            </div>
          </div>

          <div className="flex flex-col mb-8">
            <span className="font-semibold text-heading mb-4">
              {t("Follow-us")}
            </span>
            <div className="flex items-center justify-start">
              {siteSettings.author.social?.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  className={`text-muted focus:outline-none me-8 last:me-0 transition-colors duration-300 hover:${item.hoverClass}`}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div className="w-full order-1 md:order-2 mb-8 md:mb-0 md:ms-7 lg:ms-9 p-5 md:p-8 bg-light">
          <h1 className="mb-7 text-xl md:text-2xl font-body font-bold text-heading">
            {t("Question,Comments or Concern?")}
          </h1>
          
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label={t("Name")}
                {...register("name")}
                variant="outline"
                error={t(errors.name?.message!)}
              />
              <Input
                label={t("Email")}
                {...register("email")}
                type="email"
                variant="outline"
                error={t(errors.email?.message!)}
              />
            </div>

            <Input
              label={t("Subject")}
              {...register("subject")}
              variant="outline"
              className="my-6"
              error={t(errors.subject?.message!)}
            />

            <TextArea
              label={t("Description")}
              {...register("description")}
              variant="outline"
              className="my-6"
              rows={6}
              error={t(errors.description?.message!)}
            />

            <Button loading={isLoading} disabled={isLoading}>
              {t("Submit")}
            </Button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

ContactPage.Layout = Layout;


// export const getStaticProps = async ({ locale }: any) => {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ["common"])),
//     },
//   };
// };
