import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading";
import useAOS from "../../hooks/useAos";
import useUser from "../../hooks/useUser";

const Classes = () => {
	const { user, isLoading } = useAuth();
	const navigate = useNavigate();
	const { AUser, ALoading } = useUser();
	useAOS();

	console.log("AUser - > ", AUser);

	const { data: classes = [], isLoading: loading } = useQuery({
		queryKey: ["allClasses"],
		enabled: !isLoading && !ALoading,
		queryFn: async () => {
			const res = await fetch(
				`https://summer-capm-school-server.vercel.app/all-classes`
			);
			return res.json();
		},
	});

	isLoading && loading && ALoading && <Loading />;

	console.log(classes);

	const handleAddCartSelect = (course) => {
		if (user?.email) {
			console.log("course -> ", course);
			const {
				_id,
				className,
				price,
				InstructorEmail,
				classImg,
				InstructorName,
			} = course;

			const classSelected = {
				studentName: user?.displayName,
				studentEmail: user?.email,
				studentImg: user?.photoURL,
				className,
				classId: _id,
				classImg,
				InstructorEmail,
				InstructorName,
				price,
				enrolled: false,
			};
			console.log("Selected -> ", classSelected);

			fetch(`https://summer-capm-school-server.vercel.app/selected/`, {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(classSelected),
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data);

					if (data.insertedId) {
						toast.success(
							`class - ${className} - added, Go to Dashboard and Payment`
						);
					} else {
						toast.error(
							` Already Exists - ${className} - , Go to Dashboard and Payment`
						);
					}
				})
				.catch((err) => console.error(err));
		} else {
			Swal.fire("Login first ?", "then you can select the class?", "Login");
			navigate("/login");
		}
	};

	return (
		<div>
			<h2 className="text-xl md:text-3xl text-center font-semibold text-sky-600 my-6">
				All Classes by Our Expert Instructors
			</h2>
			{/* cards */}
			<div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-8 ">
				{classes &&
					classes.map((course) => {
						return (
							<div
								key={course._id}
								className={`card p-1 w-full group ${
									course?.availableSeats <= 0 ? "bg-red-500" : "bg-green-200"
								} shadow-xl image-full`}
								data-aos="zoom-out-down"
							>
								<figure>
									<img src={course?.classImg} />
								</figure>
								<div className="card-body ">
									<h2 className="card-title text-xl md:text-4xl">
										{course?.className}
									</h2>
									<p className="text-lg md:text-2xl font-semibold">
										Instructor: {course.InstructorName}
									</p>
									<p className="text-lg md:text-2xl">
										Total Seats: {course?.totalSeats}
									</p>
									<p className="text-lg md:text-2xl">
										Available Seats: {course?.totalSeats - course?.enrollClass}
										{/* it should be dynamic from database */}
									</p>
									<p className="text-lg md:text-2xl">Price: ${course?.price}</p>
									<div className="card-actions justify-end">
										<button
											onClick={() => handleAddCartSelect(course)}
											className="btn btn-primary"
											disabled={
												course.availableSeats <= 0 ||
												AUser?.role == "Admin" ||
												AUser?.role == "Instructor"
											}
										>
											Select
										</button>
									</div>
								</div>
							</div>
						);
					})}
			</div>
			{/* cards */}
		</div>
	);
};

export default Classes;
