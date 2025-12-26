import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe("pk_test_51SiZ9uHkfZxVlxfge1xeNmjR7jeZnA3IkWchdW1FqI7OUzmbQAsfAeS0WxEknuCYxXZpESIz7Iw0eKSCzmsiN7mC00boOOb4Hv"); // your test publishable key

export default function StripeWrapper({ bookingId, totalPrice, username,onClose }) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm bookingId={bookingId} totalPrice={totalPrice} username={username} onClose={onClose} />
    </Elements>
  );
}
