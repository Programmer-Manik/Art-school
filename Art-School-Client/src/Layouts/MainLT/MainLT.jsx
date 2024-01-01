import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { Outlet } from "react-router-dom";

const MainLT = () => {
	return (
		<>
			<header className="">
				<Header />
			</header>

			<main className="min-h-[calc(100vh-365px)] py-6">
				<Outlet />
			</main>

			<Footer />
		</>
	);
};

export default MainLT;
