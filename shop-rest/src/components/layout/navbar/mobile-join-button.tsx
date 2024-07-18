
import Button from "@components/ui/button";
import { useModalAction } from "@components/ui/modal/modal.context";
import { useTranslation } from "next-i18next";
// import { useRouter } from "next/router";

export default function MobileJoinButton() {

  const { t } = useTranslation("common");
  const { openModal } = useModalAction();

  // const router = useRouter();

  // var { query ,pathname} = router;
  
  function handleJoin() {
    return openModal('OTP_REGISTER') ;
  }

  return (
    <Button className="font-semibold text-xs" size="small" onClick={handleJoin}>
      {t("Login/Join")}
    </Button>
  );
}
