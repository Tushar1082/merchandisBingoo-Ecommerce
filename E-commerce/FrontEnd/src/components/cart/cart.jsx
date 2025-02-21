import React, { useState,useEffect,useRef } from 'react';
import { incCartPrice,incCartDisPrice,decCartPrice,decCartDisPrice,orderList,showPayment,setCartPrice,setDisCartPrice, totalAmount,Counting,userEmailId } from '../../services/actions/actions';
import { useSelector,useDispatch } from 'react-redux';
import Navbar, { handleList } from '../homepage/navbar/navbar';
import { Link,useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import "./cart.css";
import Loader from '../homepage/loader/loader';
import cartImg from "/images/cartImg.png";
import remCartItem from "/images/remCartItem.png";
import emptyCart from "/images/empty.jpg";
import Payment from '../payment/payment';
import Footer from '../homepage/footer/footer';
import { PhoneFooter } from '../homepage/homepage';
import CryptoJS from 'crypto-js';

function CartItem({img,price,sale,index,name,category,id,setObj,setItemsLen,itemsLen, cartCount, dataItem}){
  const [count,setCount] = useState(1);
  const [disPric,setDisPrice] = useState();
  const [total,setTotal] = useState();
  const [loading,setLoading] = useState(false);
  const myRef = useRef();
  const dispatch = useDispatch();
  let off;

  function Price( price, sale) {
    const discountPrice = parseFloat((price - (price * (sale / 100))).toFixed(2));
    off = parseFloat((price * (sale / 100)).toFixed(2));

    return (
      <>
        <p id='offC' >Extra {off} off</p>
        <h3 style={{fontFamily:`'Berkshire Swash', serif`}} id='priceC'>
          ₹{discountPrice} <del style={{color:"grey",fontFamily:`'Berkshire Swash', serif`}}>{parseFloat(price.toFixed(2))}</del>{" "}
          <span style={{color:"green",fontWeight:"bold",fontFamily:`'Berkshire Swash', serif`}}>{sale}% off</span>
        </h3>
      </>
    );
  }
  function handleIncPrice(){
    setCount(count+1);
    setTotal(total+disPric);
    dispatch(incCartDisPrice(off));
    dispatch(incCartPrice(parseFloat(price.toFixed(2))));
    // setObj((prev) => {
    //   return prev.map(item => {
    //     if (item.id === id && item.category === category) {
    //       return { ...item, count: count+1 };
    //     }
    //     return item;
    //   });
    // });
    setObj((prev) => {
      return prev.map(item => {
        if (item._id === id && item.category === category) {
          return { ...item, quantity: count+1 };
        }
        return item;
      });
    });
  }
  function handledecPrice(){
    if(count!=1){
      setCount(count-1);
      setTotal(total-disPric);
      dispatch(decCartDisPrice(off));
      dispatch(decCartPrice(parseFloat(price.toFixed(2))));
      // setObj((prev) => {
      //   return prev.map(item => {
      //     if (item.id === id && item.category === category) {
      //       return { ...item, count: count-1 };
      //     }
      //     return item;
      //   });
      // });
      setObj((prev) => {
        return prev.map(item => {
          if (item._id === id && item.category === category) {
            return { ...item, quantity: count-1 };
          }
          return item;
        });
      });
    }
  }

  function removeItem(){
    const removeElem = myRef.current;
    dispatch(decCartDisPrice(off));
    dispatch(decCartPrice(parseFloat(price.toFixed(2))));
    dispatch(Counting(cartCount-1));
    const obj={
      id:id,
      category:category
    }
    const p = new Promise((resolve,reject)=>{
      try {        
        setLoading(true);
        handleList([],[obj]);
        resolve();
      } catch (error) {
        reject();
      }
    })
    p.then(()=>{
      setLoading(false);
      removeElem.remove();
      setItemsLen(itemsLen-1);
      // window.location.reload();
    }).catch((error)=>{
      alert(error);
    })
  }
  function navigateTo(){
    const encSale = "sale="+sale.toString();
    const encryS = CryptoJS.AES.encrypt(encSale,import.meta.env.VITE_REACT_EncryptKey);
    return `?category=${category}&&${encryS.toString()}&&id=${id}`;
  }

  useEffect(()=>{
    const discountPrice = parseFloat(( (price - (price * (sale / 100))) ).toFixed(2));
    const off = parseFloat((price * (sale / 100)).toFixed(2));
    dispatch(incCartDisPrice(off));
    dispatch(incCartPrice(parseFloat(price.toFixed(2))));
    setDisPrice(discountPrice);
    setTotal(discountPrice);
    
    setObj((prev)=>([...prev,{...dataItem.products,category:category, sale:sale, quantity:count}]));
    // setObj((prev)=>([...prev,{id:id,category:category,count:count}]));

  },[])

  return(
    <>
    {loading?<Loader/>:""}
    <tr key={index} ref={myRef} id='cartItemsC'>
      <td style={{fontSize:"2rem"}}>{index+1}.</td>
      <td id='productCartPage'>
        <div>
          <img src={img} alt="error" id="cartItemImg" />
        </div>
        <Link
          style={{color:"black",textDecoration:"none"}}
          to={{pathname:"/buyPage",search:navigateTo()}}
        >
          <div style={{fontSize:"large"}}>
            {name.length>40?name.slice(0,40)+"...":name}
          </div>
        </Link>
      </td>

      <td style={{textAlign:"start"}}>{Price(price,sale)}</td>
      <td>
      <div id='productCountDiv'>
        <button onClick={handledecPrice}>-</button>
        <div>{count}</div>
        <button onClick={handleIncPrice}>+</button>
      </div>
      </td>
      <td id='totalC' >₹{total}</td>
      <td style={{textAlign:"start"}} id='removeConC'>
        <img src={remCartItem} id='removeCartImg' onClick={removeItem}/>
      </td>
  </tr>
    </>
  )
}
export default function CartPage() {
  const [data,setData] = useState([]);
  const [showEmpty,setShowEmpty] = useState();
  const {cartDisPrice,cartPrice,count} = useSelector((state)=>state.cart);
  const {showP} = useSelector((state)=>state.payment);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [obj,setObj] = useState([]);
  const [loading,setLoading] = useState(false);
  const [itemsLen, setItemsLen] = useState(0);

  async function callData(){
    const token = Cookies.get("token");

    const userEmail = localStorage.getItem("MDB_USER_EMAIL_ID");
    try {
      const res = await fetch(`${import.meta.env.VITE_REACT_API_URL}/user?user=${userEmail}`,{
        method:'GET',
        headers:{
          'authorization': `Bearer ${token}`,
        }
      });
      const finalRes = await res.json();
      const {cartList} = finalRes;

      if(finalRes.Unauthorized){
         navigate("/unauthorize");
      }
      dispatch(userEmailId(userEmail));
      const newRes = await fetch(`${import.meta.env.VITE_REACT_API_URL}/cart`,{
      method:"POST",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify({...cartList})
    })
    const newFinalRes = await newRes.json();
    const {cartItems} = newFinalRes;

    if(cartItems){
      setData(cartItems);
      setItemsLen(cartItems.length);
    }
    else{
      setShowEmpty(true);
    }  
    if(newFinalRes.msg)
    {
      alert(newFinalRes.msg)
    }
  } catch (error) {
    alert(error);
  }
}
  function handleCheckOut(){
    const total = cartPrice-cartDisPrice;
    if(total!=0){
      setLoading(true);
      handlefinal();
    }
  }
  function handlefinal(){
      setLoading(false);
      dispatch(setCartPrice(0));
      dispatch(setDisCartPrice(0));
      dispatch(orderList(obj));
      dispatch(showPayment(true));
  }
  useEffect(()=>{
    setLoading(true);
    callData();
    setLoading(false);
    window.scrollTo({top:true})
  },[])
  useEffect(()=>{
    if(itemsLen>0)
    {
      setShowEmpty(false);
    }else{
      setShowEmpty(true);
    }
  },[itemsLen])
  return (
    <>
    <Navbar/>
    {showP == false?
    <div id='mainCart'>
      <div id='navCartPage'>
      <img src={cartImg} alt="error" style={{height:"40px",marginLeft:"10px"}} />
      <h4 style={{color:"white"}}>Updated Shopping Items</h4>
      </div>
      <div id='mainCartPage'>
        <div id='mainDivCartPage'>
          <h1 style={{margin:"10px 0px",fontFamily: `'Berkshire Swash', serif`}} id='firstHeadC' >Cart Items</h1>
          <div id='cartItemsCon'>
            {!showEmpty?<table id='tableCartPage' >
              <thead>
                <tr id='cartHeadings'>
                  <th>S.no.</th>
                  <th>Products</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody id='cartItemBody'>
              {data&& 
                data.map((elem,index)=>(
                  <CartItem key={index} 
                  img={elem.products.img[0]}
                  price={elem.products.price} 
                  sale={elem.sale} 
                  index={index} 
                  name={elem.products.name} 
                  category={elem.category} 
                  id={elem.products._id}
                  setObj={setObj}
                  itemsLen={itemsLen}
                  setItemsLen={setItemsLen}
                  cartCount={count}
                  dataItem = {elem}
                  />
                ))
              }
              </tbody>
            </table>:
            <div id='emptyDivC'>
              <img src={emptyCart} height="100%" alt='error'/>
            </div>
            }
          </div>
        </div>
        
        <div id='totalCartC'>
              <div style={{borderBottom:"2px dashed lightgrey"}}>
                <h1 style={{fontFamily: `'Berkshire Swash', serif`}}>Price details</h1>
              </div>
              <div id='totalCartPriceDiv'>
                  <div style={{display:"flex",justifyContent:"space-between"}}>
                      <p>Price ({data && data.length} items)</p>
                      <p>₹{cartPrice.toFixed(2)}</p>
                  </div>

                  <div style={{display:"flex",justifyContent:"space-between"}}>
                    <p>Discount</p>
                    {data && <p style={{color:"green",fontWeight:"bold"}}>-₹{cartDisPrice.toFixed(2)}</p>}
                  </div>

                  <div style={{display:"flex",justifyContent:"space-between"}}>
                    <p>Delivery Charges</p>
                    <p>free</p>
                  </div>
              </div>
              <div id="totalAmountDiv">
                <h2>Total Amount</h2>
                <p>₹{(cartPrice-cartDisPrice).toFixed(2)}</p>
              </div>
              <div id="youSaveDiv">
                <p>You will save <span style={{fontWeight:"bold"}}>₹{cartDisPrice.toFixed(2)}</span> on this order</p>
              </div>
              <div id='totalCartBtnDiv'>
                <button onClick={handleCheckOut}>PROCEED TO CHECKOUT</button>
              </div>
        </div>
      </div>
    </div>
      :null}

    {loading?<Loader/>:null}
    {showP?<Payment/>:null}
    <Footer/>
    <PhoneFooter/>
      </>
  )
}
