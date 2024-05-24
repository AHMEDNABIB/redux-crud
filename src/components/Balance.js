import { useGetTransactionsQuery } from "../features/api/apiSlice";
import numberWithCommas from "../utils/numberWithCommas";

export default function Balance() {
	const { data: transactions } = useGetTransactionsQuery();

	const calculateIncome = (transactions) => {

		
		let income = 0;

		transactions.forEach((transaction) => {
			const { type, amount } = transaction;

			if (type === "income") {
				income += Number(amount);
			} else {
				income -= Number(amount);
			}
		});

		return income;
	};

	return (
		<div className="top_card">
			<p>Your Current Balance</p>
			<h3>
				<span>৳</span>{" "}
				{transactions?.length > 0 ? (
					<span>
						{numberWithCommas(calculateIncome(transactions))}
					</span>
				) : (
					0
				)}
			</h3>
		</div>
	);
}
