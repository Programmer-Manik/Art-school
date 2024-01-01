import Lottie from "lottie-react";
import animationData from "./error-image.json";
import { Link } from "react-router-dom";

const ErrorPage = () => {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<Lottie animationData={animationData} className="w-80" />

			<h1 className="text-3xl font-bold mb-4">Oops! Something went wrong.</h1>
			<p className="text-gray-500">We're sorry, but an error has occurred.</p>

			<Link className="btn mt-5" to="/">
				{" "}
				Back to Home{" "}
			</Link>
		</div>
	);
};

export default ErrorPage;
