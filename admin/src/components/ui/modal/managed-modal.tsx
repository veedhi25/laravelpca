import Modal from "@components/ui/modal/modal";
import dynamic from "next/dynamic";



import { useModalAction, useModalState } from "./modal.context";
import ResultsTable from "@components/result-table";
import CombineResult from "@components/result-table/combine-result";
const TagDeleteView = dynamic(() => import("@components/tag/tag-delete-view"));
const TaxDeleteView = dynamic(() => import("@components/tax/tax-delete-view"));
const BanCustomerView = dynamic(() => import("@components/user/user-ban-view"));
const ShippingDeleteView = dynamic(
  () => import("@components/shipping/shipping-delete-view")
);
const CategoryDeleteView = dynamic(
  () => import("@components/category/category-delete-view")
);
const PreviewQuestion = dynamic(
  () => import("@components/preview-question/previewQuestion")
);
const ShopCategoryDeleteView = dynamic(
  () => import("@components/shop-categories/category-delete-view")
);
const MarkingSchemeDeleteView = dynamic(
  () => import("@components/marking-scheme/marking-scheme-delete-view")
);
const OfferDeleteView = dynamic(
  () => import("@components/offers/offer-delete-view")
);
const CouponDeleteView = dynamic(
  () => import("@components/coupon/coupon-delete-view")
);

const ProductDeleteView = dynamic(
  () => import("@components/product/product-delete-view")
);
const MasterProductDeleteView = dynamic(
  () => import("@components/master-products/product-delete-view")
);
const TypeDeleteView = dynamic(
  () => import("@components/group/group-delete-view")
);
const AttributeDeleteView = dynamic(
  () => import("@components/attribute/attribute-delete-view")
);

const ApproveShopView = dynamic(
  () => import("@components/shop/approve-shop-view")
);
const DisApproveShopView = dynamic(
  () => import("@components/shop/disapprove-shop-view")
); 
const DeliveryStatusView = dynamic(
  () => import("@components/shop/delivery-status-view")
);
const RemoveStaffView = dynamic(
  () => import("@components/shop/staff-delete-view")
);

const ExportImportView = dynamic(
  () => import("@components/product/import-export-modal")
);

const AttributeExportImport = dynamic(
  () => import("@components/attribute/attribute-import-export")
);

const AllProductsExportImport = dynamic(
  () => import("@components/product/import-export-modal-all-products")
);

const MasterProductsExportImport = dynamic(
  () => import("@components/product/import-export-modal-master-products")
);

const ShopsExportImport = dynamic(
  () => import("@components/product/import-export-modal-shop")
);

const OrdersExportImport = dynamic(
  () => import("@components/product/import-export-modal-orders")
);

const ShopsOrdersExportImport = dynamic(
  () => import("@components/shop/import-export-modal-orders")
);

const LogDeleteView = dynamic(
  () => import("@components/logs/log-delete-view")
);

const ReviewImageModal = dynamic(
  () => import("@components/reviews/review-image-modal")
);

const QuestionReplyView = dynamic(
  () => import("@components/question/question-reply-view")
);

const QuestionDeleteView = dynamic(
  () => import("@components/question/question-delete-view")
);

const ReviewDeleteView = dynamic(
  () => import("@components/reviews/review-delete-view")
);

const AcceptAbuseReportView = dynamic(
  () => import("@components/reviews/acccpt-report-confirmation")
);

const DeclineAbuseReportView = dynamic(
  () => import("@components/reviews/decline-report-confirmation")
);

const AbuseReport = dynamic(() => import("@components/reviews/abuse-report"));

const ShopQRDownload = dynamic(() => import('@components/shop/shop-qr-download'));
// import MarkingSchemeDeleteView from './../../marking-scheme/marking-scheme-delete-view';

const ManagedModal = () => {
  const { isOpen, view,data } = useModalState();
  const { closeModal } = useModalAction();

  console.log('modaldata',data)

  return (
    
    <Modal open={isOpen} onClose={closeModal}>
      
      {view === "DELETE_OFFER" && <OfferDeleteView />}
      {view === "DELETE_SHOP_CATEGORY" && <ShopCategoryDeleteView />}
      {view === "DELETE_LOG" && <LogDeleteView />} 
      {view === "DELETE_MARKING_SCHEME" && <MarkingSchemeDeleteView />} 
      {view === "DELETE_PRODUCT" && <ProductDeleteView />}
      {view === "MASTER_DELETE_PRODUCT" && <MasterProductDeleteView />}
      {view === "DELETE_TYPE" && <TypeDeleteView />}
      {view === "DELETE_ATTRIBUTE" && <AttributeDeleteView />}
      {view === "DELETE_CATEGORY" && <CategoryDeleteView />}
      {view === "DELETE_COUPON" && <CouponDeleteView />}
      {view === "DELETE_TAX" && <TaxDeleteView />}
      {view === "DELETE_SHIPPING" && <ShippingDeleteView />}
      {view === "PREVIEW_QUESTION" && <PreviewQuestion data={data} />}
      {view === "DELETE_TAG" && <TagDeleteView />}
      {view === "BAN_CUSTOMER" && <BanCustomerView />}
      {view === "SHOP_APPROVE_VIEW" && <ApproveShopView />}
      {view === "SHOP_DISAPPROVE_VIEW" && <DisApproveShopView />}
      {view ===  'REPLY_QUESTION' && <QuestionReplyView />}
      {view ===  'DELETE_QUESTION' && <QuestionDeleteView />}
      {view ===  'DELETE_REVIEW' && <ReviewDeleteView />}
      {view ===  'ACCEPT_ABUSE_REPORT' && <AcceptAbuseReportView />}
      {view ===  'DECLINE_ABUSE_REPORT' && <DeclineAbuseReportView />}
      {view ===  'ABUSE_REPORT' && <AbuseReport data={data}/>}
      {view === 'REVIEW_IMAGE_POPOVER' && <ReviewImageModal />}
      
      {view === 'SHOP_QR' && <ShopQRDownload data={data}  />}

      { view === 'PaymentDetailsModal' && <PaymentDetails/>}

      { view === 'RESULT_TABLE' && <ResultsTable data={data}/>}

      {view === "DELIVERY_STATUS_VIEW" && <DeliveryStatusView />}

      {view === "DELETE_STAFF" && <RemoveStaffView />}
      {view === "EXPORT_IMPORT_PRODUCT" && <ExportImportView />}
      {view === "EXPORT_IMPORT_ATTRIBUTE" && <AttributeExportImport />}
      {view === "EXPORT_IMPORT_ADMIN_PRODUCT" && <AllProductsExportImport />}
      {view === "EXPORT_IMPORT_SHOPS" && <ShopsExportImport />}
      {view === "EXPORT_IMPORT_ORDERS" && <OrdersExportImport />}
      {view === "EXPORT_IMPORT_SHOP_ORDERS" && <ShopsOrdersExportImport />}
      {view === "EXPORT_IMPORT_MASTER_PRODUCT" && <MasterProductsExportImport />}


      {view === 'COMBINE_RESULT' && <CombineResult data={data}  />}

    </Modal>
  );
};

export default ManagedModal;
