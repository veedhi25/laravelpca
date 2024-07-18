import { useState } from "react";
import { useTranslation } from "next-i18next";

type ReadMoreProps = {
  more?: string;
  less?: string;
  character: number;
  children: string;
};

const ReadMore: React.FC<ReadMoreProps> = ({
  children,
  more,
  less,
  character = 150,
}) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  const toggleLines = (event: any) => {
    event.preventDefault();
    setExpanded(!expanded);
  };

  if (!children) return null;

  return (
    <>
      {(children && children.length < character) || expanded
        ? children
        : children.substring(0, character) + "..."}
      {children && children.length > character && !expanded && (
        <>
          <br />
          <span className="mt-1 inline-block">
            <a
              href="#"
              onClick={toggleLines}
              style={{ color: "#c02171", fontWeight: 700 }}
            >
              {more ? more : t("  Read more")}
            </a>
          </span>
        </>
      )}
      {children && children.length > character && expanded && (
        <>
          <br />
          <span className="mt-1 inline-block">
            <a
              href="#"
              onClick={toggleLines}
              style={{ color: "#c02171", fontWeight: 700 }}
            >
              {/* {less ? less : t("common:text-less")} */}
              {less ? less : t("See less")}
            </a>
          </span>
        </>
      )}
    </>
  );
};

export default ReadMore;
