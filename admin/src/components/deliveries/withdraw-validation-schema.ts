import * as yup from "yup";
export const withdrawValidationSchema = yup.object().shape({
    sender_name:yup.string().required('Sender Name is required field'),
    reciever_name:yup.string().required('Reciever Name is required field'), 
    sender_complete_address:yup.string().required('Sender amount is required field'),
    reciever_complete_address:yup.string().required('Reciever complete address is required field'),
    sender_phone_number:yup.string().required('sender phone number is required field'),
    reciever_phone_number:yup.string().required('reciever phone number is required field'),
  
    package_name:yup.string().required('package name is required field'),
    package_weight:yup.string().required('package weight is required field'),
    package_qty:yup.string().required('package quantity is required field'),
    total_weight:yup.string().required('total weight is required field'),
});
// pickup_location:yup.string().required('Pickup location is required field'),
//     drop_location:yup.string().required('Drop location is required field'),
// payment_method:yup.string().required('payment method is required field'),



