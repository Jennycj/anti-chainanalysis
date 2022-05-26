import PropTypes from "prop-types";
import UtxoDataItem from "./UtxoDataItem";

function UtxoDataList({ inputList, handleRemove }: any) {
  if (!inputList || inputList.length === 0) {
    return <p>No UTXO Data added yet</p>;
  }
  return (
    <div className="feedback-list">
      {inputList.map((item: any) => (
        <div key={item.id}>
          <UtxoDataItem key={item.id} item={item} handleRemove={handleRemove} />
        </div>
      ))}
    </div>
  );
}

UtxoDataList.protoTypes = {
  feedback: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
    })
  ),
};

export default UtxoDataList;
