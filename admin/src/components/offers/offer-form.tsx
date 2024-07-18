import Input from "@components/ui/input";
import {
  FieldErrors,
  useForm,
} from "react-hook-form";
import Button from "@components/ui/button";

import Card from "@components/common/card";
import Description from "@components/ui/description";
import { useRouter } from "next/router";
import { Offer } from "@ts-types/generated";
import { useUpdateCategoryMutation } from "@data/offers/use-offer-update.mutation";
import { useCreateCategoryMutation } from "@data/offers/use-offer-create.mutation";
import { useTranslation } from "next-i18next";
import FileInput from "@components/ui/file-input";
import { yupResolver } from "@hookform/resolvers/yup";
import { categoryValidationSchema } from "./category-validation-schema";


type FormValues = {
  name: string;
  image: any;
};

const defaultValues = {
  image: [],
  name: "",
};

type IProps = {
  initialValues?: Offer | null;
};
export default function CreateOrUpdateOffersForm({
  initialValues,
}: IProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    control,
    setValue,

    formState: { errors },
  } = useForm<FormValues>({
    // shouldUnregister: true,
    //@ts-ignore
    defaultValues: initialValues?initialValues:defaultValues,
    resolver: yupResolver(categoryValidationSchema),
  });

  const { mutate: createCategory, isLoading: creating } =
    useCreateCategoryMutation();
  const { mutate: updateCategory, isLoading: updating } =
    useUpdateCategoryMutation();

  const onSubmit = async (values: FormValues) => {
    const input = {
      name: values.name,
      image: {
        thumbnail: values?.image?.thumbnail,
        original: values?.image?.original,
        id: values?.image?.id,
      },
    };
    if (initialValues) {
      updateCategory({
        variables: {
          id: initialValues?.id,
          input: {
            ...input,
          },
        },
      });
    } else {
      createCategory({
        variables: {
          input,
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title={t("form:input-label-description")}
          details={`${
            initialValues
              ? t("form:item-description-edit")
              : t("form:item-description-add")
          } ${"your offer details and necessary information from here"}`}
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


        </Card>
      </div>
      <div className="flex flex-wrap pb-8 my-5 sm:my-8">
        <Description
          title={t("form:input-label-image")}
          details={t("form:category-image-helper-text")}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <FileInput name="image" control={control} multiple={false} />
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
            ? ("Update Offer")
            : ("Create Offer")}
        </Button>
      </div>
    </form>
  );
}
