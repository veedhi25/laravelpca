import usePrice from "@utils/use-price";
import { useEffect, useState } from "react";
interface Props {
  className?: string;
}

const OrderInformation = (props: Props) => {
  
  
  
  const { price: amount } = usePrice(data?.amount);
  
  const [data,setData] = useState()
  function getDelivery(){
    if(localStorage.getItem('delivery')){
      var delivery=JSON.parse(localStorage.getItem('delivery'))
      setData(delivery)
    }
  }
  useEffect(()=>{
    getDelivery()
  },[getDelivery])

  return (
    <div className={props.className}>

      <div className="mt-4">
        <div className="flex justify-between mb-3">
          <p className="text-sm text-body">{t("Sub Total")}</p>
          <span className="text-sm text-body">{amount}</span>
        </div>
        {/* <div className="flex justify-between mb-3">
          <p className="text-sm text-body">{t("text-tax")}</p>
          <span className="text-sm text-body">{tax}</span>
        </div> */}
        <div className="flex justify-between mb-3">
          <p className="text-sm text-body">{("")}</p>
          <span className="text-sm text-body">{data?.distance} km</span>
        </div>
        <div className="flex justify-between border-t-4 border-double border-border-200 pt-4">
          <p className="text-base font-semibold text-heading">
            {("total")}
          </p>
          <span className="text-base font-semibold text-heading">{amount}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderInformation;
