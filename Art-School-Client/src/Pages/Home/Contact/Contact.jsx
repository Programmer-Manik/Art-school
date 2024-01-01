import useAOS from "../../../hooks/useAos";

const Contact = () => {
	useAOS();

	return (
		<section className="text-gray-600 body-font relative">
			<div className="container px-5 py-24 mx-auto">
				<div
					data-aos="fade-down"
					data-aos-delay="400"
					className="text-center flex flex-col items-center"
				>
					<h1 className="text-xl md:text-3xl  font-semibold text-sky-600 my-6">
						Contact Us
					</h1>
					<p className="max-w-md">
						Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
						gentrify.
					</p>
				</div>

				<div className="lg:w-1/2 md:w-2/3 mx-auto">
					<div className="flex flex-wrap -m-2">
						<div
							data-aos="fade-right"
							data-aos-offset="300"
							data-aos-easing="ease-in-sine"
							className="p-2 w-1/2"
						>
							<div className="relative">
								<label
									htmlFor="name"
									className="leading-7 text-sm text-gray-600"
								>
									Name
								</label>
								<input
									type="text"
									id="name"
									name="name"
									className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
								/>
							</div>
						</div>
						<div
							data-aos="fade-left"
							data-aos-anchor="#example-anchor"
							data-aos-offset="500"
							data-aos-duration="500"
							className="p-2 w-1/2"
						>
							<div className="relative">
								<label
									htmlFor="email"
									className="leading-7 text-sm text-gray-600"
								>
									Email
								</label>
								<input
									type="email"
									id="email"
									name="email"
									className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
								/>
							</div>
						</div>
						<div
							data-aos="fade-zoom-in"
							data-aos-easing="ease-in-back"
							data-aos-delay="300"
							data-aos-offset="0"
							className="p-2 w-full"
						>
							<div className="relative">
								<label
									htmlFor="message"
									className="leading-7 text-sm text-gray-600"
								>
									Message
								</label>
								<textarea
									id="message"
									name="message"
									className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
									defaultValue={""}
								/>
							</div>
						</div>
						<div
							data-aos="fade-up"
							data-aos-anchor-placement="bottom-bottom"
							className="p-2 w-full"
						>
							<button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
								Send
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Contact;
