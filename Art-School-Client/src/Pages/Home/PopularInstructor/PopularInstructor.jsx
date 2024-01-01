import usePopular from "../../../hooks/usePopular";
import { BsFacebook } from "react-icons/bs";
import { AiFillGithub, AiFillTwitterCircle } from "react-icons/ai";
import { toast } from "react-hot-toast";
import useAOS from "../../../hooks/useAos";

const PopularInstructor = () => {
	const { topInstructor } = usePopular();
	console.log("Popular Instructor -> ", topInstructor);
	useAOS();

	return (
		<div className="py-12">
			<div
				data-aos="fade-down"
				data-aos-delay="400"
				className="text-center flex flex-col items-center"
			>
				<h1 className="text-xl md:text-3xl  font-semibold text-sky-600 my-6">
					{" "}
					Our Top Instructor{" "}
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
						{topInstructor &&
							topInstructor.map((item) => (
								<div
									data-aos="flip-left"
									data-aos-easing="ease-out-cubic"
									data-aos-duration="500"
									key={item?._id}
									className="p-4 md:w-1/3"
								>
									<div className="h-full bg-[#f5f5f5bf] bg-opacity-60 relative border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
										<img
											className="lg:h-64 md:h-40 w-full object-fill object-center"
											src={item?.photoURL}
											alt="blog"
										/>
										<div className="p-6">
											<h1 className="title-font text-lg font-medium text-gray-900 mb-3">
												{item?.displayName}
											</h1>
											<p className="leading-relaxed mb-3">
												{item?.description}
											</p>
											<div className="flex items-start flex-col ">
												<p> Mail : {item?.email} </p>
												<p> Role : {item?.role} </p>
												<p className="flex gap-3 py-4">
													<BsFacebook className="text-2xl" />
													<AiFillTwitterCircle className="text-2xl" />
													<AiFillGithub className="text-2xl" />
												</p>
											</div>

											<div className="absolute bottom-8 right-8">
												<button
													onClick={() => toast.success("Coming soon...")}
													className="btn btn-primary"
												>
													Follow
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

export default PopularInstructor;
