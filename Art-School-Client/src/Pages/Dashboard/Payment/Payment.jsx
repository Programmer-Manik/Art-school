import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
	return (
		<div className="!w-full block">
			<h1 className="text-xl md:text-3xl text-center font-semibold text-sky-600 my-6">
				Payment now
			</h1>
			<Elements stripe={stripePromise}>
				<CheckoutForm />
			</Elements>
		</div>
	);
};

export default Payment;
