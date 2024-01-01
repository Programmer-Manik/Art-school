import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./Payment-Checkout.css";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
	const { user, paySelectedClg } = useAuth();
	const [axiosSecure] = useAxiosSecure();
	const stripe = useStripe();
	const elements = useElements();
	const [cardError, setCardError] = useState("");
	const [clientSecret, setClientSecret] = useState("");
	const [processing, setProcessing] = useState(false);
	const navigate = useNavigate();

	console.log("paySelectedClg Checkout page -> ", paySelectedClg);

	useEffect(() => {
		if (paySelectedClg != {}) {
			axiosSecure
				.post("/create-payment-intent", {
					price: paySelectedClg?.price,
				})
				.then((res) => {
					console.log(res?.data?.clientSecret);
					setClientSecret(res?.data?.clientSecret);
				});
		}
	}, [paySelectedClg, axiosSecure]);

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		const card = elements.getElement(CardElement);
		if (card == null) {
			return;
		}
		console.log(card);

		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: "card",
			card,
		});

		if (error) {
			console.log("error -> ", error);
			setCardError(error.message);
		} else {
			setCardError(null);
			console.log(paymentMethod);
		}

		setProcessing(true);

		const { paymentIntent, error: confirmError } =
			await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: card,
					billing_details: {
						email: user?.email || "unknown",
						name: user?.displayName || "anonymous",
					},
				},
			});

		if (confirmError) {
			console.log("confirm error -> ", confirmError);
		}

		console.log("COnfirm Payment -> ", paymentIntent);

		setProcessing(false);

		if (paymentIntent.status === "succeeded") {
			paySelectedClg.enrolled = true;
			const payment = {
				...paySelectedClg,
				transactionId: paymentIntent.id,
			};
			console.log("Payment  Success -> ", payment);

			axiosSecure.post("/payments", payment).then((res) => {
				console.log("Payments Success -> ", res.data);
				toast.success("Payment Success");
				if (
					res.data.ClgUpdateCollection.modifiedCount > 0 &&
					res.data.insertResult.insertedId &&
					res.data.deleteResult.deletedCount > 0
				) {
					navigate("/dashboard/my-enrolled-class");
					// display confirm
					Swal.fire({
						position: "center",
						icon: "success",
						title: "Thanks for Payments Success",
						showConfirmButton: false,
						timer: 1500,
					});
				}
			});
		}
	};

	return (
		<>
			<form
				className="mt-8 text-center flex bg-slate-100 justify-between flex-col gap-5 p-6 rounded-md lg:w-2/5 mx-auto border "
				onSubmit={handleSubmit}
			>
				<CardElement
					options={{
						style: {
							base: {
								fontSize: "16px",
								color: "#424770",
								"::placeholder": {
									color: "#aab7c4",
								},
							},
							invalid: {
								color: "#9e2146",
							},
						},
					}}
				/>
				{/* TODO: button disable */}
				<button
					className="btn btn-outline btn-accent mt-3"
					type="submit"
					// disabled={!stripe || !processing}
				>
					Pay
				</button>
			</form>

			{cardError && <p className="text-red-600 "> {cardError} </p>}
		</>
	);
};

export default CheckoutForm;
