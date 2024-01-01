import { toast } from "react-hot-toast";
import useMyClass from "../../../hooks/useMyclass";

const MyClasses = () => {
	const [myClass, refetch] = useMyClass();
	console.log(myClass);

	const deleteHandle = (item) => {
		console.log(item);

		if (item) {
			fetch(
				`https://summer-capm-school-server.vercel.app/delete-class/${item?._id}`,
				{
					method: "DELETE",
					headers: { "Content-type": "application/json" },
				}
			)
				.then((res) => res.json())
				.then((data) => {
					console.log(data);

					if (data.deletedCount > 0) {
						toast.success(`${item.className} - Delete success`);
						refetch();
					}
				})
				.catch((data) => toast.error(data.message));
		}
	};

	const editHandle = (clgId) => {
		console.log("Editing handle", clgId);
		toast("Comming Soon... Edit Options");
	};

	return (
		<div>
			<h2 className="text-3xl text-center"> My Classes : {myClass.length} </h2>
			<div className="p-7 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
				{myClass.map((clg) => (
					<div
						key={clg._id}
						className="card bg-base-100 shadow-xl  p-3 rounded-md bg-opacity-60"
					>
						<img
							src={clg?.classImg}
							alt="Shoes"
							className="rounded-t-box h-[200px]"
						/>
						<div className="card-body items-center">
							<div>
								<h2 className="card-title"> {clg?.className} </h2>
								<p> {clg?.description.slice(0, 60) + "..."} </p>
								<p> Available Seats : {clg?.availableSeats} </p>
								<p> Price : {clg?.price} </p>
								<p>
									{" "}
									Status:{" "}
									<span
										className={`${
											clg?.classStatus == "Approved"
												? "text-green-500"
												: clg?.classStatus == "pending"
												? "text-blue-500"
												: "text-red-500"
										} font-semibold`}
									>
										{" "}
										{clg?.classStatus}{" "}
									</span>{" "}
								</p>
								{clg?.feedback && <p> Feedback: {clg?.feedback} </p>}
							</div>

							<div className="card-actions mt-5">
								<button
									className="btn btn-primary"
									onClick={() => editHandle(clg)}
								>
									Edit
								</button>
								<button
									className="btn btn-primary"
									onClick={() => deleteHandle(clg)}
								>
									Delete
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default MyClasses;
