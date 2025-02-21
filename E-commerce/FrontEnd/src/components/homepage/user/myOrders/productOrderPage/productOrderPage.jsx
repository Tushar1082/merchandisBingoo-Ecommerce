import React,{useState,useEffect} from 'react';
import { fireDB } from '../../../../../../firebaseConfig';
import { getStorage, ref, listAll, deleteObject } from "firebase/storage";
import { Link,useLocation } from 'react-router-dom';
import  Navbar from "../../../navbar/navbar"
import invoiceDownload from "/images/invoiceDownload.png";
import helpSupport from "/images/24HrsSupport.png";
import Footer from '../../../footer/footer';
import { PhoneFooter } from '../../../homepage';
import Loader from '../../../loader/loader';
import CryptoJS from 'crypto-js';
import './productOrderPage.css';

export default function ProductOrderPage() {
  const location = useLocation();
  const invoiceNo = location.search.split("?")[1].split("=")[1];
  const [data,setData] = useState();
  const [trackOrder,setTrackOrder] = useState();
  const [loading,setLoading] = useState(false);
  const userEmail = localStorage.getItem("MDB_USER_EMAIL_ID");

  function productName(str){
    if(str.length>40)
    return str.slice(0,40)+"...";
    else
    return str;
  }
  function ProductPrice({ price, sale }) {
  const discountPrice = parseFloat( (price - (price * (sale / 100))).toFixed(2) );
  const off = parseFloat( (price * (sale / 100)).toFixed(2) );
    
  return (
    <>
      <p style={{color:"green", fontWeight:'bold', marginTop:'5px'}}>Extra ₹{off} off</p>
      <h4>
        ₹{discountPrice} <del style={{color:"grey"}}>{parseFloat(price.toFixed(2))}</del>{" "}
        <span style={{color:"green"}}>{sale}% off</span>
      </h4>
    </>
  );
  }

  async  function handleCancelOrder(){
    setLoading(true);
    // const user = localStorage.getItem("loginedUser");
    try {      
      const res = await fetch(`${import.meta.env.VITE_REACT_API_URL}/cancelOrder`,{
        method:"POST",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify({invoiceNo,userEmail})
      });

      const finalRes = await res.json();
      const {success,fail} = finalRes;

      if(success){
        const dbRef = ref(fireDB, `MerchandiseBingoo/users/${userEmail}/orders/${invoiceNo}`);
        await deleteObject(dbRef);
          setLoading(false);
          // alert(success);
          window.location.reload();
      }else if(fail){
        setLoading(false);
        alert("failed to cancel order");
      }
    } catch (error) {
      setLoading(false);
      alert("failed to cancel order and error from here");
      console.log(error);
    }
  }
  async function callData(){
    // const user = localStorage.getItem("loginedUser");
    try {
      const res = await fetch(`${import.meta.env.VITE_REACT_API_URL}/productOrderPage`,{
        method:"POST",
        headers:{
          "content-type" : 'application/json'
        },
        body:JSON.stringify({userEmail,invoiceNo})
      });
      const finalRes = await res.json();

      if(finalRes.fail){
        alert('failed to fetch order data...');
        return;
      }
      const {orderData} = finalRes;
      setTrackOrder(orderData[0].orderStatus);
      setData(orderData);    
    } catch (error) {
      console.log(error);
      alert("error from here, while fetching user data");
    }
  }
  function navigateTo(category,sale,id){
    const encSale = "sale="+sale.toString();
    const encryS = CryptoJS.AES.encrypt(encSale,import.meta.env.VITE_REACT_EncryptKey);
    return `?category=${category}&&${encryS.toString()}&&id=${id}`;
  }
  useEffect(()=>{
    setLoading(true);
    callData();
      setLoading(false);
  },[])

  return (
    <>
    <Navbar/>
    <div id='mainPOP'>
      <div id="orderItemProductOrderPage">
       {data && 
      
       <div id='deliveryAddressProductOrder'>
          <div>
            <h3>Purchase Date: </h3>
            <span><i>{data[0].invoiceDate}</i></span>
          </div>
          <h2>Delivery Address:-</h2>
          <p><span style={{fontWeight:'bold'}}>Name: </span>{data[0].address.name}</p>
          <p><span style={{fontWeight:'bold'}}>Address: </span>{data[0].address.address}</p>
          <p><span style={{fontWeight:"bold"}}>Locality:</span> {data[0].address.locality}</p>
          {data[0].address.landmark!=""?<p><span style={{fontWeight:"bold"}}>Landmark:</span> {data[0].address.landmark}</p>:null}
          <p>{data[0].address.city},{data[0].address.state} {data[0].address.pincode}</p>
          <p><span style={{fontWeight:"bold"}}>Phone No. :</span>{data[0].address.phoneNo}</p>
          {data[0].address.altPhone!=""?<p><span style={{fontWeight:"bold"}}>Alternative Phone No. :</span> {data[0].address.altPhone}</p>:null}
          <div id='downloadBtnDiv'>
              <a id='downloadInvoice' href={data[0].invoicePdf} download  target='_black' style={{textDecoration:"none"}}>
                <img src={invoiceDownload} alt="error" height="40px" />
                <button 
                  style={{color:trackOrder==="Cancelled"?"grey":"darkcyan"}}
                  disabled={trackOrder==="Cancelled"?true:false} 
                >Invoice download</button>
              </a>
          </div>
        </div>
        
       }
        <div id='mainPOPItems'>
            <div id='productsHeadPOP'>
              <h2>Products :-</h2>
            </div>
            <div id="orderItemPreviewDiv">
              {/* image and name */}
              {data && (data[0].userOrders).map((elem,index)=>(
                <div key={index} id="orderItemInvoice">
                <Link to={`/buyPage${navigateTo(elem.category,elem.sale,elem._id)}`} style={{color:"black",textDecoration:"none"}}>
                    <div id='imgPOP'>
                      <img 
                      src={elem.img[0]}
                      alt="error"
                      style={{
                        height:"100%",
                        width:"100%"
                      }} 
                        />
                    </div>
                    </Link>
                    <div>
                    <Link to={`/buyPage${navigateTo(elem.category,elem.sale,elem._id)}`} style={{color:"black",textDecoration:"none"}}>
                      <div>
                        <h4>{productName(elem.name)}...</h4>
                        <p style={{fontWeight:'bold'}}><span>Category:</span> <span style={{color:'red'}}>{elem.category}</span></p>
                        <p style={{fontWeight:'bold'}}><span>Quantity:</span><span style={{color:'darkcyan'}}> {elem.quantity}</span></p>
                      </div>
                    </Link>
                      <div>
                        <ProductPrice price={elem.price} sale={elem.sale}/>
                      </div>
                    </div>
                </div>
              ))}
            </div>
        </div>
      </div>
      <div id='productStatus'>
            {data && (
        (data[0].userOrders.length === 1 ? (
          <img src={data[0].userOrders[0].img[0]} alt="error" id='prodImgPOP' />
        ) : (
          <div id='IIDMO' style={{padding:"5px"}}>
            {data[0].userOrders.map((elem, index) => (
              index < 3 ? <img src={elem.img[0]} alt="error" id='prodImgPOP' key={index} /> : null
            ))}
            {data[0].userOrders.length > 3 ? (
              <div id='moreItemsCountDiv'>+{(data[0].userOrders.length) - 3}</div>
            ) : (
              <div id='moreItemsCountDiv' style={{ visibility: "hidden" }}>1</div>
            )}
          </div>
        )
      ))}

        
        
        {data && <div id='mainOrderTrack'>
          <div id='trackOrder'>
            <div id='customCheckBox'>
              <p style={{background:(trackOrder=="Order Confirmed"||trackOrder=="Shipped"||trackOrder=="Out For Delivery"||trackOrder=="Delivered")?"#8a52db":"lightgrey"}}>✔</p>
            </div>
            <p >Order Confirmed</p>
          </div>
            <div id="trackLine"></div>
          <div id='trackOrder'>
            <div id='customCheckBox'>
              <p style={{background:trackOrder=="Shipped"||trackOrder=="Out For Delivery"||trackOrder=="Delivered"?"#8a52db":"lightgrey"}} >✔</p>
            </div>
            <p>Shipped</p>
          </div>
            <div id="trackLine"></div>
          <div id='trackOrder'>
            <div id='customCheckBox'>
              <p style={{background:trackOrder=="Out For Delivery"||trackOrder=="Delivered"?"#8a52db":"lightgrey"}}>✔</p>
            </div>
            <p>Out For Delivery</p>
          </div>
            <div id='trackLine'></div>
          <div id='trackOrder'>
            <div id='customCheckBox'>
              <p style={{background:trackOrder=="Delivered"?"#8a52db":"lightgrey"}}>✔</p>
            </div>
            <p>Delivered</p>
          </div>
        </div>}
          

        <div id='mainCancelDiv'>
          <div>
            <button 
              id='cancelOrderBtn' 
              disabled={trackOrder==="Cancelled"?true:false} 
              style={{color:trackOrder==="Cancelled"?"grey":"darkcyan"}}
              onClick={handleCancelOrder}
              >Cancel Order</button>
          </div>
          <div id='helpSupportDivProduct'>
            <img src={helpSupport} alt="error" height="40px" />
            <p>Help and Support 24x7</p>
          </div>
        </div>
      </div>
        <div id='hSDPPhone'>
            <img src={helpSupport} alt="error" />
            <p>Help and Support 24x7</p>
          </div>
    </div>
    {loading?<Loader/>:null}
    <Footer/>
    <PhoneFooter/>
    </>
  )
}
