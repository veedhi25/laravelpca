import SelectInput from "@components/ui/select-input";
import Label from "@components/ui/label";
import { useFormContext } from "react-hook-form";
import Card from "@components/common/card";
import ValidationError from "@components/ui/form-validation-error";
import { ProductType } from "@ts-types/generated";
import { useTranslation } from "next-i18next";
import { useTaxQuery } from "@data/tax/use-all-taxes.query";
import { useEffect } from "react";

const productType = [
  { name: "Simple Product", value: ProductType.Simple },
  { name: "Variable Product", value: ProductType.Variable },
];

const ProductTypeInput = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { data, isLoading: loading, error } = useTaxQuery();

  const { t } = useTranslation();

  useEffect(()=>{
    // console.log(data,'data');
  },[])
  return (
      <div className="mt-5 mb-5">
        <Label>{("Tax")}</Label>
        <SelectInput
          name="tax_id"
          control={control}
          getOptionLabel={(option: any) => option.name}
          getOptionValue={(option: any) => option.value}
          options={productType}
        />
        <ValidationError message={t(errors.productTypeValue?.message)} />
      </div>
  );
};

export default ProductTypeInput;
