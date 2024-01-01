import usePaymentHistory from "../../../hooks/usePaymentHistory";

const PaymentHistory = () => {
	const [paymentHistory, refetch] = usePaymentHistory();
	console.log("paymentHistory -> ", paymentHistory);

	return (
		<div>
			<h1 className="text-2xl text-center font-medium title-font py-4 my-4 text-gray-900 tracking-widest">
				My Enrolled Class
			</h1>

			<div className=" overflow-scroll max-h-[calc(100vh-100px)] w-11/12 mx-auto border border-collapse">
				<div className="overflow-x-auto">
					<table className="table">
						{/* head */}
						<thead>
							<tr>
								<th>#</th>
								<th>Image</th>
								<th>Name</th>
								<th>Instructor</th>
								<th>Transaction</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{paymentHistory &&
								paymentHistory.map((payment, i) => (
									<tr key={payment._id}>
										<th>{i + 1}</th>
										<td>
											<div className="flex items-center space-x-3">
												<div className="avatar">
													<div className="mask mask-squircle w-12 h-12">
														<img
															src={payment?.classImg}
															alt="Avatar Tailwind CSS Component"
														/>
													</div>
												</div>
											</div>
										</td>
										<td>{payment?.studentName}</td>
										<th>{payment?.InstructorName}</th>
										<td>{payment?.transactionId}</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default PaymentHistory;
