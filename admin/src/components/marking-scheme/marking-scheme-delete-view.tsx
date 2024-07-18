import ConfirmationCard from "@components/common/confirmation-card";
import {
  useModalAction,
  useModalState, 
} from "@components/ui/modal/modal.context";
import { useDeleteMarkingSchemeMutation } from "@data/marking-scheme/use-marking-scheme.mutation";
// import { useDeleteTagMutation } from "@data/tag/use-tag-delete.mutation";
import { getErrorMessage } from "@utils/form-error";

const MarkingSchemeDeleteView = () => {
  const { mutate: deleteMarkingSchemeId, isLoading: loading } = useDeleteMarkingSchemeMutation();

  const { data: modalData } = useModalState();
  const { closeModal } = useModalAction();
  function handleDelete() {
    try {
        deleteMarkingSchemeId(modalData as string);
      closeModal();
    } catch (error) {
      closeModal();
      getErrorMessage(error);
    }
  }
  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnLoading={loading}
    />
  );
};

export default MarkingSchemeDeleteView;
