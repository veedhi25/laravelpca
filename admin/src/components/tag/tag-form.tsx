import Input from "@components/ui/input";
import { Control, FieldErrors, useForm } from "react-hook-form";
import Button from "@components/ui/button";
import TextArea from "@components/ui/text-area";
import Label from "@components/ui/label";
import Card from "@components/common/card";
import Description from "@components/ui/description";
import * as categoriesIcon from "@components/icons/category";
import { getIcon } from "@utils/get-icon";
import { useRouter } from "next/router";
import { getErrorMessage } from "@utils/form-error";
import ValidationError from "@components/ui/form-validation-error";
import { tagIcons } from "./tag-icons";
import { useTranslation } from "next-i18next";
import FileInput from "@components/ui/file-input";
import SelectInput from "@components/ui/select-input";
import { yupResolver } from "@hookform/resolvers/yup";
import { tagValidationSchema } from "./tag-validation-schema";
import { useTypesQuery } from "@data/type/use-types.query";
import { useCreateTagMutation } from "@data/tag/use-tag-create.mutation";
import { useUpdateTagMutation } from "@data/tag/use-tag-update.mutation";

function SelectTypes({
  control,
  errors,
}: {
  control: Control<FormValues>;
  errors: FieldErrors;
}) {
  const { t } = useTranslation();
  const { data: types, isLoading: loading } = useTypesQuery();
  return (
    <div className="mb-5">
      <Label>{t("form:input-label-types")}</Label>
      <SelectInput
        name="type"
        control={control}
        getOptionLabel={(option: any) => option.name}
        getOptionValue={(option: any) => option.slug}
        options={types?.types!}
        isLoading={loading}
      />
      <ValidationError message={t(errors.type?.message)} />
    </div>
  );
}

export const updatedIcons = tagIcons.map((item: any) => {
  item.label = (
    <div className="flex space-s-5 items-center">
      <span className="flex w-5 h-5 items-center justify-center">
        {getIcon({
          iconList: categoriesIcon,
          iconName: item.value,
          className: "max-h-full max-w-full",
        })}
      </span>
      <span>{item.label}</span>
    </div>
  );
  return item;
});

type FormValues = {
  name: string;

};

const defaultValues = {
  
  name: "",
};

type IProps = {
  initialValues?: any;
};
export default function CreateOrUpdateTagForm({ initialValues }: IProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    //@ts-ignore
    defaultValues: initialValues
      ? {
          ...initialValues,
        }
      : defaultValues,

    resolver: yupResolver(tagValidationSchema),
  });

  const { mutate: createTag, isLoading: creating } = useCreateTagMutation();
  const { mutate: updateTag, isLoading: updating } = useUpdateTagMutation();

  const onSubmit = async (values) => {
    const input = {
      name: values.name,
    };
    try {
      if (initialValues) {
        updateTag({
          variables: {
            id: initialValues.id, // using the id directly
            input: {
              ...input,
            },
          },
        });
      } else {
        createTag({
          variables: {
            input,
          },
        });
      }
    } catch (err) {
      getErrorMessage(err);
    }
  };
  

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <div className="flex flex-wrap pb-8 border-b border-dashed border-gray-300 my-5 sm:my-8">
        <Description
          title={t("form:input-label-image")}
          details={t("form:tag-image-helper-text")}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <FileInput name="image" control={control} multiple={false} />
        </Card>
      </div> */}

      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title={t("form:input-label-description")}
          details={`${
            initialValues
              ? t("form:item-description-edit")
              : t("form:item-description-add")
          } ${t("form:tag-description-helper-text")}`}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8 "
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t("form:input-label-name")}
            {...register("name")}
            error={t(errors.name?.message!)}
            variant="outline"
            className="mb-5"
          />

          {/* <TextArea
            label={t("form:input-label-details")}
            {...register("details")}
            variant="outline"
            className="mb-5"
          /> */}

          {/* <div className="mb-5">
            <Label>{t("form:input-label-select-icon")}</Label>
            <SelectInput
              name="icon"
              control={control}
              options={updatedIcons}
              isClearable={true}
            />
          </div> */}
          {/* <SelectTypes control={control} errors={errors} /> */}
        </Card>
      </div>
      <div className="mb-4 text-end">
        {initialValues && (
          <Button
            variant="outline"
            onClick={router.back}
            className="me-4"
            type="button"
          >
            {t("form:button-label-back")}
          </Button>
        )}

        <Button loading={creating || updating}>
          {initialValues
            ? t("form:button-label-update-tag")
            : t("form:button-label-add-tag")}
        </Button>
      </div>
    </form>
  );
}
