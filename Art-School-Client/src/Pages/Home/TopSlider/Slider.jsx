import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import slider1 from "../../../assets/Slider/slider-image-1.jfif";
import slider2 from "../../../assets/Slider/slider-image-2.jfif";
import slider3 from "../../../assets/Slider/slider-image-3.jfif";

const Slider = () => {
	return (
		<>
			<Swiper
				pagination={{
					dynamicBullets: true,
				}}
				modules={[Pagination, Autoplay]}
				autoplay={true}
				className="mySwiper"
			>
				<SwiperSlide className="relative">
					<img src={slider1} className="h-full z-0" alt="" />
					<div className="absolute w-full bg-slate-200 z-10">
						<div className="absolute top-1/2 left-1/2 md:w-2/3 w-11/12 bg-opacity-40 rounded-md p-6 bg-gray-500  -translate-y-1/2 -translate-x-1/2 text-center space-y-5">
							<h3 className="text-2xl text-white">
								Create the best moves for you
							</h3>
							<h2 className="uppercase text-2xl md:text-4xl lg:text-6xl font-bold text-white">
								Welcome Our Arts Schools
							</h2>
							<button className="btn btn-primary uppercase text-white">
								our services
							</button>
							<button className="btn btn-outline btn-primary uppercase ml-5 text-white">
								get a quote
							</button>
						</div>
					</div>
				</SwiperSlide>
				<SwiperSlide className="relative">
					<img src={slider2} alt="" />
					<div className="absolute w-full bg-slate-200 z-10">
						<div className="absolute top-1/2 left-1/2 md:w-2/3 w-11/12 bg-opacity-40 rounded-md p-6 bg-gray-500  -translate-y-1/2 -translate-x-1/2 text-center space-y-5">
							<h3 className="text-2xl text-white">
								Create the best moves for you
							</h3>
							<h2 className="uppercase text-2xl md:text-4xl lg:text-6xl font-bold text-white">
								Welcome Our Arts Schools
							</h2>
							<button className="btn btn-primary uppercase text-white">
								our services
							</button>
							<button className="btn btn-outline btn-primary uppercase ml-5 text-white">
								get a quote
							</button>
						</div>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<img src={slider3} />

					<div className="absolute w-full bg-slate-200 z-10">
						<div className="absolute top-1/2 left-1/2 md:w-2/3 w-11/12 bg-opacity-40 rounded-md p-6 bg-gray-500  -translate-y-1/2 -translate-x-1/2 text-center space-y-5">
							<h3 className="text-2xl text-white">
								Create the best moves for you
							</h3>
							<h2 className="uppercase text-2xl md:text-4xl lg:text-6xl font-bold text-white">
								Welcome Our Arts Schools
							</h2>
							<button className="btn btn-primary uppercase text-white">
								our services
							</button>
							<button className="btn btn-outline btn-primary uppercase ml-5 text-white">
								get a quote
							</button>
						</div>
					</div>
				</SwiperSlide>
			</Swiper>
		</>
	);
};

export default Slider;
