import EditIcon from "@components/icons/edit";
import Trash from "@components/icons/trash";
import { Eye } from "@components/icons/eye-icon";
import Link from "@components/ui/link";
import { useModalAction } from "@components/ui/modal/modal.context";

type Props = {
  id: string;
  deleteModalView?: string | any;
  editModalView?: string | any;
  editUrl?: string;
  detailsUrl?: string;
  isUserActive?: boolean;
  userStatus?: boolean;
  isShopActive?: boolean;
  approveButton?: boolean;
};

const ActionButtons = ({
  id,
  deleteModalView,
  editModalView,
  editUrl,
  detailsUrl,
}: Props) => {
  const { openModal } = useModalAction();
  function handleDelete() {
    openModal(deleteModalView, id);
  }
  function handleEditModal() {
    openModal(editModalView, id);
  }


  return (
    <div className="space-s-5 inline-flex items-center w-auto">
      {deleteModalView && (
        <button
          onClick={handleDelete}
          className="text-red-500 transition duration-200 hover:text-red-600 focus:outline-none"
          title={("Delete")}
        >
          <Trash width={16} />
        </button>
      )}

      {editUrl && (
        <Link
          href={editUrl}
          className="text-base transition duration-200 hover:text-heading"
          title={"Edit"}
        >
          <EditIcon width={16} />
        </Link>
      )}
      {editModalView && (
        <button
          onClick={handleEditModal}
          className="transition duration-200 text-body hover:text-heading focus:outline-none"
          title={"Edit"}
        >
          <EditIcon width={16} />
        </button>
      )}
      {detailsUrl && (
        <Link
          href={detailsUrl}
          className="ml-2 text-base transition duration-200 hover:text-heading"
          title={("View")}
        >
          <Eye width={24} />
        </Link>
      )}
    </div>
  );
};

export default ActionButtons;
