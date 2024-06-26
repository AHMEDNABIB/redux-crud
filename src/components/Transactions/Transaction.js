import { useDispatch } from "react-redux";
import deleteImage from "../../assets/delete.svg";
import editImage from "../../assets/edit.svg";
import {
	editActive,
	removeTransaction,
} from "../../features/transation/transactionSlice";
import { useDeleteTransactionMutation } from "../../features/api/apiSlice";

export default function Transaction({ transaction }) {
	const { name, amount, type, id } = transaction || {};
	const [deleteTransaction, { isSuccess, isLoading, isError }] =
		useDeleteTransactionMutation();
	
    

	const dispatch = useDispatch();
	const handleEdit = () => {
		dispatch(editActive(transaction));
	};

	const handleDelete = () => {
		if (id) {
			
			deleteTransaction({ id });
		}
		
	};

	return (
		<li className={`transaction ${type}`}>
			<p>{name}</p>
			<div className="right">
				<p>৳ {amount}</p>
				<button className="link" onClick={handleEdit}>
					<img alt="Edit" className="icon" src={editImage} />
				</button>
				<button disabled={isLoading} className="link" onClick={handleDelete}>
					<img alt="Delete" className="icon" src={deleteImage} />
				</button>
			</div>
		</li>
	);
}
