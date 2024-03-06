import React, { useState,useEffect } from 'react';
import server from '../Server/Server';
import CouponPopup from '../components/CouponPopup';
import QR from '../Images/qr-code.png';
import coupons from '../Images/promo-code.png';
import topup from '../Images/wallet.png';
import withdraw from '../Images/save-money.png'
// import QR from ""
// let QR = ''
// let coupons = ''
// let topup = ''

declare global {
    interface Window {
      Razorpay?: any;
    }
  }


function Payment() {
  const [showCouponPopup, setShowCouponPopup] = useState(false);

  const handleCouponButtonClick = () => {
    setShowCouponPopup(true);
  };

  const closeCouponPopup = () => {
    setShowCouponPopup(false);
  };

  const handleOnApplyCoupon = () =>{
    
  }

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

  const handleRedirect = () =>{
    window.location.href = "/home";
  }

  
  return (
    <>
      {/* card */}
      <div className='h-screen text-gray-100 bg-zinc-800 flex flex-col  gap-4'>
       
        <div className='mt-2 ml-8 grid grid-rows-2 grid-cols-2 gap-4'>
          <div className='flex flex-col justify-center items-start bg-orange-500 w-[95%] h-32  rounded' >
            <img src={QR} alt='QR' width={"85px"}/>
            <button onClick={() => handlePayment(100)} className='ml-3'>Scan QR</button>
          </div>
          <div className='flex flex-col justify-center items-start bg-orange-500 w-[95%] h-32  rounded' >
            <img src={coupons} alt='QR' width={"85px"}/>
            <button onClick={handleCouponButtonClick} className='ml-3'>Coupons</button>
            <CouponPopup onApplyCoupon={handleOnApplyCoupon} isOpen={showCouponPopup} onClose={closeCouponPopup} />
          </div>
          <div className='flex flex-col justify-center items-start bg-orange-500 w-[95%] h-32  rounded' >
            <img src={topup} alt='QR' width={"85px"}/>
            <button onClick={() => handlePayment(100)} className='ml-3'>Top Up</button>
          </div>
          <div className='flex flex-col justify-center items-start bg-orange-500 w-[95%] h-32  rounded' >
            <img src={withdraw} alt='QR' width={"85px"}/>
            <button onClick={() => handlePayment(100)} className='ml-3'>Withdraw</button>
          </div>
        </div>
        <div className='flex justify-center items-center bg-transparent w-[100%] h-16'>
          <button onClick={handleRedirect} className='text-white bg-indigo-800 rounded-lg p-2 shadow-xl transition duration-300 ease-in-out hover:shadow-indigo-500/50'>
            Start Playing
          </button>
        </div>

      </div>
    </>
  );
}

export default Payment;
