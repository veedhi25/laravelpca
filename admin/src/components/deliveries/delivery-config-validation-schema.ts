import * as yup from "yup";
export const deliveryConfigSchema = yup.object().shape({
    free_delivery_order_value:yup.string().required('Order value is required field'),
    delivery_charges:yup.string().required('Delivery Charges is required field'), 
});



