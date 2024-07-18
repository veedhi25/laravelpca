import Layout from "@components/layout/layout";
import DefaultLayout from "@components/layout/default-layout";
import { careers } from "@settings/careers.settings";
import { Link, Element } from "react-scroll";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Head from "next/head";

function makeTitleToDOMId(title: string) {
  return title.toLowerCase().split(" ").join("_");
}

export default function AboutUs() {
  const { t } = useTranslation("policy");
  const { title, date, content } = careers;

  return (
    <> 
    <Head>
      <title>{t('Carrers | Acharyakulam')}</title>
      <link rel="canonical" href={`https: //retailunnati.com/careers`}/>
      {/* <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(
      {
        
        "@context": "http://schema.org",
        "@type": "JobPosting",
        "title": "Software Engineer",
        "datePosted": "2019-01-01",
        "validThrough": "2019-12-31",
        "employmentType": "FULL_TIME",
        "hiringOrganization": {
          "@type": "Organization",
          "name": "Acharyakulam",
          "sameAs": "https: //retailunnati.com",
        },
        "jobLocation": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Lowcal Ventures Pvt Ltd Plot No: 130 | Phase-1 | Industrial Area | Chandigarh",
            "addressLocality": "Phase-1 | Industrial Area | Chandigarh",
            "addressRegion": "Chandigarh",
            "postalCode": "	160002",
            "addressCountry": "India"
          },
        },
        "baseSalary": {
          "@type": "MonetaryAmount",
          "currency": "INR",
          "value": {
            "@type": "QuantitativeValue",
            "value": "20000",
            "unitText": "MONTH",
          },
        },
        "description": "You will be working on a team of talented developers to build a new product.",
        "identifier": {
          "@type": "PropertyValue",
          "name": "job_id",
          "value": "1",
        },
        "experienceRequirements": "Minimum 2 years of experience in software development",
        "qualifications": "Bachelor's degree in Computer Science or related field",
      }
      )}}
      /> */}

    </Head>
    <section className="max-w-1920 w-full mx-auto py-8 px-4 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20">
      <header className="sm:mt-2 xl:mt-4 mb-10 lg:mb-14">
        <h1 className="text-xl md:text-2xl sm:text-3xl 2xl:text-4xl text-heading font-bold mb-4 sm:mb-5 2xl:mb-7">
          {t(title)}
        </h1>
        <p className="text-sm md:text-base text-body-dark 2xl:text-lg px-0.5">
          {date}
        </p>
      </header>
      {/* End of page header */}

      <div className="flex flex-col md:flex-row">
        <nav className="md:w-72 xl:w-3/12 mb-8 md:mb-0">
          <ol className="sticky md:top-16 lg:top-22 bg-gray-100 z-10">
            {content?.map((item) => (
              <li key={item.title}>
                
                <Link
                  spy={true}
                  offset={-120}
                  smooth={true}
                  duration={500}
                  to={makeTitleToDOMId(item.title)}
                  activeClass="text-sm lg:text-base text-heading font-semibold"
                  className="cursor-pointer inline-flex py-3 text-sub-heading uppercase"
                >
                  {t(item.title)}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        {/* End of section scroll spy menu */}

        <div className="md:w-9/12 md:ps-8 md:pb-96">
          {content?.map((item) => (
            <Element
              key={item.title}
              name={makeTitleToDOMId(item.title)}
              className="mb-10"
            >
              <h2 className="text-lg md:text-xl lg:text-2xl text-heading font-bold mb-4">
                {t(item.title)}
              </h2>
              <div
                className="text-body-dark leading-loose"
                dangerouslySetInnerHTML={{ __html: t(item.description) }}
              />
            </Element>
          ))}
        </div>
        {/* End of content */}
      </div>
    </section>
    </>
  );
}

AboutUs.Layout = DefaultLayout;

export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "policy"])),
    },
  };
};
