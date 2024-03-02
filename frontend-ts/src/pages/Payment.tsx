import React, { useEffect } from 'react';
import server from '../Server/Server';

declare global {
    interface Window {
      Razorpay?: any;
    }
  }


function Payment() {
  // useEffect for laoding the razorpay script
  useEffect(() => {
    // Load the Razorpay script dynamically
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    // Cleanup the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, [])

  // useEffect to handle payment-sucess and payment-failure emits 
  useEffect(() => {
    // Function  for handling payment success 
    const handlePaymentSucess = (data:any) => {
       console.log("Payment Sucess full: ", data);
       let options = {
         key: "rzp_test_CtWF9px27auejT",
         amount: data.amount * 100,
         currency: "INR",
         order_id: data.order.id,
       }
       if (window.Razorpay) {
         let rzp1 = new window.Razorpay(options);
         rzp1.open();
       } else {
         console.error('Razorpay script not loaded.');
       }
    }
    server.on('payment-sucess', handlePaymentSucess)

    //  Function for handling payment failure
    const handlePaymentFailure = (data:any) =>{
      console.log("Payment failed: ", data);
    } 
    server.on('payment-failire', handlePaymentFailure)

    return () => {
        server.off('payment-sucess',handlePaymentSucess);
        server.off('payment-failure',handlePaymentFailure);
    }

  }, [])


  // function that will handle the payment 
  const handlePayment = (amount:number) => {
    if (!amount) {
      console.log("the amount for the product is empty");
      return;
    }
    console.log("Emiting Payment Event from the frontend ");

    server.emit('payment', amount);
  }

  return (
    <>
      {/* card */}
      <div className="bg-gray-200 drop-shadow-md w-[10rem] p-5 m-6 flex flex-col justify-center items-center ">
        Price: ₹1000
        <button onClick={() => handlePayment(1000)} className="px-5 text-white bg-black rounded-full">
          Purchase
        </button>
      </div>
    </>
  );
}

export default Payment;
