import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@nextui-org/react";
interface AmountItemProps {
  amount?: string;
  onEdit: () => void;
  onDelete: () => void;
}
const AmountItem = ({ amount, onDelete, onEdit }: AmountItemProps) => {
  return (
    <div className="flex items-center gap-1 text-default-400">
      <span className="text-small">{amount}</span>
      <div className="flex mx-4 gap-4 items-center">
        <Button isIconOnly color="danger" aria-label="Like" onClick={onDelete}>
          <FontAwesomeIcon className="text-lg " icon={faTrashCan} />
        </Button>
        <Button
          isIconOnly
          color="warning"
          variant="faded"
          aria-label="Take a photo"
          onClick={onEdit}
        >
          <FontAwesomeIcon className="text-lg " icon={faPen} />
        </Button>
      </div>
    </div>
  );
};

export default AmountItem;
