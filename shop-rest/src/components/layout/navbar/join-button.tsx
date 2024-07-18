import Button from "@components/ui/button";
import { useModalAction } from "@components/ui/modal/modal.context";
import { Console } from "console";
import { useTranslation } from "next-i18next";
// import { useRouter } from "next/router";

export default function JoinButton() {



  const { t } = useTranslation("common");

  // const router = useRouter();

  // var { query ,pathname} = router;

  // console.log('join',pathname);

  const { openModal } = useModalAction();

  function handleJoin() {
    return  openModal('OTP_REGISTER') 
  }
  
  return (
    <Button className="font-semibold p-5" size="medium" onClick={handleJoin}>
      {t("Login/Join")}
    </Button>
  );
}
