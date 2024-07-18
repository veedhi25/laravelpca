import React from 'react'

export default function UpiPayment({data,props}:any) {

console.log('order link', (data[0]))
console.log('order link props', props)

const upiApps = [
    '/upi/bhim.png','/upi/upi.jpeg','/upi/gpay.png','/upi/paytm.png','/upi/phone-pe.jpg','/upi/qr.jpg'
]

const upi_id = 'vinendersingh91@okicici';

const reciever_name = 'vinender';
const merchant_code = '1234';

const modifiedLinks = Object.values(data)[0]?.map((link, index) => {
  let modifiedLink = link.replace("pa=cf.lowcalventurespvtltd@icici", `pa=${upi_id}`);
  modifiedLink = modifiedLink.replace("pn=Lowcal%20Ventures%20Pvt%20Ltd", `pn=${reciever_name}`);
  // modifiedLink = modifiedLink.replace("mc=5399", `mc=${merchant_code}`);
  return modifiedLink;
});

console.log('order link modified',modifiedLinks);

return (
  <div className='grid grid-cols-3 place-items-center h-96  gap-x-6 px-10 w-full bg-white'>
    {modifiedLinks.map((link, index) => {
      const app = upiApps[index];
      return (
        <img src={app} className=' items-center rounded-full object-contain h-20 border w-20' 
             key={app} alt={'upi-app'} onClick={() => window.open(link)}/>
      );
    })}
  </div>
)

    
}
