import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const PaymentGateway = ({ amount, order_id, onSuccess  }) => {
  // const amount = 500;
  const currency = "INR";
  const navigate = useNavigate();
  // const receiptId = "qwsaq1";
  // const { amount, order_id } = location.state || {};
  console.log(amount, order_id)
  const paymentHandler = async (e) => {
    const response = await fetch("https://hall4.onrender.com/order", {
      method: "POST",
      body: JSON.stringify({
        amount,
        currency,
        receipt: order_id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const order = await response.json();
    // console.log(order);

    var options = {
      key: "rzp_test_SpbDtqndnLz5zB", // Enter the Key ID generated from the Dashboard
      amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency,
      name: "Hall4", //your business name
      description: "Test Transaction",
      image: "../images/logo.png",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        const body = {
          ...response,
        };

        const validateRes = await fetch(
          "https://hall4.onrender.com/order/validate",
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const jsonRes = await validateRes.json();
        // console.log(jsonRes);
        // onSuccess();
        onSuccess(jsonRes);
        // Redirect to success page with jsonRes data
        // navigate('/services', { state: { jsonRes } });
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: "Web Dev Matrix", //your customer's name
        email: "webdevmatrix@example.com",
        contact: "9000000000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      // alert(response.error.code);
      // alert(response.error.description);
      // alert(response.error.source);
      // alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    e.preventDefault();
  };

  return (
    <div className="product">
      <Button variant="primary" onClick={paymentHandler}>
        Pay Now
      </Button>
    </div>

  );
}

export default PaymentGateway;