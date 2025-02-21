import React,{useEffect, useState} from 'react';
import "./topDeals.css";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { handleLikeList } from "../navbar/navbar";
import { incrementLike,decrementLike, CountingLike,remLikeList } from '../../../services/actions/actions.jsx';
import Loader from '../loader/loader';
import fullStarImg from "/images/fullStar.png";
import halfStarImg from "/images/halfStar.jpg";
import emptyStarImg from "/images/emptyStar.png";
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

const likeList=[];
const removeLikeList=[];

function Card({data,wishList,setLoading}){
  const [fav,setfav] = useState(false);
  const dispatch = useDispatch();

  function addToWishList(){
    setLoading(true);
    handleWishList();
    handleLikeList(likeList,removeLikeList);
    likeList.pop();
        setLoading(false);
  }
  const handleWishList = async() => {
    if(!fav){
      const obj = {
        id:data._id,
        category: data.category
      }
      likeList.push(obj);

      dispatch(incrementLike(likeList))
      const newRem = removeLikeList.filter((item)=>item.id !== data._id )
      removeLikeList.length=0;
      removeLikeList.push(...newRem);
    }else{
      const obj = {
        id:data._id,
        category:data.category
      }
      removeLikeList.push(obj);
      const updatedList = likeList.filter((item) => item.id !== data._id);
      likeList.length = 0; // Clear the original likeList
      likeList.push(...updatedList);//use to push elements of updatedList inside likeList array
      dispatch(decrementLike(likeList));
      dispatch(remLikeList(removeLikeList));
    }
    setfav(!fav);
  };
    function productName(str){
        const newStr = str.slice(0,20);
        return newStr;
    }

    function brandName(str){
        if(str!= undefined){
            if(str.length>9){
                return str.substr(0,10)+"...";
            }else{
                return str;
            }
        }
    }
    function checkAlready(){
        // if(wishList){
        //     wishList.map((elem)=>{
        //         if(elem.id == data._id && elem.category == data.category){
        //             setfav(!fav);
        //         }
        //     })
        // }
        if(wishList){
          let found = wishList.some(elem => elem.id == data._id && elem.category == data.category);
          if(found){
            setfav(true);
          }
        }
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
             <img src={emptyStarImg} alt="error" width={width} /><img src={emptyStarImg} alt="error" width={width} /><img src={emptyStarImg} alt="error" width={width} /><img src={emptyStarImg} alt="error" width={width} /><img src={emptyStarImg} alt="error" width={width} />
            </>
          )
        }
      }
    function Price({ price, sale }) {
        const discountPrice = parseFloat(( price - parseFloat((price * (sale / 100)).toFixed(2)) ).toFixed(2));
        const off = parseFloat((price * (sale / 100)).toFixed(2));
        return (
          <>
            <p style={{color:"green",fontWeight:"bold",fontSize:"15px",marginTop:"10px",fontFamily:`'Berkshire Swash', serif`}}>Extra {off} off</p>
            <h4 style={{fontFamily:`'Berkshire Swash', serif`}}>
              ₹{discountPrice} <del style={{color:"grey",fontFamily:`'Berkshire Swash', serif`}}>{parseFloat(price.toFixed(2))}</del>{" "}
              <span style={{color:"green",fontWeight:"bold",fontFamily:`'Berkshire Swash', serif`}}>{sale}% off</span>
            </h4>
          </>
        );
      }
      function navigateTo(category,sale,id){
        const encSale = "sale="+sale.toString();
        const encryS = CryptoJS.AES.encrypt(encSale,import.meta.env.VITE_REACT_EncryptKey);
        return `?category=${category}&&${encryS.toString()}&&id=${id}`;
      }
    useEffect(()=>{
        checkAlready();
    },[])
    return(
         <div id='cardTopDeals'>
         <Link to={{pathname:"/buyPage",search:navigateTo(data.category,data.sale,data._id)}} target='_blank'>
            <div id='cardImgTopDeals'>
                <img src={data.img[0]} alt="error" />
            </div>
         </Link>
            <div id='cardDetailsTopDeals'>
                <div id='companyNameTD'>
                    <div id='favImgDiv' onClick={addToWishList}>
                      <img src={fav?"images/favorite_full.png":"images/favorite.png"} alt="error"/>
                    </div>
                    <p id='cardBrandNameTopDeals'>{brandName(data.companyName)}</p>
                </div>
                <div style={{marginBottom:"0.2rem"}}>
                    <HandleRating reviews={data.reviews} width={"20px"}/>
                </div>
            <Link to={{pathname:"/buyPage",search:navigateTo(data.category,data.sale,data._id)}} target='_blank'>
                <h4 style={{fontFamily:`'Lora', serif`}}>{productName(data.name)}...</h4>
                <Price price={data.price} sale={data.sale}/>
            </Link>
            </div>
        </div>
        )
}
 function CreateSlider({data,index,categoryHead,wishList,setLoading}){
    let finalData=[];
    let curr=0,ctNext=8,ctPrev=0;

    function prev(){
        const topDealsCardItems = document.getElementById(`topDealsCardItems${index}`);
        if(topDealsCardItems && ctPrev!=0){
            if(ctPrev!=0){
                ctNext=ctNext+1
            }
            ctPrev--;
            curr-=30;
            topDealsCardItems.style.transform = `translateX(-${curr}%)` ;
        }
    }
    function next(){
        const topDealsCardItems = document.getElementById(`topDealsCardItems${index}`);
        if(topDealsCardItems && ctNext!=0){
            if(ctNext!=0){
                ctPrev=ctPrev+1;
            }
            ctNext--;
            curr+=30;
            topDealsCardItems.style.transform = `translateX(-${curr}%)` ;
        }
    }

    function getFinalData(){
        for(const {products,sale,category} of data){
            for(let elem of products){
                elem.sale = sale;
                elem.category = category;
                finalData.push(elem);
            }
        }
    }
    getFinalData();
    useEffect(()=>{
        function setStyle(){
            const topDealsCardItems = document.getElementById(`topDealsCardItems${index}`);
            topDealsCardItems.style.display="flex";
            topDealsCardItems.style.transition="1s ease-in-out";
        }
        setStyle();
    },[])
    function head(str){
      const newStr = str.split("top");
      return newStr;
    }
    return(  
    <>
      <h1 id="topDealHeading">Top Deals on {head(categoryHead)} collection</h1>
      <div id='mainTopDeals'>
        <div id='topDealsCardCon'>
          <div id={`topDealsCardItems${index}`} className='topDealsCardItems'>                
            {finalData.map((elem,idx)=>(
                <Card key={idx} data = {elem} wishList={wishList} setLoading={setLoading}/>
            ))}
          </div>
          <div id='btnConTopDeals'>
              <button onClick={prev} id='prevBtnTopDeals'>&lt;</button>
              <button onClick={next} id='nextBtnTopDeals'>&gt;</button>                
          </div>
        </div>
      </div>
    </>                    
    )
 }

function CreateEachDeals({data,wishList,setLoading}){
    const dataKeys = Object.keys(data);
    return(
        <>
            { dataKeys.map((elem,index)=>(
                <CreateSlider key={index} data={data[elem]} index={index} categoryHead={elem} wishList={wishList} setLoading={setLoading}/>
            ))
                }
        </>
    )
}
export default function TopDeals(){
    const [data,setData] = useState();
    const [wishList,setWishList] = useState();
    const [loading,setLoading] = useState(true);

    async function callData(){
        const user = localStorage.getItem("MDB_USER_EMAIL_ID");
        const token = Cookies.get("token");

        try {
            const res = await fetch(`${import.meta.env.VITE_REACT_API_URL}`);
            const finalRes = await res.json();

            const userRes = await fetch(`${import.meta.env.VITE_REACT_API_URL}/user?user=${user}`,{
              method:"GET",
              headers:{
                "authorization": `Bearer ${token}`
              }
            });
            const finalUserRes = await userRes.json();
            const {wishList} = finalUserRes;
            setWishList(wishList);
            setData(finalRes);
        } catch (error) {
            console.log(error);
            alert("failed to fetch");
        }
        setLoading(false);
    }
    
    useEffect(()=>{
      callData();
    },[])

    return(
    <>
     { data &&  <CreateEachDeals data={data} wishList={wishList} setLoading={setLoading}/>}
     {loading?<Loader/>:""}
    </>
    
    )
}
