import DefaultLayout from '@components/layout/default-layout';
import Layout from '@components/layout/layout';
import { parseContextCookie } from '@utils/parse-cookie';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react'
import ProfileSidebar from "@components/profile/profile-sidebar";


// export const getServerSideProps: GetServerSideProps = async (context: any) => {
//     const cookies = parseContextCookie(context?.req?.headers?.cookie);
//     if (!cookies?.auth_token) {
//       return { redirect: { destination: "/dashboard", permanent: false } };
//     }
//     return {
//       props: {
//         ...(await serverSideTranslations(context.locale, ["common", "forms"])),
//       },
//     };
//   };

export default function StudentDashboard() {

  return (

    // <div className='w-full h-full'>
      <ProfileSidebar className="flex-shrink-0 w-80 mt-10  me-10" />
    // </div>
  )
}


StudentDashboard.Layout = Layout;
