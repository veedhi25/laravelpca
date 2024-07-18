import ConfirmationCard from "@components/common/confirmation-card";
import {
  useModalAction,
  useModalState,
} from "@components/ui/modal/modal.context";
import { useDeleteProductMutation } from "@data/master-products/product-delete.mutation";

const MasterProductDeleteView = () => {
  const { mutate: deleteProduct, isLoading: loading } =
    useDeleteProductMutation();
  const { data } = useModalState();
  const { closeModal } = useModalAction();
  async function handleDelete() {
    deleteProduct(data);
    closeModal();
  }
  
  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnLoading={loading}
    />
  );
};

export default MasterProductDeleteView;
