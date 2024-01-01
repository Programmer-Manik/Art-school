import { toast } from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import usePopular from "../../../hooks/usePopular";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAOS from "../../../hooks/useAos";
import useUser from "../../../hooks/useUser";

const PopularClass = () => {
	const { user } = useAuth();
	const navigate = useNavigate();
	const { popularClg, popularClgLoading } = usePopular();
	const { AUser, ALoading } = useUser();
	console.log("Popular Class -> ", popularClg);
	useAOS();

	// popularClgLoading &&

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
		<div className="py-16">
			<div
				data-aos="fade-down"
				data-aos-delay="400"
				className="text-center flex flex-col items-center"
			>
				<h1 className="text-xl md:text-3xl  font-semibold text-sky-600 my-6">
					{" "}
					Our Top Class{" "}
				</h1>
				<p className="max-w-md">
					An exhibition at the San Francisco Museum of Modern Art features six
					personal projects capturing relationships across time, space and
					experience
				</p>
			</div>

			<section className="text-gray-600 body-font">
				<div className="container px-5 py-8 mx-auto">
					<div className="flex flex-wrap -m-4">
						{popularClg.map((item) => (
							<div
								data-aos="flip-up"
								data-aos-delay="500"
								key={item?._id}
								className="p-4 md:w-1/3 relative"
							>
								<div className="h-full bg-[#f5f5f5bf] bg-opacity-60 border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
									<img
										className="lg:h-48 md:h-36 w-full object-cover object-center"
										src={item?.classImg}
										alt="blog"
									/>
									<div className="p-6">
										<h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
											{item?.InstructorName}
										</h2>
										<h1 className="title-font text-lg font-medium text-gray-900 mb-3">
											{item?.className}
										</h1>
										<p className="leading-relaxed mb-3">{item?.description}</p>
										<div className="flex items-start flex-col ">
											<p> Total Seats : {item?.totalSeats} </p>
											<p> AvailableSeats : {item?.availableSeats} </p>
											<p> Price : {item?.price} </p>
										</div>
										<div className="absolute bottom-8 right-8">
											<button
												onClick={() => handleAddCartSelect(item)}
												className="btn btn-primary"
												disabled={
													item.availableSeats <= 0 ||
													AUser?.role == "Admin" ||
													AUser?.role == "Instructor"
												}
											>
												Select
											</button>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
};

export default PopularClass;
