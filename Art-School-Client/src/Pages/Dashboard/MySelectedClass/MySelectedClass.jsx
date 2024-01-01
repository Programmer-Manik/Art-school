import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import useSelectedClass from "../../../hooks/useSelectedClass";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../Components/Loading";

const MySelectedClass = () => {
	const { setPaySelectedClass, isLoading } = useAuth();
	const [mySelectedClass, refetch, selectedLoading] = useSelectedClass();

	console.log("mySelectedClass -> ", mySelectedClass);

	if (isLoading && selectedLoading) {
		return <Loading />;
	}

	const deleteHandle = (item) => {
		console.log(item);

		if (item) {
			fetch(
				`https://summer-capm-school-server.vercel.app/delete-selected/${item?.classId}`,
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
				.catch((data) => console.error(data));
		}
	};

	const paymentHandle = (item) => {
		console.log(item);
		setPaySelectedClass(item);
	};

	return (
		<div>
			<h1 className="text-xl md:text-3xl text-center font-semibold text-sky-600 my-6">
				{" "}
				My Selected Class{" "}
			</h1>
			<h1 className="text-4xl"> </h1>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 p-8">
				{mySelectedClass &&
					mySelectedClass.map((item) => (
						<div
							key={item?._id}
							className="card w-full bg-base-100 shadow-xl border"
						>
							<figure className="h-[200px]">
								<img
									className="h-full w-full"
									src={item?.classImg}
									alt="Shoes"
								/>
							</figure>
							<div className="card-body">
								<h2 className="card-title"> {item?.className} </h2>

								<div>
									<p> Price : {item?.price} </p>
									<p> Instructor : {item?.InstructorName} </p>
								</div>

								<div className="card-actions justify-between mt-4">
									<div
										onClick={() => deleteHandle(item)}
										className="badge badge-outline text-md btn	!p-3"
									>
										Delete
									</div>

									<Link to="/dashboard/payment">
										<button
											onClick={() => paymentHandle(item)}
											className="badge badge-outline text-md btn !p-3"
										>
											Payment
										</button>
									</Link>
								</div>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default MySelectedClass;
