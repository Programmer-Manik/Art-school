import Loading from "../../Components/Loading";
import Contact from "./Contact/Contact";
import PopularClass from "./PopularClass/PopularClass";
import PopularInstructor from "./PopularInstructor/PopularInstructor";
import Slider from "./TopSlider/Slider";
import TopSlider from "./TopSlider/TopSlider";

const Home = () => {
	return (
		<div className="divide-y">
			{/* <TopSlider /> */}
			<Slider />

			<PopularClass />

			<PopularInstructor />

			<Contact />
		</div>
	);
};

export default Home;
