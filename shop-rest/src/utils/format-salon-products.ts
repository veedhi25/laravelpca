
export function formatSalonProduct(product: any) {
    return {
      product_id: product?.productId ? product.productId : product.id,
      ...(product?.variationId
        ? { variation_option_id: product.variationId }
        : {}),
      order_quantity: 1,
      unit_price: product.sale_price,
      subtotal: product.sale_price,
    };
  }
  