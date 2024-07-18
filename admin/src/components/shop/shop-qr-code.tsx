
import React from 'react';
import QRCode from "react-qr-code";

export default function ShopQrCode({url, size,title}:any) {

  return (

    <div className='h-10 w-10'>

         <QRCode value={url}
            size={size}
            title={title}
            bgColor="#ffffff"
            fgColor="black"
            level="Q"
            renderAs="svg"
          />

    </div>
  )
}
