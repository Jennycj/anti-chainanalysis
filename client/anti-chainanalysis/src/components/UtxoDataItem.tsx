import { FaTimes } from "react-icons/fa";
import Card from "./shared/Card";
import PropTypes from "prop-types";

function UtxoDataItem({ item, handleRemove }: any) {
  return (
    <Card>
      <button onClick={() => handleRemove(item.id)} className="close">
        <FaTimes color="purple" />
      </button>
      <div className="text-display">
        {item.txid}:{item.vout}
      </div>
    </Card>
  );
}

UtxoDataItem.protoTypes = {
  item: PropTypes.object.isRequired,
};

export default UtxoDataItem;
