import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Provider/AuthProvider";
import { toast } from "react-hot-toast";

const AddAClass = () => {
	const { register, handleSubmit, reset } = useForm();
	const { user } = useContext(AuthContext);

	// TODO: dark and light theme , function check , error message

	console.log("current user : ", user);

	const classData = (formData) => {
		formData.InstructorImg = user?.photoURL;
		formData.classStatus = "pending";
		formData.availableSeats = parseInt(formData.totalSeats);
		formData.enrollClass = 0;
		formData.feedback = "Empty";

		fetch(`https://summer-capm-school-server.vercel.app/classes`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(formData),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.insertedId) {
					toast.success(`${formData?.className} - class Added successfully`);
					reset();
				}
			});
	};

	return (
		<div>
			<h1 className="text-xl md:text-3xl text-center font-semibold text-sky-600 my-6">
				Add a New Class
			</h1>

			<form
				onSubmit={handleSubmit(classData)}
				className="mt-6 w-11/12 lg:w-10/12 mx-auto "
			>
				<div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
					<div className="bg-slate-300 p-3 rounded-md bg-opacity-60">
						<label
							htmlFor="instructorName"
							className=" text-sm font-semibold text-gray-800 flex gap-1"
						>
							Instructor Name : <span className="text-red-500 text-lg">*</span>
						</label>
						<input
							{...register("InstructorName", { required: true })}
							value={user?.displayName}
							id="instructorName"
							type="name"
							className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
						/>
					</div>

					<div className="bg-slate-300 p-3 rounded-md bg-opacity-60">
						<label
							htmlFor="instructorEmail"
							className="text-sm font-semibold text-gray-800 flex gap-1"
						>
							Instructor Email : <span className="text-red-500 text-lg">*</span>
						</label>
						<input
							{...register("InstructorEmail", { required: true })}
							value={user?.email}
							type="email"
							id="instructorEmail"
							className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
						/>
					</div>

					<div className="bg-slate-300 p-3 rounded-md bg-opacity-60">
						<label
							htmlFor="className"
							className="text-sm font-semibold text-gray-800 flex gap-1"
						>
							Class Name : <span className="text-red-500 text-lg">*</span>
						</label>
						<input
							{...register("className", { required: true })}
							id="className"
							type="text"
							className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
						/>
					</div>

					<div className="bg-slate-300 p-3 rounded-md bg-opacity-60">
						<label
							htmlFor="price"
							className="text-sm font-semibold text-gray-800 flex gap-1"
						>
							Price : <span className="text-red-500 text-lg">*</span>
						</label>
						<input
							{...register("price", { required: false })}
							id="price"
							type="text"
							className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
						/>
					</div>

					<div className="bg-slate-300 p-3 rounded-md bg-opacity-60">
						<label
							htmlFor="availableSeats"
							className="text-sm font-semibold text-gray-800 flex gap-1"
						>
							Available Class Seats :{" "}
							<span className="text-red-500 text-lg">*</span>
						</label>
						<input
							{...register("totalSeats", { required: true })}
							id="availableSeats"
							type="number"
							className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
						/>
					</div>

					<div className="bg-slate-300 p-3 rounded-md bg-opacity-60">
						<label
							htmlFor="classImg"
							className="text-sm font-semibold text-gray-800 flex gap-1"
						>
							Class Image : <span className="text-red-500 text-lg">*</span>
						</label>
						<input
							{...register("classImg", { required: true })}
							id="classImg"
							type="text"
							className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
						/>
					</div>

					<div className="lg:col-span-2 bg-slate-300 p-3 rounded-md bg-opacity-60">
						<label
							htmlFor="description"
							className="text-sm font-semibold text-gray-800 flex gap-1"
						>
							Description : <span className="text-red-500 text-lg">*</span>
						</label>
						<input
							{...register("description", { required: true })}
							id="description"
							type="text"
							className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
						/>
					</div>
				</div>

				<div className="mt-6">
					<button
						type="submit"
						className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
					>
						Add Class
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddAClass;
