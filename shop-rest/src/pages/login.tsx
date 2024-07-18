import LoginForm from '@components/auth/login'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react'

export default function Login() {
  return (
    <div className='  flex justify-center items-center border w-full h-screen  py-20 align-center'>
        <LoginForm/>
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
