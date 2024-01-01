import { toast } from "react-hot-toast";
import useMyEnrolledClass from "../../../hooks/useMyEnrolledClass";

const MyEnrolledClass = () => {
	const [myEnrolledClass] = useMyEnrolledClass();
	console.log("myEnrolledClass -> ", myEnrolledClass);
	return (
		<section className="text-gray-600 body-font">
			<div className="container px-5 py-8 mx-auto">
				<div className="flex flex-col text-center w-full mb-20">
					<h1 className="text-xl md:text-3xl text-center font-semibold text-sky-600 my-6">
						My Enrolled Class
					</h1>
				</div>

				<div className="flex flex-wrap -m-4">
					{myEnrolledClass &&
						myEnrolledClass.map((item) => (
							<div key={item?._id} className="p-4 lg:w-1/2">
								<div className="h-full rounded-md bg-slate-50 shadow-lg flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
									<img
										alt="team"
										className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4"
										src={item?.classImg}
									/>
									<div className="flex-grow sm:pl-8">
										<h2 className="title-font font-medium text-lg text-gray-900">
											{item?.className}
										</h2>
										<h3 className="text-gray-500 mb-3">
											{" "}
											{item?.InstructorName}{" "}
										</h3>
										<span className="inline-flex">
											<button
												onClick={() => toast.success("coming soon.....")}
												className="btn"
											>
												continue
											</button>
										</span>
									</div>
								</div>
							</div>
						))}
				</div>
			</div>
		</section>
	);
};

export default MyEnrolledClass;
