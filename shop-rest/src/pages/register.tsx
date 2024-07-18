
import RegisterForm from '@components/auth/register'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react'

export default function Register() {

  return (

    <div className='w-full h-full bg-white'>
        <RegisterForm/>
    </div>

  )
}

export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "policy"])),
    },
  };
};
