
import SectionWithCardGroup from "@components/common/section-with-card-group";
import { useCheckout } from "@contexts/checkout.context";
import { siteSettings } from "@settings/site.settings";
import { useEffect } from "react";
import { useCart } from "@contexts/quick-cart/cart.context";

interface Props {
  count: number;
}

const Schedule = ({ count, heading }: Props) => {
  const { updateDeliveryTime } = useCheckout();
  const { items } = useCart();

  function isDeliveryAvailable():Boolean{
    var delivery_status=false;
    items.forEach(element=>{
      if(element?.shop?.delivery_status == 1){
        delivery_status=true;
      }
    })
    return delivery_status;
  }

  // getShopCategory
  function getShopCategory(){

    var shopCategory = items[0]?.shop?.shop_categories?.replace(/[{":,0123456789}]/g,'').slice(5,-3)

    return shopCategory;
  }

  // console.log('items',items);
  // console.log('shop category',getShopCategory());


  useEffect(() => {
    updateDeliveryTime(siteSettings.deliverySchedule[0]);
  }, []);


  function handleSelect(item: any) {
    updateDeliveryTime(item);
  }

  return (
    <SectionWithCardGroup
      count={count}
      heading={heading ? heading : "Delivery or Appointment Schedule"}
      items={siteSettings.deliverySchedule}
      onSelect={handleSelect}
      delivery_status={isDeliveryAvailable()}
      shopCategory={getShopCategory()}
    />
  );
};

export default Schedule;
