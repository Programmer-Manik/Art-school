import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./TopSlider.css";

import image1 from "../../../assets/Slider/slider-image-1.jfif";
import image2 from "../../../assets/Slider/slider-image-2.jfif";
import image3 from "../../../assets/Slider/slider-image-3.jfif";
import image4 from "../../../assets/Slider/slider-image-4.jfif";

const TopSlider = () => {
	// TODO: Image Error
	return (
		<div className="h-[400px] overflow-hidden">
			<Swiper
				cssMode={true}
				navigation={true}
				pagination={true}
				mousewheel={true}
				keyboard={true}
				autoplay={true}
				modules={[Navigation, Pagination, Mousewheel, Keyboard]}
				className="mySwiper"
			>
				<SwiperSlide>
					<img src={image1} alt="" />
				</SwiperSlide>
				<SwiperSlide>
					<img src={image2} alt="" />
				</SwiperSlide>
				<SwiperSlide>
					<img src={image3} alt="" />
				</SwiperSlide>
				<SwiperSlide>
					<img src={image4} alt="" />
				</SwiperSlide>
			</Swiper>
		</div>
	);
};

export default TopSlider;
