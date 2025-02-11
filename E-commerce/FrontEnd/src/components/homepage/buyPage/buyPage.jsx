import React, { useEffect, useState, useRef } from "react";
import "./buyPage.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from "../navbar/navbar";
import { handleLikeList } from "../navbar/navbar";
import { handleList } from "../navbar/navbar";
import { increment,decrement, Counting,removeList } from '../../../services/actions/actions.jsx';
import { incrementLike,decrementLike, CountingLike,remLikeList } from '../../../services/actions/actions.jsx';
import {orderList,showPayment,prodRating,userEmailId} from "../../../services/actions/actions";
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import Loader from "../loader/loader";
import Footer from "../footer/footer";
import {PhoneFooter} from "../homepage";
import Payment from "../../payment/payment";
import { fireDB } from "../../../../firebaseConfig";
import { getDownloadURL,ref,uploadBytes, deleteObject } from "firebase/storage";
import { v4 } from 'uuid';
import fullStarImg from "/images/fullStar.png";
import halfStarImg from "/images/halfStar.jpg";
import emptyStarImg from "/images/emptyStar.png";
import emptyReviews from "/images/emptyReviews.jpg";
import CryptoJS from 'crypto-js';

export default function BuyPage() {
  const [imgIdx, setImgIdx] = useState(0);
  const [fav, setFav] = useState(false);
  const [cart,setCart] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [perStar, setPerStar] = useState({});
  const [ratingMood, setRatingMood] = useState("");
  const [uploadImg, setUploadImg] = useState([]);
  const [imgData,setImgData] = useState();
  const [userEmail,setUserEmail] = useState();
  const [data, setData] = useState();
  const [selectStar, setSelectStar] = useState();
  const [rating, setRating] = useState();
  const [loading,setLoading] = useState(false);
  const [sim,setSim] = useState();
  const [likeBtn,setLikeBtn] = useState();
  const [reload, setReload] = useState(true);
  
  const location = useLocation();
  const navigate = useNavigate();
  const {showP} = useSelector((state)=>state.payment);

  const targetRef = useRef();
  const descRef = useRef();
  const titleRef = useRef();
  const cusNameRef = useRef();

  const details = decodeURIComponent(location.search).split("?")[1];
  const category = details.split("&&")[0].split("=")[1];
  const id = details.split("&&")[2].split("=")[1];
  const encryptSale = details.split("&&")[1];
  const decryptedSale = CryptoJS.AES.decrypt(encryptSale,import.meta.env.VITE_REACT_EncryptKey).toString(CryptoJS.enc.Utf8);
  const sale = decryptedSale.split("=")[1];
  const likeList=[];
  const removeLikeList=[];
  const cartList=[];
  const removeCartList=[];

  const dispatch = useDispatch();
  
  const handleWishList = async() => {
    setLoading(true);
    setFav(!fav);
    if(!fav){
      const obj = {
        id:+id,
        category:category
      }
      likeList.push(obj);

      dispatch(incrementLike(likeList))
      const newRem = removeLikeList.filter((item)=>item.id !== _id )
      removeLikeList.length=0;
      removeLikeList.push(...newRem);
    }else{
      const obj = {
        id:+id,
        category:category
      }
      removeLikeList.push(obj);
      const updatedList = likeList.filter((item) => item.id !== _id);
      likeList.length = 0; // Clear the original likeList
      likeList.push(...updatedList);//use to push elements of updatedList inside likeList array
      dispatch(decrementLike(likeList));
      dispatch(remLikeList(removeLikeList));
    }
    const p = new Promise((resolve,reject)=>{
      try {
        handleLikeList(likeList,removeLikeList);
        resolve();
      } catch (error) {
        reject();
      }
    })
    
    p.then(()=>{
      setTimeout(()=>{
        setLoading(false);
      },1000);
    }).catch((error)=>{
      console.log(error);
      alert("failed to add item in Cart");
      setTimeout(()=>{
        setLoading(false);
      },1000);
    })
  };
  const handleCart=async(val)=>{
    // setLoading(true);
    if(val==true){
      const obj = {
        id:+id,
        category:category
      }
      cartList.push(obj);

      dispatch(increment(cartList));
      const newRem = removeCartList.filter((item)=>item.id !== _id )
      removeCartList.length=0;
      removeCartList.push(...newRem)
    }else{
      const obj = {
        id:+id,
        category:category
      }
      removeCartList.push(obj);
      const updatedList = cartList.filter((item) => item.id !== _id);
      cartList.length = 0; // Clear the original likeList
      cartList.push(...updatedList);//use to push elements of updatedList inside likeList array
      dispatch(decrement(cartList));
      dispatch(removeList(removeCartList));
    }
    setCart(!cart);
    const p = new Promise((resolve,reject)=>{
      try {
        // setLoading(true);
        handleList(cartList,removeCartList)
        resolve();
      } catch (error) {
        reject();
      }
    })
    
    p.then(()=>{
      setLoading(false);
    }).catch((error)=>{
      console.log(error);
      alert("failed to add item in Cart")
      setLoading(false);
    })
    setLoading(false);
  }
  async function alreadyWishCart(){
    // const isUserLog = localStorage.getItem("loginedUser");
    const isUserLog = localStorage.getItem("MDB_USER_EMAIL_ID");
    console.log(isUserLog);
    const res = await fetch(`${import.meta.env.VITE_REACT_API_URL}?SpecialProduct=true&&user=${isUserLog}`);
    const finalRes = await res.json();
    console.log(finalRes);
    const {cartData,likeData,email} = finalRes;
    setUserEmail(email);
    setLikeBtn(likeData);
    if(cartData){
      cartData.map((elem)=>{
        if(elem.id == id && elem.category == category){
          setCart(!cart);
        }
      })
    }
    if(likeData){
      likeData.map((elem)=>{
        if(elem.id == id && elem.category == category){
          setFav(!fav);
        }
      })
    }
  }

  async function callData() {
    try {
      const token = Cookies.get("token");
      // const user = localStorage.getItem("loginedUser");
      // const userEmail = localStorage.getItem("MDB_USER_EMAIL_ID");
      console.log(token);
      const res = await fetch(`${import.meta.env.VITE_REACT_API_URL}/buyPage?category=${category}&&id=${id}`,{
        method:'GET',
        headers:{
          'authorization': `Bearer ${token}`,
        }
      });
      const finalRes = await res.json();
      console.log(finalRes);
      if(finalRes.notSignUp){
        navigate("/login");
      }
      if(finalRes.Unauthorized){
        navigate("/unauthorize");
      }
      const { product,similar } = finalRes;

      if (product && similar) {
        const reviewsArr = product.reviews;
        if(reviewsArr){
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
          dispatch(prodRating(avgRating));
          setRating(avgRating);
          percentOfStar(product.reviews);
        }

        setData(product);
        setSim(similar);
      } 
      setLoading(false);
    } catch (error) {
      console.log("error is ",error)
      setLoading(false);
      alert("fetching Error");
    }
  }

  function Keyfeatures({obj}){
    let key = [];

    for(let i in obj){
      key.push(i);
    }

    return(
      <div style={{padding:"10px",paddingTop:"0px"}}>{
      key.map((elem,index)=>(
        <p key={index}>
        {`${elem} : ${obj[elem]}`}
      </p>
      ))}
      </div>
    )
  }
  function HandleRating({ rate, width }) {
    const numToStr = rate + "";
    let rating = numToStr.split(".")[0];
    const dec = numToStr.split(".")[1];

    const arr = [];
    for (let i = 0; i < 5; i++) {
      if (rating > 0)
        //this if statement push number of stars that is equal to integer part of rating. In other word, select fullstar
        arr.push(
          <img
            src={fullStarImg}
            alt="error"
            key={i}
            style={{ width: width }}
          />
        );
      else if (rating == 0 && dec) {
        // this if statement push a half star if decimal value of number is exist and push when fullstar already pushed
        arr.push(
          <img
            src={halfStarImg}
            alt="error"
            key={i}
            style={{ width: width }}
          />
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
  function percentOfStar(reviews) {
    const reviewsArr = reviews;
    const countArr = [];

    for (let i = 0; i < 6; i++) {
      countArr[i] = 0;
    }
    reviewsArr.map((elem) => {
      countArr[elem.cusRating]++;
    });

    const starCount = {
      five: countArr[5],
      four: countArr[4],
      three: countArr[3],
      two: countArr[2],
      one: countArr[1],
    };
    let total = 0;
    countArr.map((elem) => {
      total += elem;
    });

    const perStar = {};

    for (let key in starCount) {
      const res = ((starCount[key] / total) * 100).toFixed(2);
      perStar[key] = res;
    }
    setPerStar(perStar);
  }

  function ratingLoader() {
    window.addEventListener("scroll", () => {
      const element2 = document.getElementById("mainRatingBuyPage");
      
      if(element2){

      function isElementOnScreen(element) {
        var rect = element.getBoundingClientRect();
        var windowHeight =
          window.innerHeight || document.documentElement.clientHeight;
        var windowWidth =
          window.innerWidth || document.documentElement.clientWidth;

        // Check if the element is within the viewport
        return (
          rect.top <= windowHeight &&
          rect.top + rect.height >= 0 &&
          rect.left <= windowWidth &&
          rect.left + rect.width >= 0
        );
      }
      const isPerStar = Object.keys(perStar).length;

      if (isElementOnScreen(element2)) {
        for (let key in perStar) {
          document
            .getElementById(`${key}StarBuyPage`)
            .querySelector("div").style = `
              background: #fdd341;
              border-radius: unset;
              width:${perStar[key]}%
              `;
        }   
      } else {
        for (let key in perStar) {
          document
            .getElementById(`${key}StarBuyPage`)
            .querySelector("div").style = `
              background: #fdd341;
              border-radius: unset;
              width:0
              `;
        }
      }
      }
    });
  }

  

  function handleRate() {
    const target = targetRef.current;
    target.scrollIntoView({ behavior: "smooth" });
  }
  function selectingStar(star) {
    const arr = ["one", "two", "three", "four", "five"];
    const starMsg = ["VeryBad", "Bad", "Good", "VeryGood", "Excellent"];

    for (let i = 0; i < star; i++) {
      const elem = document.getElementById(`${arr[i]}Star`);
      elem.style.backgroundColor = "#fdd341";
    }
    for (let i = star; i < 5; i++) {
      const elem = document.getElementById(`${arr[i]}Star`);
      elem.style.backgroundColor = "lightgrey";
    }
    setRatingMood(starMsg[star - 1]);
    setSelectStar(star);
  }
  async function handleImg(e) {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const filterFiles = files.splice(0, 5);
      let arr=[];
      setUploadImg([]);

      Promise.all(
        filterFiles.map((elem) => {
          return new Promise((resolve) => {
            const reader = new FileReader();

            reader.onload = (e) => {
              setUploadImg((prev)=>[...prev,e.target.result])
              resolve();
            };
            reader.readAsDataURL(elem);
          });
        })
      )
      filterFiles.forEach((elem)=>{
        arr.push(elem);
      })
      setImgData(arr);
    }
  }

  async function generateImgUrl() {
    async function uploadImage(image) {
      try {
        const userName = localStorage.getItem("MDB_USER_NAME");
        const uploading = ref(fireDB, `/MerchandiseBingoo/reviews/${category}/${data.name}/review from ${userName}_${userEmail}/${v4()}`);
        const response = await uploadBytes(uploading, image);
        const imgUrl = await getDownloadURL(response.ref);
        return { imgUrl, ref: response.ref }; // Return both URL and reference
      } catch (error) {
        console.error("Image upload failed:", error);
        return null; // Indicate failure
      }
    }
  
    const promises = imgData.map(uploadImage);
    const results = await Promise.all(promises);
  
    const failedUploads = results.filter(res => res === null);
    const successfulUploads = results.filter(res => res !== null);
  
    if (failedUploads.length > 0) {
      // Delete successfully uploaded images to prevent redundancy
      await Promise.all(successfulUploads.map(res => deleteObject(res.ref)));
      console.error("Some images failed to upload. Rolling back successful uploads.");
      return null; // Indicate overall failure
    }
  
    return successfulUploads.map(res => res.imgUrl);
  }
  
  function Price({ price, sale }) {
    const discountPrice = parseFloat( (price - (price * (sale / 100))).toFixed(2) );
    const off = parseFloat((price * (sale / 100)).toFixed(2));
    return (
      <>
        <p style={{fontWeight:'bold'}}>Extra {off} off</p>
        <h3>
          ₹{discountPrice} <del>{parseFloat(price.toFixed(2))}</del>{" "}
          <span>{sale}% off</span>
        </h3>
      </>
    );
  }
  async function submitRating() {
    setLoading(true);
    const desc = descRef.current.value;
    const title = titleRef.current.value;
    const cusName = cusNameRef.current.value;
    const userEmail = localStorage.getItem("MDB_USER_EMAIL_ID");
    const token = Cookies.get("token");
    let user;
    
    if(!cusName || !title || !desc || !selectStar || !ratingMood){
      setLoading(false);
      alert('fill all details for sumbit rating...');
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_REACT_API_URL}/user?user=${userEmail}`,{
        method:"GET",
        headers:{
          "authorization":`Bearer ${token}`
        }
      });
      user = await res.json();
      if(user.Unauthorized){
        navigate("/unthorize");
        return;
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      return;
    }
    let imgUrl;
    if(imgData){
      imgUrl = await generateImgUrl();
      if(imgUrl == null){
        setLoading(false);
        alert("Failed to upload images for review. Try after sometime");
        return;
      }
    }else{
      imgUrl = []; //It indicate person does not want to upload images for review
    }

    const sendRating = {
      cusProfileImg: user.profileImg,
      cusName: cusName,
      title: title,
      description: desc,
      cusRating: selectStar,
      ratingMood: ratingMood,
      imgInFeedback: imgUrl,
      uploadTime: new Date().toLocaleString(),
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_REACT_API_URL}/buyPage`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ sendRating, id, category }),
      });
      const finalRes = await res.json();

      if (finalRes.success) {
        alert(finalRes.success);
        window.location.reload();
      } else if (finalRes.fail) {
        alert(finalRes.fail);
      } 
      else {
        alert("failed to import review in database");
      }
    } catch (error) {
      console.log(error);
      alert('falied to submit review and error from here');

      await Promise.all(imgUrl.map((img)=> deleteObject(img.ref)));
    }
    setLoading(false);
  }
  
  function UserReviews({elem,index}) {
    const [showMore, setShowMore] = useState(600);    
    const [desc,setDesc] = useState("");
    const str = elem.description;

    function handleDesc(){
      if(desc.length<showMore){
        const newStr = str.slice(0,showMore);
        setDesc(newStr);
        setShowMore(showMore+600);
      }else{
        setDesc(str)
      }
    }

    useEffect(()=>{
      handleDesc();
    },[])
    return (
      <div id="ratingsBuyPage" key={index}>
        <div id="userDivBuyPage">
          <div id="profileImgRating">
            <img
              src={elem.cusProfileImg}
              alt="error"
              style={{ width: "100%" }}
            />
          </div>
          <p>{elem.cusName}</p>
        </div>

        <div
          style={{ display: "flex", alignItems: "center", fontWeight: "bold" }}
        >
          <HandleRating width={"25px"} rate={elem.cusRating} />
          <div>
            <span style={{ marginLeft: "10px" }}>{elem.title}</span>
          </div>
        </div>
        <span style={{ fontWeight: "bold" }}>{elem.ratingMood}</span>
        <span style={{ color: "grey", fontWeight: "bold" }}>
          Reviewed on {elem.uploadTime}
        </span>

        {elem.imgInFeedback.length != 0 ? (
          <div id="reviewImgCon">
            {elem.imgInFeedback.map((elem, index) => (
              <div style={{ width: "200px" }} key={index}>
                <img src={elem} alt="error" style={{ width: "100%" }} />
              </div>
            ))}
          </div>
        ) : (
          ""
        )}

        <div style={{ marginTop: "10px" }}>
          <p>{desc}</p>
          {str.length>desc.length && <button style={{marginBottom:"5px",marginLeft:"5px"}} onClick={()=>handleDesc()}>show more</button>}
        </div>
      </div>
    );
  }

  //Similar products
  function Card({data}){
    const [fav,setfav] = useState(false);
    const {list,remCartList} = useSelector((state=>state.cart));
    const [load,setLoad] = useState(false);

    function brandName(str){
        const newStr = str.slice(0,23);
        return newStr;
    }
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
          id:data._id,
          category:category
        }
        likeList.push(likeObj);
        dispatch(incrementLike(likeList))
        const newRem = removeLikeList.filter((item)=>item.id !== data._id )
        removeLikeList.length=0;
        removeLikeList.push(...newRem);
      }else{
        const likeObj = {
          id:data._id,
          category:category
        }
        removeLikeList.push(likeObj);
        const updatedList = likeList.filter((item) => item.id !== data._id);
        likeList.length = 0; // Clear the original likeList
        likeList.push(...updatedList);//use to push elements of updatedList inside likeList array
        dispatch(decrementLike(likeList));
        dispatch(remLikeList(removeLikeList));
      }
      setfav(!fav);
    };

    function catePriceWithOff(sale,price){
        return parseFloat((price-(price*(sale/100))).toFixed(2));
      }
      function navigateTo(category,sale,id){
        const encSale = "sale="+sale.toString();
        const encryS = CryptoJS.AES.encrypt(encSale,import.meta.env.VITE_REACT_EncryptKey);
        return `?category=${category}&&${encryS.toString()}&&id=${id}`;
      }
      function isAlreadyLiked(){
        if(likeBtn){
            let found = likeBtn.some(item => item.id === data._id && item.category == category);
            if(found){
              setfav(!fav);
            }
        }
      }
      useEffect(()=>{
        isAlreadyLiked();
      },[])
    return(
      <>
      {load?<Loader/>:null}
         <div id='cardTopDeals' onClick={()=>handleList(list,remCartList)}>
         <Link to={{pathname:"/buyPage",search:navigateTo(category,data.sale,data._id)}} target='_blank'>
            <div id='cardImgTopDeals'>
                <img src={data.img[0]} alt="error" />
            </div>
         </Link>
            <div id='cardDetailsTopDeals'>
                <div onClick={addToWishList}>
                    <img src={fav?"images/favorite_full.png":"images/favorite.png"} alt="error" id='likeBtnBuyPage'/>
                    <p id='cardBrandNameTopDeals'>{data.companyName}</p>
                </div>
            <Link to={{pathname:"/buyPage",search:navigateTo(category,data.sale,data._id)}} target='_blank'>
                <h4>{brandName(data.name)}...</h4>
                <p id='cardPriceTopDeals' style={{fontWeight:'bold'}}>₹{catePriceWithOff(data.sale,data.price)} <del style={{color:'grey'}}>{data.price.toFixed(2)}</del> <span style={{color:'green',fontWeight:'bold'}}>{data.sale}% off</span></p>
            </Link>
            </div>
        </div>
      </>
        )
}
 function CreateSlider({data}){
    let finalData=[];
    let curr=0,ctNext=5,ctPrev=0;

    function prev(){
        const topDealsCardItems = document.getElementById("topDealsCardItems");
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
        const topDealsCardItems = document.getElementById("topDealsCardItems");
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
        for(const {products,sale} of data){
            for(let elem of products){
                elem.sale = sale
                finalData.push(elem);
            }
        }
    }
    getFinalData();
    useEffect(()=>{
        function setStyle(){
            const topDealsCardItems = document.getElementById("topDealsCardItems");
            topDealsCardItems.style.display="flex";
            topDealsCardItems.style.transition="1s ease-in-out";
        }
        setStyle();
    },[])

    return(  
    <>
            <div id='mainTopDeals'>
                <div id='topDealsCardCon'>
                    <div id={"topDealsCardItems"}>                
                        {finalData.map((elem,index)=>(
                                <Card key={index} data = {elem}/>
                        )) 
                        }
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
 function handleBuy(){
  // const arr=[{id:id,category:category,count:quantity}];
  const order = [{...data,category:category,quantity:quantity,sale:sale}];
  dispatch(orderList(order));
  dispatch(userEmailId(userEmail));
  dispatch(showPayment(true));
 }
 function EmptyReviews(){
    if(data){
      if(data.reviews == undefined || data.reviews.length == 0){
        return(
          <div id="emptyReviewDiv">
            <img src={emptyReviews} alt="error" />
          </div> 
        )
      }
    }
 }
  useEffect(() => {
    setLoading(true);
    ratingLoader();
    callData();
    alreadyWishCart();
    window.scrollTo({
      top:0
    })
    
  }, []);
  
  useEffect(()=>{
    if(reload){
      location.reload();
    }
    setReload(false);
  },[reload]);
  
  useEffect(()=>{
    ratingLoader();
  },[perStar]);    

  return (
    <>
    <Navbar/>
    {showP == false?
    <div id="mainBuyPage">
      <div id="productDivBuyPage">
        <div id="imagesDivBuyPage">
          <div id="allImgBuyPage">
            {data &&
              data.img.map((elem, index) => (
                <div
                  key={index}
                  style={imgIdx == index ? { border: "2px solid blue" } : {}}
                >
                  <img
                    src={elem}
                    onClick={() => setImgIdx(index)}
                    alt="error"
                  />
                </div>
              ))}
          </div>
          <div id="selectedImgDivBuyPage">
            {data && (
              <img src={data.img[imgIdx]} alt="error" id="selectedImg" />
            )}
            <div id="likeBtnDivBuyPage">
              <img
                src={fav ? "images/favorite_full.png" : "images/favorite.png"}
                onClick={handleWishList}
                alt="error"
              />
            </div>
          </div>
        </div>
        <div id="mainDetailBuyPage">
          <div id="detialBuyPage">
            <div id="comNameBuyPage">
              {data && (
                <>
                  <p>{data.companyName}</p>
                  <h2>{data.name}</h2>
                </>
              )}
              <div id="ratingDiv">
                {
                  <div style={{ display: "flex",alignItems:"center" }}>
                    {
                      <HandleRating
                        width={"30px"}
                        rate={rating != undefined ? rating : 0}
                      />
                    }
                  </div>
                }
              </div>
            </div>
            <div id="priceDivBuyPage">
              {data && <Price price={data.price} sale={sale} />}
            </div>
            <div id="categoryNameDiv">
              <p>Categories: <span style={{color:'red', fontWeight:'bold'}}>{category.toUpperCase()}</span></p>
            </div>
          </div>

          <div id="mainBtnBuyPage">
            <div id="countBtnBuyPage">
              <button
                id="firstBtnCount"
                onClick={() => (quantity > 1 ? setQuantity(quantity - 1) : "")}
              >
                -
              </button>
              <div>{quantity}</div>
              <button
                id="secondBtnCount"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <div id="btnBuyPage">
              <button onClick={handleBuy}>Buy now</button>
              <button onClick={()=>{
                  setLoading(true);
                  setTimeout(()=>{
                    handleCart(cart);
                  },1000);
              }}>
              {cart?"Add to cart":"remove from cart"}
              </button>
            </div>
          </div>

          <div id="desBtnBuyPage">
            <h1>Product Description</h1>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum
              impedit asperiores atque vel ducimus. Non veritatis harum ullam
              odio quidem unde esse suscipit ipsam. Excepturi, aliquid aperiam.
              Libero vitae cumque rerum debitis expedita beatae facere itaque
              amet perferendis dolor sapiente quibusdam animi obcaecati iusto
              corporis quis maxime assumenda molestiae dolores omnis quasi,
              veritatis officia molestias dolorem! Ipsum nisi, debitis cum quia
              fuga voluptatum deleniti. Explicabo officia vero qui quo
              necessitatibus ab, dignissimos corrupti aut ut itaque quidem,
              perspiciatis inventore tempora eaque, voluptates vitae laborum
              laboriosam iure assumenda. Exercitationem hic voluptas inventore
              tempora, autem natus, officia deleniti laboriosam quis optio
              nulla.
            </p>
          </div>
          <div id="keyFeaturesBuyPage">
            {(data && data.keyfeatures) && 
              <>
                <h1>key features</h1>
                <Keyfeatures obj={data.keyfeatures} />
              </>
            }
          </div>
        </div>
      </div>
      <div id="mainRatingBuyPage">
        <div id="cusReviewsBuyPage">
          <h1 style={{fontFamily:`'Lora', serif`}}>Customer reviews</h1>
          <div style={{ display: "flex" }}>
            {data && <HandleRating width={"40px"} rate={rating != undefined ? rating : 0} />}
          </div>
          <span style={{ marginLeft: "10px",fontWeight:"bold" }}>
            {rating ? Math.floor(rating) : 0} out of 5
          </span>
          <div style={{fontWeight:"bold"}}>
            <span>
              { (data && data.reviews) &&
                (data.reviews.length == undefined
                  ? 0
                  : data.reviews.length)}{" "}
              global ratings
            </span>
          </div>

          <div id="cusRatingBuyPage">
            <div id="starBuyPage">
              <span>5 star</span>
              <span>4 star</span>
              <span>3 star</span>
              <span>2 star</span>
              <span>1 star</span>
            </div>

            <div id="ratingWidthBuyPage">
              <div id="fiveStarBuyPage">
                <div></div>
              </div>
              <div id="fourStarBuyPage">
                <div></div>
              </div>
              <div id="threeStarBuyPage">
                <div></div>
              </div>
              <div id="twoStarBuyPage">
                <div></div>
              </div>
              <div id="oneStarBuyPage">
                <div></div>
              </div>
            </div>

            <div id="ratingPerBuyPage">
              <span>{isNaN(perStar.five) ? 0 : perStar.five}%</span>
              <span>{isNaN(perStar.four) ? 0 : perStar.four}%</span>
              <span>{isNaN(perStar.three) ? 0 : perStar.three}%</span>
              <span>{isNaN(perStar.two) ? 0 : perStar.two}%</span>
              <span>{isNaN(perStar.one) ? 0 : perStar.one}%</span>
            </div>
          </div>
        </div>

        <div id="reviewBuyPage">
          <div>
            <button onClick={handleRate} style={{fontFamily:`'Lora', serif`}}>Rate this product</button>
          </div>
          <div>
            <h1 style={{fontFamily:`'Lora', serif`}}>Ratings & Reviews</h1>
          <EmptyReviews/>
          </div>

          <div id="ratingConBuyPage">
            {(data && data.reviews)&&
              data.reviews.map((elem, index) => (
                    <UserReviews elem={elem} key={index}/>
              ))
            }
          </div>
        </div>
      </div>

      <div id="mainRateProduct" ref={targetRef}>
        <div id="firstDivRateProduct">
          <h1 style={{fontFamily:`'Lora', serif`}} >Rate this product</h1>
          <div id="starRateProduct">
            <div id="fiveStar" onClick={() => selectingStar(5)}></div>
            <div id="fourStar" onClick={() => selectingStar(4)}></div>
            <div id="threeStar" onClick={() => selectingStar(3)}></div>
            <div id="twoStar" onClick={() => selectingStar(2)}></div>
            <div id="oneStar" onClick={() => selectingStar(1)}></div>
          </div>
          <div>
            <h3 style={{fontFamily:`'Lora', serif`}}>{ratingMood}</h3>
          </div>
        </div>
        <div id="secDivRateProduct">
          <h1 style={{fontFamily:`'Lora', serif`}}>Review this product</h1>

          <div>
            <div id="descDivRateProduct">
              <p>Description</p>
              <textarea
                rows="5"
                placeholder="Description..."
                ref={descRef}
              ></textarea>
            </div>
            <div id="titleDivRateProduct">
              <p>title</p>
              <textarea placeholder="Reivew title..." ref={titleRef}></textarea>
            </div>
            <div id="nameDivRateProduct">
              <p>Name</p>
              <input type="text" placeholder="Our Customer" ref={cusNameRef} />
            </div>
            <div id="uploadImgRateProduct">
              <label htmlFor="fileUpload">
                <img
                  src="images/addImg.png"
                  alt="error"
                  height="50px"
                  id="fileUploadRate"
                  onClick={handleImg}
                />
              </label>
              <input
                type="file"
                hidden
                id="fileUpload"
                accept="image/*"
                multiple
                onChange={handleImg}
              />
            </div>
            <div id="reviewImgRateProduct">
              {uploadImg.map((elem, index) => (
                <img src={elem} key={index} />
              ))}
            </div>
            <div id="btnDivRateProduct">
              <button onClick={submitRating}> Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>:null}

    {showP == false?(
      sim&&(
    <div id="similarProductDivCon">
        <div id="similarProductDiv">
        <h1 id="similarProductDivHeading">Similar Products</h1>
        <CreateSlider data={sim}/>
        </div>
    </div>)):null}
     {/* Recently searched */}

     {/* footer */}
     {showP == false?<Footer/>:null}
    <PhoneFooter/>
     {/* loader */}
    {showP == false?(loading?<Loader/>:null):null}
    {showP==true?<Payment/>:null}
    </>
  );
}
