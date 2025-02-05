import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import deliveryAddress from "/images/payment/address.png";
import orderSummary from "/images/payment/orderSummary.png";
import payment from "/images/payment/payment.png";
import line from "/images/payment/line.png";
import lineLeft from "/images/payment/lineLeft.png";
import orderSummaryLeft from "/images/payment/orderSummaryLeft.png";
import paymentLeft from "/images/payment/paymentLeft.png";
import "./payment.css";
import DeliveryAddress from './deliveryAddress/deliveryAddress';
import OrderSummary from './orderSummary/orderSummary';
import PaymentOption from './paymentOptions/paymentOption';

export default function Payment() {
  const {dispOrder,dispPayment,orderL,hidden} = useSelector((state)=>state.payment);

  function PaymentNav(){
    return(
      <div id='paymentNavMain'>
        <div>
          <img src={deliveryAddress} alt="error" height="50px" />
            <p>Delivery Address</p>
        </div>
        <div style={{borderRadius:"10px",overflow:"hidden"}} id='lineLeftDiv'>
          <img src={dispOrder||dispPayment?line:lineLeft} alt="error" width="100%" />
        </div>
        <div>
          <img src={(dispOrder||dispPayment)?orderSummary:orderSummaryLeft} alt="error" height="50px" />
          <p>Order Summary</p>
        </div>
        <div id='lineLeftDiv' style={{borderRadius:"10px",overflow:"hidden"}}>
        <img src={dispPayment?line:lineLeft} alt="error" width="100%"/>
        </div>
        <div>
          <img src={dispPayment?payment:paymentLeft} alt="error" height="50px" />
         <p>Payment</p>
        </div>
      </div>
    )
  }
  return (
    <>
    {hidden==false? <PaymentNav/>:null}
      <DeliveryAddress/>
      <OrderSummary orderL={orderL} dispOrder={dispOrder}/>
      <PaymentOption/>
    </>
  )
}
