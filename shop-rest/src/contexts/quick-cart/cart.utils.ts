import Coupon from "@components/checkout/coupon";
import { useCheckout } from "@contexts/checkout.context";

export interface Item {
  id: string | number;
  price: number;
  quantity?: number;
  status?: string;
  stock?: number;
  [key: string]: any;
}

export interface UpdateItemInput extends Partial<Omit<Item, "id">> {}

export function addItemWithQuantity(
  items: Item[],
  item: Item,
  quantity: number
) {
  if (quantity <= 0)
    throw new Error("cartQuantity can't be zero or less than zero");
  const existingItemIndex = items.findIndex(
    (existingItem) => existingItem.id === item.id
  );



  if (existingItemIndex > -1) {
    const newItems = [...items];
    newItems[existingItemIndex].quantity! += quantity;
    return newItems;
  }
  return [...items, { ...item, quantity }];
}

export function removeItemOrQuantity(
  items: Item[],
  id: Item["id"],
  quantity: number
) {
  return items.reduce((acc: Item[], item) => {
    if (item.id === id) {
      const newQuantity = item.quantity! - quantity;

      return newQuantity > 0
        ? [...acc, { ...item, quantity: newQuantity }]
        : [...acc];
    }
    return [...acc, item];
  }, []);
}
// Simple CRUD for Item
export function addItem(items: Item[], item: Item) {
  return [...items, item];
}

export function getItem(items: Item[], id: Item["id"]) {
  return items.find((item) => item.id === id);
}

export function updateItem(
  items: Item[],
  id: Item["id"],
  item: UpdateItemInput
) {
  return items.map((existingItem) =>
    existingItem.id === id ? { ...existingItem, ...item } : existingItem
  );
}

export function removeItem(items: Item[], id: Item["id"]) {
  return items.filter((existingItem) => existingItem.id !== id);
}
export function inStock(items: Item[], id: Item["id"]) {
  const item = getItem(items, id);
  if (item) return item["quantity"]! < item["stock"]!;
  return false;
}

// console.log('inStock', inStock)

//status
export function isStatus(items: Item[], id: Item["id"]) {
  const item = getItem(items, id);
  if (item) return item["status"] === "publish";
  return false;
}

// console.log('isStatus', isStatus)



export const calculateItemTotals = (items: Item[]) =>
  items.map((item) => ({
    ...item,
    itemTotal: item.price * item.quantity!,
  }));

export const calculateTotal = (items: Item[]) =>{
  var shops:any=[]
  var total=items.reduce((total, item) =>{
    if(item.shop){
      if(item.shop.delivery_status){
        var index=shops.findIndex((shop:any)=>shop.slug==item.shop.slug)
        if(!(index>=0)){
          shops.push({
            slug:item.shop.slug,
            delivery_charges:item.shop.delivery_charges,
            free_delivery_order_value:item.shop.free_delivery_order_value,
            order_price:item.quantity! * item.price   
          })
        }else{
          shops[index].order_price=(item.quantity! * item.price )+shops[index].order_price;
        }
      }
    }
    return total + item.quantity! * item.price
  } , 0);
  var delivery_charges=0;
  shops.forEach((shop:any)=>{
    if(shop.order_price<shop.free_delivery_order_value){
      total=total+parseFloat(shop.delivery_charges);
      delivery_charges=delivery_charges+parseFloat(shop.delivery_charges);
    }
  })

  return {
    total:total,
    delivery_charges:delivery_charges
  }
}

export const calculateTotalItems = (items: Item[]) =>
  items.reduce((sum, item) => sum + item.quantity!, 0);

export const calculateUniqueItems = (items: Item[]) => items.length;

interface PriceValues {
  totalAmount: number;
  tax: number;
  shipping_charge: number;
}

export const calculatePaidTotal = (
  { totalAmount, tax, shipping_charge }: PriceValues,
  discount?: number
) => {
  const {  coupon } = useCheckout();

  let paidTotal = totalAmount + tax + shipping_charge;
  // console.log('Coupon type',coupon?.type)
  // console.log('discount',discount)
  
  if (discount) {
    // if coupon type is fixed then subtract discount from total amount
    if (coupon.type === "fixed")  {
      paidTotal = paidTotal - discount;
    }
    // if coupon type is percentage then subtract discount from total amount  
    if (coupon.type === "percentage") {
      paidTotal = paidTotal - (paidTotal * discount*100) / 100;
    }
    // paid total minus percentage of discount
    // paidTotal = paidTotal - (paidTotal * discount) / 100;
    // paidTotal = paidTotal - discount;
  }

  return paidTotal;
};

