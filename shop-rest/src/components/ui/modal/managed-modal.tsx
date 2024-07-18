import dynamic from "next/dynamic";
import Modal from "@components/ui/modal/modal";
import { useModalAction, useModalState } from "./modal.context";
import ShopProfileCard from "@components/profile/profile-card";
import UpiScanner from "@components/upi-scanner/upi-scanner";
import QuizValidatorModal from "@components/quiz/quiz-validator-modal";
import MarksheetDetails from "@components/marksheet-details";
    
     

const Login = dynamic(() => import("@components/auth/login"));
const Register = dynamic(() => import("@components/auth/register"));
const ForgotPassword = dynamic(
  () => import("@components/auth/forget-password/forget-password")
);
const OtpLoginView = dynamic(() => import('@components/auth/otp-login'));

const UpiPayment = dynamic(() => import("@components/checkout/upi-payment"))

 
const UpiPaymentForm  = dynamic(() => import("@components/upi-scanner/upi-payment-form"));

const Scanner = dynamic(() => import("@components/layout/scanner"));

const GoogleReviews = dynamic(
  () => import("@components/google-reviews/reviews")
);

const CreateOrUpdateAddressForm = dynamic(
  () => import("@components/address/address-form")
);

const QuizResultModal= dynamic(()=> import("@components/quiz/quiz-result-modal"))

const InStoreOfferMessage = dynamic(
  () => import("@components/ui/in-store-offer-msg")
);

 

const OtpRegisterForm = dynamic(()=> import('@components/auth/otp-register'));

const OfferImageView = dynamic(()=> import("@components/common/offer-image-view"))

const ReviewRating = dynamic(() => import('@components/reviews/review-form'));

const QuestionForm = dynamic(
  () => import('@components/questions/question-form')
);

const AbuseReport = dynamic(() => import('@components/reviews/abuse-report'));

const ReviewImageModal = dynamic(
  () => import('@components/reviews/review-image-modal')
);

const AddressDeleteView = dynamic(
  () => import("@components/address/address-delete-view")
);



 
 
const SearchBarModal = dynamic(() => import("@components/common/search-bar-modal"));
 
const ManagedModal = () => {
  const { isOpen, view, data } = useModalState();
  const { closeModal } = useModalAction();

  return (
    
    <Modal open={isOpen} onClose={closeModal} view={view}>

      {view === "LOGIN_VIEW" && <Login />}
      {view === "REGISTER" && <Register data={data}  />}
      {view === "FORGOT_VIEW" && <ForgotPassword />}
      {view === "ADD_OR_UPDATE_ADDRESS" && <CreateOrUpdateAddressForm />}
      {view === "DELETE_ADDRESS" && <AddressDeleteView />}
      {view === 'OTP_LOGIN' && <OtpLoginView />}
      {view === 'IN_STORE_OFFER' && <InStoreOfferMessage />}
      
      {view === 'REVIEW_RATING' && <ReviewRating />}
      {view === 'ABUSE_REPORT' && <AbuseReport data={data} />}
      {view === 'QUESTION_FORM' && <QuestionForm />}
      {view === 'PREVIEW_QUESTION' && <PreviewQuestion />}
      {view === 'REVIEW_IMAGE_POPOVER' && <ReviewImageModal />} 
       {/* { view=== 'SEARCH_BAR_MODAL' && <SearchBarModal />} */}
       
 
      {view === "GOOGLE_REVIEWS" && (
        <GoogleReviews data={data}  />
      )}

      {view == 'OFFER_IMAGE_VIEW' && <OfferImageView data={data}/>}

      {view === 'UPI_FORM' && <UpiPaymentForm data={data}/> }

      {view === 'UPI_APPS' && <UpiPayment data={data}/>}

      {view === 'UPI_SCANNER_APPS' && <UpiScanner data={data}/>}

      {view === 'SCANNER' && <Scanner data={data}/>}

      {view === 'MARKSHEET_DETAILS' && <MarksheetDetails data={data}/>}

      {view  === 'QUIZ_VALIDATOR' && <QuizValidatorModal/>}

      {view === 'OTP_REGISTER' && <OtpRegisterForm data={data}/>}

      {view === 'QUIZ_RESULT_MODAL' && <QuizResultModal data={data}/>}
 

       
      {/* {view == 'CHAT_SCREEN' && <ChatScreen last_message={data}/> } */}

       
      {view === "SHOP_INFO" && (
        <ShopProfileCard
          data={data}
          cardClassName="!hidden"
          className="!flex flex-col !w-screen !h-screen !rounded-none"
        />
      )}
    </Modal>
  );
};

export default ManagedModal;
