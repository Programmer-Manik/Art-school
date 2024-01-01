import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const Instructor = () => {
	const { data: instructors = [] } = useQuery({
		queryKey: ["allInstructor"],
		queryFn: async () => {
			const res = await fetch(
				`https://summer-capm-school-server.vercel.app/all-instructor`
			);
			return res.json();
		},
	});

	return (
		<div>
			<div className="container mx-auto">
				<h2 className="text-xl md:text-3xl text-center font-semibold text-sky-600 my-6">
					Our Expert Instructors
				</h2>

				<section className="text-gray-600 body-font">
					<div className="container px-5 py-20 mx-auto">
						<div className="flex flex-wrap -m-4">
							{instructors &&
								instructors.map((instructor) => (
									<div key={instructor._id} className="p-4 lg:w-1/2 relative">
										<div className="h-full  bg-[#f5f5f5bf] bg-opacity-60 rounded-[7px] shadow-md flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
											<img
												alt="team"
												className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4"
												src={instructor?.photoURL}
											/>
											<div className="flex-grow sm:pl-8">
												<h2 className="title-font font-medium text-lg text-gray-900">
													{instructor?.displayName}
												</h2>
												<h3 className="text-gray-500 mb-3">
													{instructor?.role}
												</h3>
												<p className="mb-4">
													DIY tote bag drinking vinegar cronut adaptogen squid
													fanny pack vaporware.
												</p>
												<span className="inline-flex">
													<a className="text-gray-500">
														<svg
															fill="none"
															stroke="currentColor"
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															className="w-5 h-5"
															viewBox="0 0 24 24"
														>
															<path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
														</svg>
													</a>
													<a className="ml-2 text-gray-500">
														<svg
															fill="none"
															stroke="currentColor"
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															className="w-5 h-5"
															viewBox="0 0 24 24"
														>
															<path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
														</svg>
													</a>
													<a className="ml-2 text-gray-500">
														<svg
															fill="none"
															stroke="currentColor"
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															className="w-5 h-5"
															viewBox="0 0 24 24"
														>
															<path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
														</svg>
													</a>
												</span>
											</div>
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
								))}
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};

export default Instructor;
