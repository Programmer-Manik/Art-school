import useClasses from "../../../hooks/useClasses";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

const ClassesMange = () => {
	const [classes, refetch] = useClasses();

	console.log("classes -> ", classes);

	const statusUpdate = (classId, className, status) => {
		const sendData = {
			status: status,
		};
		fetch(
			`https://summer-capm-school-server.vercel.app/classes-status/${classId}`,
			{
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(sendData),
			}
		)
			.then((res) => res.json())
			.then((data) => {
				if (data.modifiedCount > 0) {
					refetch();
					status == "Approved" &&
						toast.success(`${className} - has been - ${status}`);
					status == "Denied" &&
						toast.error(`${className} - has been - ${status}`);
				}
				console.log("approved class -> ", data);
			})
			.catch((err) => console.log(err));
	};

	const approveClass = (classId, className) => {
		console.log("Approve Class -> ", classId);

		statusUpdate(classId, className, "Approved");
	};

	const denyClass = (classId, className) => {
		console.log("Deny Class -> ", classId);

		statusUpdate(classId, className, "Denied");
	};

	const sendFeedback = async (classId, className) => {
		// Implement the logic for sending feedback here
		console.log(`Send feedback for class ${classId}`);

		const { value: feedbackMg } = await Swal.fire({
			input: "textarea",
			inputLabel: "Your feedback ",
			inputPlaceholder: "Type your message here...",
			inputAttributes: {
				"aria-label": "Type your message here",
			},
			showCancelButton: true,
		});

		if (feedbackMg) {
			console.log("feedback Message -> ", feedbackMg);

			const sendData = {
				feedback: feedbackMg,
			};
			console.log(sendData);

			fetch(
				`https://summer-capm-school-server.vercel.app/feedback/${classId}`,
				{
					method: "PATCH",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(sendData),
				}
			)
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					if (data.matchedCount > 0) {
						Swal.fire(feedbackMg);
					}
				})
				.catch((err) => console.log(err));
		}
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-4">
				Manage Classes : {classes.length}
			</h1>

			<div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{classes &&
					classes.map((c) => (
						<div key={c?._id}>
							<div className="card bg-base-100 shadow-xl border border-opacity-20">
								<figure className="h-80">
									<img
										className="!h-full w-full"
										src={c?.classImg}
										alt="Album"
									/>
								</figure>
								<div className="card-body">
									<div>
										<h2 className="card-title"> {c?.className} </h2>
										<p> {c?.description.slice(0, 70) + "..."} </p>
										<div className="my-4 flex flex-col gap-2">
											<p> Instructor Name : {c?.InstructorName} </p>
											<p> Instructor Email : {c?.InstructorEmail} </p>
											<p> Available Seats : {c?.availableSeats} </p>
											<p> Price : {c?.price} </p>
											<p>
												Status :
												<span
													className={`${
														c?.classStatus == "pending" &&
														"text-red-500 font-semibold"
													}`}
												>
													{c?.classStatus}
												</span>
											</p>
											{c?.feedback && (
												<p>
													feedback :
													<span className="text-green-700">{c?.feedback}</span>
												</p>
											)}
										</div>
									</div>

									<div className="grid grid-cols-2 gap-3">
										<button
											onClick={() => approveClass(c?._id, c?.className)}
											className="btn btn-primary"
										>
											Accept
										</button>
										<button
											onClick={() => denyClass(c?._id, c?.className)}
											className="btn btn-secondary"
										>
											Deny
										</button>
										<button
											onClick={() => sendFeedback(c?._id, c?.className)}
											className="btn btn-accent col-span-2"
										>
											feedback
										</button>
									</div>
								</div>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default ClassesMange;
