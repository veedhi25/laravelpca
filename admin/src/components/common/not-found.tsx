import cn from "classnames";
import { useTranslation } from "next-i18next";
import { ROUTES } from "@utils/routes";
import { PlusIcon } from "@components/icons/plus-icon";
import Link from "@components/ui/link";
import { useRouter } from "next/router";
interface Props {
  text?: string;
  className?: string;
}

const NotFound: React.FC<Props> = (props) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  return (
    <div className={cn("flex  flex-col items-center", props.className)}>
      <div className="flex flex-col items-end w-full">
            <Link
              href={`/${router?.query?.shop}${ROUTES.DELIVERY}/create`}
              className="font-semibold text-sm text-accent flex items-center transition duration-200 no-underline hover:text-accent-hover focus:text-accent-hover"
            >
              <PlusIcon width={20} className="me-2" />
              {t("New Delivery")}
            </Link>
      </div>
      <div className="w-full h-full flex items-center justify-center">
        <img
          src="/no-result.svg"
          alt={props.text ? t(props.text) : t("text-no-result-found")}
          className="w-full h-full object-contain"
        />
      </div>
      {props.text && (
        <h3 className="w-full text-center text-xl font-semibold text-body my-7">
          {t(props.text)}
        </h3>
      )}
    </div>
  );
};

export default NotFound;