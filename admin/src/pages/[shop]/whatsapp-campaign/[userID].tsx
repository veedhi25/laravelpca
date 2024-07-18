import AppLayout from '@components/layouts/app'
import ShopLayout from '@components/layouts/shop'
import { useLogsQuery } from '@data/logs/use-logs.query';
import React from 'react'

export default function Dashboard({props}:any) {

  const {
    data,
    isLoading: loading,
    error,
  } = useLogsQuery({
      limit: 20,
      // page,
      // type,
      // text: searchTerm,
      // orderBy,
      // sortedBy,
  });
    

  return (

      <div className='w-full'>
            <h1 className=''>Dashboard</h1>
      </div>

  )
}


Dashboard.Layout = ShopLayout
