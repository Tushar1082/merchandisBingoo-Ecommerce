import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { increment,decrement, Counting,removeList } from '../../../services/actions/actions.jsx';
import { incrementLike,decrementLike, CountingLike,remLikeList } from '../../../services/actions/actions.jsx';
import { handleList } from '../navbar/navbar.jsx';
import { handleLikeList } from '../navbar/navbar.jsx';
import './specialProduct.css';
import { Link } from 'react-router-dom';
import fullStarImg from "/images/fullStar.png";
import halfStarImg from "/images/halfStar.jpg";
import emptyStarImg from "/images/emptyStar.png";
import Loader from '../loader/loader.jsx';
import CryptoJS from 'crypto-js';
// Create a separate component for each special item
export const likeList=[];
export const removeLikeList=[];
export const cartList=[];
export const removeCartList=[];

function SpecialItem({ data,cart,index,like,category,sale,setLoading }) {
  const dispatch = useDispatch();
  const [favorite, setFavorite] = useState(false);
  const [currImg,setCurrImg] = useState(data.img[0]);
  const [visible,setVisible] = useState(true);

  const handleWishList = () => {
    setFavorite(!favorite);
    if(!favorite){
      const obj = {
        id:data._id,
        category:category
      }
      likeList.push(obj);
      dispatch(incrementLike(likeList))
      const newRem = removeLikeList.filter((item)=>item.id !== data._id )
      removeLikeList.length=0;
      removeLikeList.push(...newRem);
    }else{
      const obj = {
        id:data._id,
        category:category
      }
      removeLikeList.push(obj);
      const updatedList = likeList.filter((item) => item.id !== data._id);
      likeList.length = 0; // Clear the original likeList
      likeList.push(...updatedList);//use to push elements of updatedList inside likeList array
      dispatch(decrementLike(likeList));
      dispatch(remLikeList(removeLikeList));
    }
  };
  const handleCart=(val)=>{
    setVisible(!visible);
    if(val==true){
      const obj = {
        id:data._id,
        category:category
      }
      cartList.push(obj);
      dispatch(increment(cartList));
      const newRem = removeCartList.filter((item)=>item.id !== data._id )
      removeCartList.length=0;
      removeCartList.push(...newRem);
    }else{
      const obj = {
        id:data._id,
        category:category
      }
      removeCartList.push(obj);
      const updatedList = cartList.filter((item) => item.id !== data._id);
      cartList.length = 0; // Clear the original likeList
      cartList.push(...updatedList);//use to push elements of updatedList inside likeList array
      dispatch(decrement(cartList));
      dispatch(removeList(removeCartList));
    }
  }
  const handleImg=(obj)=>{
    setCurrImg(obj);
  }
  function productName(str){
    return str.slice(0,40);
 }
  function x(){
    if(cart){
      cart.map((elem)=>{
        if(elem.id == data._id && elem.category == category){
          setVisible(!visible);
        }
      })
    }
  }
  function y(){
    if(like){
      like.map((elem)=>{
        if(elem.id == data._id && elem.category == category){
          setFavorite(!favorite);
        }
      })
    }
  }
  async function addToCart(val){
    const isUserLog = localStorage.getItem("MDB_USER_NAME");
    if(isUserLog){
      if(val){
        handleCart(true);
      }else{
        handleCart(false);
      }
      try {        
        setLoading(true);
        handleList(cartList,removeCartList);
          setLoading(false);
        cartList.pop();
      } catch (error) {
        alert("failed to add item in Cart");
      }
      
    }else{
      alert("login first");
    }
  }
  async function addToWishList(){
    try {      
      handleWishList();
      setLoading(true)
      handleLikeList(likeList,removeLikeList);
        setLoading(false);
      likeList.pop();
    } catch (error) {
     alert("faild to add in wishlist"); 
    }
    
  }
  function Price({ price, sale }) {
    const discountPrice = parseFloat( (price - parseFloat( (price * (sale / 100)).toFixed(2) )).toFixed(2));
    const off = parseFloat((price * (sale / 100)).toFixed(2));
    return (
      <>
        <p style={{color:"green",fontFamily:`'Berkshire Swash', serif`}}>Extra {off} off</p>
        <h4 style={{fontFamily:`'Berkshire Swash', serif`}}>
          ₹{discountPrice} <del style={{color:"grey",fontFamily:`'Berkshire Swash', serif`}}>{parseFloat(price.toFixed(2))}</del>{" "}
          <span style={{color:"green",fontFamily:`'Berkshire Swash', serif`}}>{sale}% off</span>
        </h4>
      </>
    );
  }
  function HandleRating({ reviews, width }) {
    if(reviews){
      const reviewsArr = reviews;
      const countArr = [];
  
      for (let i = 0; i < 6; i++) {
        countArr[i] = 0;
      }
      reviewsArr.map((elem) => {
        countArr[elem.cusRating]++;
      });
      const x =
        5 * countArr[5] +
        4 * countArr[4] +
        3 * countArr[3] +
        2 * countArr[2] +
        1 * countArr[1];
      let y = 0;
      countArr.map((elem) => {
        y += elem;
      });
      const avgRating = x / y;
  
      const numToStr = avgRating + "";
      let rating = numToStr.split(".")[0];
      const dec = numToStr.split(".")[1];
  
      const arr = [];
      for (let i = 0; i < 5; i++) {
        if (rating > 0) {
          //this if statement push number of stars that is equal to integer part of rating. In other word, select fullstar
          arr.push(
            <img src={fullStarImg} alt="error" key={i} style={{ width: width }} />
          );
        } else if (rating == 0 && dec) {
          // this if statement push a half star if decimal value of number is exist and push when fullstar already pushed
          arr.push(
            <img src={halfStarImg} alt="error" key={i} style={{ width: width }} />
          );
        } else {
          // and finally push remaining empty star
          arr.push(
            <img
              src={emptyStarImg}
              alt="error"
              key={i}
              style={{ width: width }}
            />
          );
        }
        rating--;
      }
      return arr;
    }else{
      return(
        <>
         <img src={emptyStarImg} alt="error" width="25px" /><img src={emptyStarImg} alt="error" width="25px" /><img src={emptyStarImg} alt="error" width="25px" /><img src={emptyStarImg} alt="error" width="25px" /><img src={emptyStarImg} alt="error" width="25px" />
        </>
      )
    }
  }
  function navigateTo(category,sale,id){
    const encSale = "sale="+sale.toString();
    const encryS = CryptoJS.AES.encrypt(encSale,import.meta.env.VITE_REACT_EncryptKey);
    return `?category=${category}&&${encryS.toString()}&&id=${id}`;
  }
  useEffect(()=>{
   x();
   y();
  },[])
  return (
    <div id='specialConItem' key={index}>
      <div id='imagesConSpecial'>
        <div id='favSpecial'>
          <img src={favorite ? 'images/favorite_full.png' : 'images/favorite.png'} onClick={addToWishList} alt="error" />
        </div>
{/*           <Link to={{pathname:"/buyPage",search:navigateTo(category,sale,data._id)}} target="_blank"> */}
                      <Link to={{pathname:"/buyPage",search:navigateTo(category,sale,data._id)}}>
          <div id='con1Special'>
              <img src={currImg} alt="error" />
          </div>
          </Link>
        <div id='con2Special'>
          {data.img.map((obj, indx) => (
            <div key={indx}>
              <img src={obj} alt="error" onClick={()=>handleImg(obj)} />
            </div>
          ))}
        </div>
      </div>
      <div id='detailsConSpecial'>
        <div id='productNameSpecial'>
{/*         <Link to={{pathname:"/buyPage",search:navigateTo(category,sale,data._id)}} target="_blank" style={{textDecoration:'none', color:'black'}}> */}
                  <Link to={{pathname:"/buyPage",search:navigateTo(category,sale,data._id)}} style={{textDecoration:'none', color:'black'}}>
          <p id='brandNameConSpecial' >{data.companyName}</p>
          <div style={{display:"flex"}}>
            <HandleRating reviews={data.reviews} width={"25px"}/>
          </div>
          <p style={{fontWeight:"bold",fontFamily:`'Lora', serif`}}>{productName(data.name)}...</p>
          <Price price={data.price} sale={sale}/>
        </Link>
        </div>
        <div id='productBtnSpecial'>
{/*               <Link to={{pathname:"/buyPage",search:navigateTo(category,sale,data._id)}} target="_blank"> */}
                              <Link to={{pathname:"/buyPage",search:navigateTo(category,sale,data._id)}}>
                  <button id="productBtnBuySpecial">Buy</button>
              </Link>
          {visible?<button id='productBtnAddSpecial' onClick={()=>addToCart(true)}>Add to cart</button>:
          <button id='productBtnAddSpecial' onClick={()=>addToCart(false)}>remove from cart</button>}
        </div>
      </div>
    </div>
  );
}


export default function SpecialProduct() {
  const [state,setState] = useState();
  const [cartState,setCartState] = useState();
  const [likeState,setLikeState] = useState();
  const [loading,setLoading] = useState(false);

  const isUserLog = localStorage.getItem("MDB_USER_EMAIL_ID");

  async function callData(){
     const res = await fetch(`${import.meta.env.VITE_REACT_API_URL}?SpecialProduct=true&&user=${isUserLog}`);
     const data = await res.json();
     const {specialProduct,cartData,likeData} = data;

     const newRes = await fetch(`${import.meta.env.VITE_REACT_API_URL}/specialProducts`,{
        method:"POST",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify({...specialProduct})
     })
     
     const newFinalRes = await newRes.json();
     const {specialProdItems} = newFinalRes;

     setState(specialProdItems);
     if(cartData){
       setCartState(cartData);
     }
     if(likeData){
       setLikeState(likeData);
     }
  } 
  useEffect(()=>{
    callData();
  },[])

  return (
    <>
    <div id='mainSpecial'>
      {state != undefined ? state.length !=0  && <h1>Special Products</h1>:null}
      <div id='specialCon'>
        {state&&state.map((elem, index) => (
            <SpecialItem key={index} data={elem.products} category={elem.category} sale={elem.sale} index={index} cart={cartState} like={likeState} setLoading={setLoading}/>
        ))}
      </div>
    </div> 
      {loading?<Loader/>:null}
    </>
  );
}
