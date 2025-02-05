import React,{useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import {disPaymentPage,hidePaymentNav} from "../../../services/actions/actions";
import "./paymentOption.css";
import paymentSuccess from "/images/payment/paymentSuccess.png";
import failToPlaceOrder from "/images/payment/failToPlaceOrder.jpg";
import payPageImg from "/images/payment/payPage.jpg";
import Loader from '../../homepage/loader/loader';
import Invoice from "../invoice/invoice";
import logo from "/images/navbar/logo.png";

export default function PaymentOption() {
  const {dispPayment,totalAmount,orderL,selectedAdd} = useSelector((state)=>state.payment);
  const [compOrder,setCompOrder] = useState(false);
  const [failOrder,setFailOrder] = useState(false);
  const [loading,setLoading] = useState(false);
  const [inv,setInvNo] = useState();
  const [prodOrderId, setProdOrderId] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handlePay(){
    let num = Math.random()*Math.pow(10,12);
    let invoiceNo = Math.floor(num);
    setInvNo(invoiceNo);

    const res = await fetch(`${import.meta.env.VITE_REACT_API_URL}/payment/checkout`,{
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify({totalAmount,invoiceNo})
    });
    const finalRes = await res.json();
    console.log(finalRes);
    setProdOrderId(finalRes.orderId);
    handleRazorPay(finalRes.key,finalRes.orderId,invoiceNo);
  }
  function handleRazorPay(key,orderId,invoiceNo){
    var options = {
    "key": key, // Enter the Key ID generated from the Dashboard
    "amount": totalAmount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Acme Corp",
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
    "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler": async function (response){
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
        const user = localStorage.getItem("MDB_USER_EMAIL_ID");
        const res = await fetch(`${import.meta.env.VITE_REACT_API_URL}/payment/verification`,{
          method:"POST",
          headers:{
            "content-type":"application/json"
          },
          body:JSON.stringify({response,invoiceNo,selectedAdd,orderL,user})
        });
        const finalRes = await res.json();
        const {success,insertData} = finalRes;
        console.log(finalRes);

        if(success && insertData){
          setCompOrder(true);
          setFailOrder(false);
          dispatch(hidePaymentNav(true));
          dispatch(disPaymentPage(false))
          alert("Transaction complete");
        }else{
          alert("fail to insertData and payment");
          setFailOrder(true);
          dispatch(disPaymentPage(false));
          dispatch(hidePaymentNav(true));
        }       
    },
    // "prefill": {
    //     "name": "Gaurav Kumar",
    //     "email": "gaurav.kumar@example.com",
    //     "contact": "9000090000"
    // },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
  };

  setLoading(true)
  var rzp1 = new window.Razorpay(options);
  rzp1.on('payment.failed', function (response){
    alert("Payment failed");
    // alert(response.error.code);
    // alert(response.error.description);
    // alert(response.error.source);
    // alert(response.error.step);
    // alert(response.error.reason);
    // alert(response.error.metadata.order_id);
    // alert(response.error.metadata.payment_id);
    setFailOrder(true);
    dispatch(disPaymentPage(false));
    dispatch(hidePaymentNav(true));
  });
    rzp1.open();
    setLoading(false);
  }

  return (
    <>
    {dispPayment && 
    <div id='mainPaymentOptions'>
      <div id='paymentOptionsDiv'>
          <div id='logoPO' >
            <img src={logo} alt="error" />
          </div>
          <h1 className='headPaymentOption'>Payment Now</h1>
          <div id='mainPO'>
            <h3 id='divPM'>Payment Method</h3>
            <div style={{display:'flex',gap:'2rem',padding:'10px',justifyContent:'space-between'}}>
              <div id='payButtonDiv'>
                <h4>Online Pay</h4>
                <button onClick={handlePay}>Pay now</button>
              </div>
            </div>
          </div>
      </div>
    </div>  
    }
    { compOrder?
        <>
          <div id='successPayDiv'>
            <img src={paymentSuccess} alt="error" width="100%" />
          </div>
          <Invoice invoiceNo={inv} totalAmount={totalAmount} orderId={prodOrderId}/>
        </>
      :null}
    
    { failOrder?
      <>
        <h1 id="failTransHead">Transaction Failed !!</h1>
        <div style={{textAlign:'center'}} id='failTransDiv'>
          <img src={failToPlaceOrder} alt="error" width="80%" onClick={()=>navigate("/")}/>
        </div>
      </>
      :null} 
      
    {loading?<Loader/>:null}
    </>
  )
}
