
import isEmpty from "lodash/isEmpty";

interface Item {
  
  id: string | number;
  name: string;
  slug: string;
  status: string;
  image: {
    thumbnail: string;
    [key: string]: unknown;
  };

  price: number;
  sale_price?: number;
  quantity?: number;
  [key: string]: unknown;
}

interface Variation {
  id: string | number;
  title: string;
  status: string;
  price: number;
  sale_price?: number;
  quantity: number;
  [key: string]: unknown;
}

export function generateCartItem(item: Item, variation: Variation) {
  const { id, name, slug, image, price, sale_price, status, quantity, unit,tax } = item;

  if (!isEmpty(variation)) {
    return {
      id: `${id}.${variation.id}`,
      productId: id,
      name: `${name} - ${variation.title}`,
      slug,
      tax,
      status,
      unit,
      stock: variation.quantity,
      price: variation.sale_price ? variation.sale_price : variation.price,
      image: image?.thumbnail,
      shop:item.shop,
      variationId: variation.id,
    };
  }

  return {
    id,
    name,
    slug,
    status,
    tax,
    unit,
    image: image?.thumbnail,
    shop:item.shop,
    stock: quantity,
    price: sale_price ? sale_price : price,
  };
}
