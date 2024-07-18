import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import ImportCsv from "@components/ui/import-csv";
import { useShopQuery } from "@data/shop/use-shop.query";
import { useImportShopsMutation } from "@data/import/use-import-shop.mutation";

export default function ImportShops() {
  const { t } = useTranslation("common");
  const {
    query: { shop },
  } = useRouter();
  const { mutate: importProducts, isLoading: loading } =
  useImportShopsMutation();

  const handleDrop = async (acceptedFiles: any) => {
    if (acceptedFiles.length) {
      importProducts({
        csv: acceptedFiles[0],
      });
    }
  };

  return (
    <ImportCsv
      onDrop={handleDrop}
      loading={loading}
      title={t("Import Shops")}
    />
  );
}
