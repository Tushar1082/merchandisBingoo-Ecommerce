import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import Navbar from '../../navbar/navbar';
import Footer from '../../footer/footer';
import {PhoneFooter} from "../../homepage";
import CryptoJS from 'crypto-js';
import Loader from '../../loader/loader';
import "./myOrders.css";

export default function MyOrders() {
  const [data,setData] = useState();
  const [searchStr,setSearchStr] = useState();
  const [preserve,setPreserve] = useState();
  const [showloading, setShowLoading] = useState(false);

  const navigate = useNavigate();

  function orderName(str){
    if(str.length>40)
    return str.slice(0,40)+"...";
    else
    return str;
  }
  function navigateTo(category,sale,id){
    const encSale = "sale="+sale.toString();
    const encryS = CryptoJS.AES.encrypt(encSale,import.meta.env.VITE_REACT_EncryptKey);
    return `?category=${category}&&${encryS.toString()}&&id=${id}`;
  }
  function OrderItem({userItem,invoiceNo,orderStatus}){
    
   return(
    <>
    { userItem &&
      userItem.map((elem,index)=>(
        <div id='itemDivMyOrders' key={index} style={{alignItems:"center"}}>
          <Link to={{pathname:"/productOrderPage",search:`?invoiceNo=${invoiceNo}`}} style={{color:"black",textDecoration:"none"}}>
            <div id='imgDivOT'>
              <img src={elem.img[0]} alt="error" style={{width:"100%"}} />
            </div>
          </Link>
          <Link to={{pathname:"/productOrderPage",search:`?invoiceNo=${invoiceNo}`}} id='secondLinkOT'>
            <div >
              <p style={{fontWeight:'bold'}}>
                {orderName(elem.name)}
              </p>
              <p><span style={{color:"red",fontWeight:"bold",fontFamily:`'Roboto Slab', serif`}}>Company Name: </span>{elem.companyName}</p>
            </div>
          </Link>
          <Link to={{pathname:"/productOrderPage",search:`?invoiceNo=${invoiceNo}`}} style={{color:"black",textDecoration:"none"}}>
            <div id="userPriceOT">
              <p style={{fontWeight:'bold'}}>₹{totalPrice(userItem)}</p>
            </div>
          </Link>
          <Link to={{pathname:"/productOrderPage",search:`?invoiceNo=${invoiceNo}`}} style={{color:"black",textDecoration:"none"}}>
            <div id='mainOrderStatus'>
              <div style={{background:orderStatus ==="Cancelled"?"red":"limegreen"}}></div>
              <h4 style={{fontFamily:'Cinzel Decorative'}}>
                {orderStatus}
              </h4>
            </div>
          </Link>

          <Link to={{pathname:"/buyPage",search:navigateTo(elem.category,elem.sale,elem._id)}} style={{color:"black",textDecoration:"none"}} >
            <div id='ratingOT'>
              <div>
                <img src="images/fullStar.png" alt="error" height="20px" />
              </div>
              <div>
                <h4 style={{fontFamily:'Lora'}}>Rate & Review Product</h4>
              </div>
            </div>
          </Link>
        </div>
      ))
    }
    </>
    )
  }
  
  function totalPrice(userItems) {
    if (!userItems || userItems.length === 0) return 0;
    return userItems.reduce((total, elem) => {
      const discountPrice = (elem.price - (elem.price * (elem.sale / 100))).toFixed(2);
      return total + (parseFloat(discountPrice) * elem.quantity);
    }, 0);
  }  

  function OrderItems({userItems,invoiceNo,orderStatus}){

    return(
      <>
          <div id='itemDivMyOrders'  style={{alignItems:"center"}}>
          <Link to={{pathname:"/productOrderPage",search:`?invoiceNo=${invoiceNo}`}} style={{color:"black",textDecoration:"none"}}>

              <div id='itemImgDivMyOrders'>
        { userItems && userItems.map((elem,index)=>(
                index<3?<img src={elem.img[0]} alt="error" key={index} />:null
            ))
          }
          {userItems.length>3?<div id='moreItemsCountDiv'>+{(userItems.length)-3}</div>:<div id='moreItemsCountDiv' style={{visibility:"hidden"}}>1</div>}
              </div>
          </Link>          
          <Link to={{pathname:"/productOrderPage",search:`?invoiceNo=${invoiceNo}`}} id='secondLinkOTS'>
              <div>
          { userItems && userItems.map((elem,index)=>(
                index<3?
                <p key={index} style={{fontFamily:`"Berkshire Swash", serif`, fontWeight:'bold'}}>
                  {orderName(elem.name)} {index != userItems.length-1?<span>,</span>:null} 
                </p>:null
          ))
          }...   
              </div>
          </Link>
              <div id='userPriceOT'>
                <p style={{fontWeight:'bold'}}>₹{totalPrice(userItems)}</p>
              </div>
              <div id='mainOrderStatus'>
              <div style={{background:orderStatus ==="Canceled"?"red":"limegreen"}}></div>
                <h4 style={{fontFamily:`'Cinzel Decorative'`}}>
                  {orderStatus}
                </h4>
              </div>
              <div id='ratingOT'>
                <div>
                  <img src="images/fullStar.png" alt="error" height="20px" />
                </div>
          <Link to={{pathname:"/productOrderPage",search:`?invoiceNo=${invoiceNo}`}} style={{color:"black",textDecoration:"none"}}>
                <div>
                  <h4 style={{fontFamily:`Lora`}}>Rate & Review Product</h4>
                </div>
          </Link>          
              </div>
            </div>
      
      </>
    )
  }

  function handleSearch() {
    setShowLoading(true);
    const arr = new Set();
    const str = searchStr.trim().split(" ");
    setPreserve(data);
  
    data.forEach((orders) => {
      orders.userOrders.forEach((obj) => {
        const productName = obj.name.toLowerCase().trim();
        str.forEach((word) => {
          if (productName.includes(word.toLowerCase())) {
            arr.add(orders);
          }
        });
      });
    });
  
    setData([...arr]); // Convert Set back to array
    setShowLoading(false);
  }
  
  function resetData(e) {
    const value = e.target.value.trim();
    setSearchStr(value);
    if (value === "") setData(preserve);
  }

  async function callData(){
    try {
      setShowLoading(true);
      const user = localStorage.getItem("MDB_USER_EMAIL_ID");
      const token = Cookies.get("token");
  
      const res = await fetch(`${import.meta.env.VITE_REACT_API_URL}/user?user=${user}`,{
        method:"GET",
        headers:{
          "authorization" : `Bearer ${token}`
        }
      });
      const finalRes = await res.json();
  
      if(finalRes.Unauthorized){
        navigate("/unauthorize");
      }else{
        const {orderList} = finalRes;
        setData(orderList.reverse());
      }
    } catch (error) {
      console.log(error);
    } finally{
      setShowLoading(false);
    }
  }
  useEffect(()=>{
    callData();
  },[])
  return (
  <>
  <Navbar/>
    <div id="masterMainMyOrder">
        <div id='orderSearchBar'>
            <input type="text" value={searchStr} onChange={resetData} onKeyDown={(e)=>e.key==="Enter"?handleSearch():null} placeholder='Search your orders here...' />
            <button onClick={handleSearch}>Search</button>
        </div>
        {data && data.length>0 && <div id='orderCon'>
        {data.map((elem,index)=>(
           (elem.userOrders).length==1?<OrderItem key={index} userItem={elem.userOrders} orderStatus={elem.orderStatus} invoiceNo={elem.invoiceNo} />:<OrderItems key={index} userItems={elem.userOrders} orderStatus={elem.orderStatus} invoiceNo={elem.invoiceNo}/>
        ))}
        </div>}
        {data && data.length==0 && <div style={{width:'25%', margin:'auto'}}>
          <img src="./images/emptyOrderList.png" alt="error" style={{width:"100%"}} />
        </div>}
    </div>
    <Footer/>
    <PhoneFooter/>
    {showloading?<Loader/>:null}
  </>
  )
}
