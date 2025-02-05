import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import "./wishlist.css";
import { handleLikeList, handleList } from "../homepage/navbar/navbar";
import Loader from "../homepage/loader/loader";
import Navbar from "../homepage/navbar/navbar";
import remWishlistItem from "/images/wishlist/remWishlistItem.png";
import wishlistHeart from "/images/wishlist/wishlistHeart.png";
import yourAccount from "/images/wishlist/account.png";
import manageAddress from "/images/wishlist/address.png";
import yourCartlist from "/images/wishlist/cart.png";
import homepage from "/images/wishlist/homepage.png";
import yourOrder from "/images/wishlist/order.png";
import yourPassword from "/images/wishlist/password.png";
import profile from "/images/wishlist/profile.png";
import emptyWishlist from "/images/empty.jpg";
import Footer from "../homepage/footer/footer";
import { PhoneFooter } from "../homepage/homepage";
import CryptoJS from "crypto-js";

export default function Wishlist() {
  const [data, setData] = useState();
  const [cartL,setCartL] = useState();
  const [profilePic,setProfilePic] = useState();
  const [showEmpty,setShowEmpty] = useState();
  const user = localStorage.getItem("MDB_USER_NAME");
  const navigate = useNavigate();
  const [load,setLoad] = useState(false);

  function TableRows({ category, sale, products, index, cartList }) {
    const [loading, setLoading] = useState(false);
    const myRef = useRef();
    const [isCart, setIsCart] = useState(false);
    function prodName(name) {
      if (name.length > 40) {
        return name.slice(0, 40) + "...";
      } else {
        return name;
      }
    }
    function Price({ price, sale }) {
      const discountPrice = parseFloat((price - price * (sale / 100)).toFixed(2));
      const off = parseFloat((price * (sale / 100)).toFixed(2));

      return (
        <div id="pricewishlist">
          <p style={{ color: "green", fontWeight: "bold" }}>Extra {off} off</p>
          <h3>
            ₹{discountPrice}{" "}
            <del style={{ color: "grey" }}>{parseFloat(price.toFixed(2))}</del>{" "}
            <span style={{ color: "green", fontWeight: "bold" }}>
              {sale}% off
            </span>
          </h3>
        </div>
      );
    }
    function removeItem(id, category) {
      try {        
        const obj = {
          id: id,
          category: category,
        };
        setLoading(true);
        handleLikeList([], [obj]);
        setTimeout(()=>{
        const newArr = data.filter((elem)=>{
          return elem.id != id && elem.category != category;
        })
        setData(newArr);
          setLoading(false);
        },2000)
      } catch (error) {
        console.log(error)
      }
    }
    function handleCart() {
      const obj = {
        id: products._id,
        category: category,
      };
      if (isCart == false) {
        setIsCart(!isCart);
        setLoading(true);
        handleList([obj], []);
        setTimeout(()=>{
          setLoading(false);
        },2000)
        // const p = new Promise((resolve, reject) => {
        //   resolve();
        // });
        // p.then(() => {
        // });
      } else {
        setIsCart(!isCart);
        setLoading(true);
        handleList([], [obj]);
        setTimeout(()=>{
          setLoading(false);
        },2000)
        // const p = new Promise((resolve, reject) => {
        //   resolve();
        // });
        // p.then(() => {
        // });
    }
    }
    function navigateTo(){
      const encSale = "sale="+sale.toString();
      const encryS = CryptoJS.AES.encrypt(encSale,import.meta.env.VITE_REACT_EncryptKey);
      return `?category=${category}&&${encryS.toString()}&&id=${products._id}`;
    }
    useEffect(()=>{
        cartList.map((elem)=>{
            if(elem.id == products._id && elem.category == category){
                setIsCart(!isCart);
            }
        })
    },[])
    return (
      <>
        <tr ref={myRef} key={index} id="wishlistProdRow">
          <td style={{ textAlign: "start" }}>
            <img
              src={remWishlistItem}
              id="removeWishlistImg"
              onClick={() => removeItem(products._id, category)}
            />
          </td>
          <td id="productWishlist">
            <div>
              <img src={products.img[0]} alt="error" id="cartItemImg" />
            </div>
            <Link 
            style={{color:"black",textDecoration:"none"}}
            to={{pathname:"/buyPage",search:navigateTo()}}>
               <div id="prodNameW" >{prodName(products.name)}</div>
            </Link>
          </td>
          <td style={{ textAlign: "start" }}>
            {<Price price={products.price} sale={sale} />}
          </td>
          <td style={{textAlign:"center"}}>
            {isCart ? (
              <button id="aToCBtnWishlist" onClick={handleCart}>
                Remove From Cart
              </button>
            ) : (
              <button id="aToCBtnWishlist" onClick={handleCart}>
                Add To Cart
              </button>
            )}
          </td>
        </tr>
        {loading ? <Loader /> : ""}
      </>
    );
  }
  function UserName({name}){
    
    if(name){    
        let str = name.toLowerCase();

        if(str.includes("mr.") || str.includes("mrs.") || str.includes("mr") || str.includes("mrs")){
          str = name.split(" ");
          const re = str[0]+" "+str[1]; 
          return re;
        }else{
          return name.split(" ")[0];
        }
    }
  }
  async function callData() {
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

      if(finalRes.Unauthorized){
        navigate("/unauthorize");
      }

      const { wishList,cartList,profileImg } = finalRes;
      setCartL(cartList);
      setProfilePic(profileImg);
      const newRes = await fetch(`${import.meta.env.VITE_REACT_API_URL}/wishlist`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ ...wishList }),
      });
      const newfinalRes = await newRes.json();

      const { wishlistItems } = newfinalRes;

      if(wishlistItems){
        setData(wishlistItems);
      }else{
        setShowEmpty(true);
      }
      setLoad(false);
    } catch (error) {
      alert(error);
      setLoad(false);
    }
  }
  useEffect(() => {
    setLoad(true);
    callData();
  }, []);
  useEffect(()=>{
    if(data){
      if(data.length==0)
      {
        setShowEmpty(true);
      }else{
        setShowEmpty(false);
      }
    }
  },[data])
  return (
    <>
      <Navbar/>
      <div id="mainWishlist">
        <div id="userInfo">
          <div id="userProfileDivWishlist">
            <div id="userProfileWishlist">
              <img src={profilePic||profile} alt="error" />
            </div>
            <div style={{ display: "inline-block" }}>
              <h4>Hello, <UserName name={user}/></h4>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div id="userProfileOption">
              <img src={yourAccount} alt="error" id="accountWis" />
              <label htmlFor="accountWis">
                <Link to="/myAccount">Manage Account</Link>
              </label>
            </div>
            <div id="userProfileOption">
              <img src={manageAddress} alt="error" id="addressWis" />
              <label htmlFor="addressWis">
                <Link to="/addAddress">Manage Address</Link>
              </label>
            </div>
            <div id="userProfileOption">
              <img src={yourCartlist} alt="error" id="cartlistWis" />
              <label htmlFor="cartlistWis">
                <Link to="/cart">My CartList</Link>
              </label>
            </div>
            <div id="userProfileOption">
              <img src={yourOrder} alt="error" id="orderWis" />
              <label htmlFor="orderWis">
                <Link to="/myOrders">My Orders</Link>
              </label>
            </div>
            <div id="userProfileOption">
              <img src={homepage} alt="error" id="homeWish" />
              <label htmlFor="homeWish">
                <Link to="/">Homepage</Link>
              </label>
            </div>
          </div>
        </div>
        <div>
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <img src={wishlistHeart} alt="error" height="100px" />
            <h1 style={{fontFamily:`'Cinzel Decorative', serif`}}>MY WISHLIST</h1>
          </div>
          <div id="userWishlist">
            {!showEmpty?<table id="tableWishlist">
              <thead>
                <tr id="wishlistHeadings">
                  <th style={{ width: "0%" }}></th>
                  <th style={{ width: "50%" }}>Products</th>
                  <th>Price</th>
                  <th style={{textAlign:"center"}}>Action</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((elem, index) => (
                    <TableRows {...elem} index={index} key={index} cartList={cartL}/>
                  ))}
              </tbody>
            </table>:
            <div id="emptyWishDiv">
                <img src={emptyWishlist} height="100%" alt='error'/>
              </div>
            }
          </div>
        </div>
      </div>
      <Footer/>
      <PhoneFooter/>
      {load?<Loader/>:null}
    </>
  );
}
