import React,{useEffect,useRef,useState} from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../navbar/navbar';
import fullStarImg from "/images/fullStar.png";
import halfStarImg from "/images/halfStar.jpg";
import emptyStarImg from "/images/emptyStar.png";
import favImg from "/images/favorite.png";
import favFullImg from "/images/favorite_full.png";
import Footer from '../footer/footer';
import { PhoneFooter } from '../homepage';
import { useDispatch } from 'react-redux';
import { incrementLike,decrementLike, CountingLike,remLikeList } from '../../../services/actions/actions.jsx';
import {handleLikeList} from "../navbar/navbar";
import Loader from '../loader/loader';
import CryptoJS from 'crypto-js';

export default function CategoryPage({data,SlidesData,callData,imgFileName}){
  const slides = document.getElementsByClassName("slides");
  const [loading,setLoading] = useState(false);
  const [likeBtn,setLikeBtn] = useState();

  let count=0;
  const clearIntRef = useRef(); 
  let clearTimeRef = useRef();
  const likeList=[];
  const removeLikeList=[];
  const dispatch = useDispatch();
  
  function slideImg(){
    for(let i=0;i<slides.length;i++){
      slides[i].style.transform = `translateX(-${count*100}%)`;
    }
  }

  function next(){
    if(count<slides.length-1){
      count++;
      slideImg();
    }else if(count===slides.length-1){
      while(count>=0){
        count--;
        slideImg();
      }
    }
  }
  function prev(){
    if(count>0){
      count--;
      slideImg();
    }
  }
  function autoSlide(){
    clearIntRef.current = setInterval(()=>{
      if(count<slides.length-1){
        count++;
        slideImg();
      }
      else if(count===slides.length-1){
        while(count>=0){
          count--;
          slideImg();
        }
      }
      },3000)
  }
  function addSlider(){
    clearTimeRef.current = setTimeout(()=>{
      console.log("autoslide add from btn");
      autoSlide();
    },1000)
  }
  function removeSlider(){
    console.log("autoslide remove from btn");
    clearInterval(clearIntRef.current);
    clearTimeout(clearTimeRef.current);
  }

  useEffect(()=>{
    for(let i=0;i<slides.length;i++){
      slides[i].style.left= `${i*100}%`;
    }
    autoSlide();
    return () => {
      // Cleanup function: clearInterval when the component unmounts
      clearInterval(clearIntRef.current);
    };
  },[])
  async function call(){
    // const isUserLog = localStorage.getItem("loginedUser");
    const isUserLog = localStorage.getItem("MDB_USER_EMAIL_ID");
    const res = await fetch(`${import.meta.env.VITE_REACT_API_URL}?SpecialProduct=true&&user=${isUserLog}`);
    const finalRes = await res.json();
    const {likeData} = finalRes;
    setLikeBtn(likeData);
  }
  useEffect(()=>{
    callData();  
    call();
  },[])

  function productName(str){
    return str.slice(0,40);
  }
  function catePriceWithOff(sale,price){
    return parseFloat((price-(price*(sale/100))).toFixed(2));
  }


  function saleBanner(imgFileName){
    switch(imgFileName){
      case "bag":
        return "../images/categories/category/bag/SaleBanner.png";
      case "mobile":
        return "../images/categories/category/mobile/SaleBanner.jpg";
      default:
        return "../images/categories/category/women/SaleBanner.png";  
    }
  }
  function cropString(str){

    if(str.includes("Men")){
      const newStr = str.search("Men");
      return str.substr(0,newStr);
    }else if(str.includes("Women")){
      const newStr = str.search("Women");
      return str.substr(0,newStr);
    }else{
      return str;
    }
  }
  function HandleRating({ reviews, width }) {
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
  }

function Product({obj,elem,index}){
  const [fav,setFav] = useState(false);
  const [load,setLoad] = useState(false);

  async function addToWishList(){
    try {  
      setLoad(true);
      handleWishList();
      handleLikeList(likeList,removeLikeList);      
      likeList.pop();
      setTimeout(()=>{
        setLoad(false);
      },2000)
    } catch (error) {
      console.log(error);
     alert("faild to add in wishlist"); 
    }
    
  }

  const handleWishList = () => {

    if(!fav){
      const likeObj = {
        id:obj._id,
        category:elem.category
      }
      likeList.push(likeObj);
      dispatch(incrementLike(likeList))
      const newRem = removeLikeList.filter((item)=>item.id !== data._id )
      removeLikeList.length=0;
      removeLikeList.push(...newRem);
    }else{
      const likeObj = {
        id:obj._id,
        category:elem.category
      }
      removeLikeList.push(likeObj);
      const updatedList = likeList.filter((item) => item.id !== data._id);
      likeList.length = 0; // Clear the original likeList
      likeList.push(...updatedList);//use to push elements of updatedList inside likeList array
      dispatch(decrementLike(likeList));
      dispatch(remLikeList(removeLikeList));
    }
    setFav(!fav);
  };
  
  function checkLike(){
    if(likeBtn){
      let found = likeBtn.some(item => item.id === obj._id && item.category == elem.category);
      if(found){
        setFav(true);
      }
    }
  }
  function navigateTo(category,sale,id){
    const encSale = "sale="+sale.toString();
    const encryS = CryptoJS.AES.encrypt(encSale,import.meta.env.VITE_REACT_EncryptKey);
    return `?category=${category}&&${encryS.toString()}&&id=${id}`;
  }
  useEffect(()=>{
    checkLike();
  },[])
    return(
      <>
      {load?<Loader/>:null}
     {obj && <div id="productItemCP" key={index} style={{width:"300px"}}>
          <Link style={{color:"black",textDecoration:"none"}} to={{pathname:"/buyPage",search:navigateTo(elem.category,elem.sale,obj._id)}} >

          <div id='pIWImgDiv'>
            <img src={obj.img[0]} alt="error" />
          </div>
          </Link>
          <div onClick={addToWishList} id='addTofavCP'>
            <img src={fav?favFullImg:favImg} alt="error" />
          </div>
          <Link style={{color:"black",textDecoration:"none"}} to={{pathname:"/buyPage",search:navigateTo(elem.category,elem.sale,obj._id)}}>

          <div id='pIWDetailDiv'>
            <p style={{marginTop:"10px",color:"red",fontFamily:`'Cinzel Decorative', serif`,fontWeight:"bold"}}>{obj.companyName}</p>
            <h3 style={{marginTop:"10px",fontFamily: `'Lora', serif`,fontWeight:'bold'}}>{productName(obj.name)}...</h3>
            <div>
                <HandleRating reviews={obj.reviews?obj.reviews:[]} width={"20px"}/>
            </div>
            <p style={{fontFamily:`'Roboto Slab', serif`}}>reviews({obj.reviews?obj.reviews.length:0})</p>
            <p style={{margin:"10px 0px", fontWeight:'bold'}}>₹{catePriceWithOff(elem.sale,obj.price)} <del style={{color:'grey'}}>{parseFloat((obj.price).toFixed(2))}</del> <span style={{color:'green',fontWeight:'bold'}}>{elem.sale}% off</span></p>
          </div>

          </Link>
      </div>}
      </>
     )
  }
  return (
    <>
    <Navbar/>
    <div id='mainCP'>
      {/* slider */}
      <div id='sliderCP'>
        {SlidesData.map((elem,index)=>(
          <>
            <img src={`../images/categories/category/${imgFileName}/${elem.img}`}
             alt="error" 
             key={index} 
             className='slides'
              onClick={()=>window.location.href=elem.link}
              style={{cursor:"pointer"}}
             />
          </>
        ))
        }
        <div id='sliderBtnCP'>
          <button onClick={prev} className='btn1S' id='btnRef' onMouseOver={removeSlider} onMouseLeave={addSlider}>&lt;</button>
          <button onClick={next} className='btn2S' id='btnRef' onMouseOver={removeSlider} onMouseLeave={addSlider}>&gt;</button>
        </div>
      </div>
      {/* categories */}
      <div id='categoriesMainCP'>
        <div id='categoriesCP'>
        {data&&data.map((elem,index)=>(
          <div key={index} id='categoryDivCP'>
           <Link to={cropString(elem.category)} target='_blank'>
              <div  id='imgDivCP'>
                <img src={elem.img} alt="error" />
              </div>
              <h1 style={{fontFamily: `'Lora', serif`}}>{cropString(elem.category)}</h1>
            </Link>
          </div>
        ))
        }
        </div>
      </div>
      {/*Products*/}
      {/*Sale banner*/}
      <div id='saleBannerCP'>
          <img src={saleBanner(imgFileName)} alt="error"/>
        </div>
      <div id="productsHead">
        <h1 style={{fontFamily: `'Cinzel Decorative', serif`}}>Our products</h1>
        <span><i>from best seller's</i></span>
      </div>
        {
          data&& data.map((elem,idx)=>(
            <div id='categoryConCP' key={idx}>
                <h1 id="categoryHeadingCP">Top {elem.category} with {elem.sale}% off</h1>
                <div id='productsConCP' >
                  {elem.products.map((obj,index)=>(
                      <Product obj={obj} index={index} key={index} elem={elem}/>
                  ))

                  }
                </div>
                <div id='CategoryBtnDivCP'>
                <Link to={cropString(elem.category)} target='_blank'>
                  <button>show more</button>
                </Link>
                </div>
            </div>
          ))
        }
    </div>
    {loading?<Loader/>:null}
    <Footer/>
    <PhoneFooter/>
    </>
  )
}