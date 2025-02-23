import React,{useRef,useState,useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import { useDispatch } from 'react-redux';
import "./navbar.css";
import cartImage from "/images/navbar/fastCart.png"
import searchImage from "/images/navbar/search.png";
import speechImage from "/images/navbar/speech.png";
import userImage from "/images/navbar/user.png";
import voiceRecognitionGif from "/images/navbar/voice recognition.gif";
import wishlistImage from "/images/navbar/wishlist.png";
import logo from "/images/navbar/logo.png";
import accountImg from "/images/navbar/account.png";
import addAddressImg from "/images/navbar/address.png";
import cartImg from "/images/navbar/cart.png";
import orderImg from "/images/navbar/order.png";
import logoutImg from "/images/navbar/logout.png";
import speechRecAudio from "/audio/speechStartVoice.mp3"
import { Counting } from '../../../services/actions/actions.jsx';
import { CountingLike } from '../../../services/actions/actions.jsx';
import Cookies from 'js-cookie';

export async function handleList(list,remCartList){
  const isUserLog = localStorage.getItem("MDB_USER_EMAIL_ID");
  try{
    const res = await fetch(`${import.meta.env.VITE_REACT_API_URL}?cart=true`,{
      method:"POST",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify({list,isUserLog})
    })
    const data = await res.json();
    const deleteRes = await fetch(`${import.meta.env.VITE_REACT_API_URL}?cart=true`,{
      method:"DELETE",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify({remCartList,isUserLog})
    })
    const deleteData = await deleteRes.json();
    const success = "success";
    return success;
  } catch (e) {
   console.log(e);
   const fail = "fail"; 
   return fail;
  }
}
export async function handleLikeList(likeList,remLikeList){
  const isUserLog = localStorage.getItem("MDB_USER_EMAIL_ID");
  try{
    const res = await fetch(`${import.meta.env.VITE_REACT_API_URL}?like=true`,{
      method:"POST",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify({likeList,isUserLog})
    })
    const data = await res.json();

    const deleteRes = await fetch(`${import.meta.env.VITE_REACT_API_URL}?like=true`,{
      method:"DELETE",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify({remLikeList,isUserLog})
    })
    const deleteData = await deleteRes.json();
    
    return true;
  } catch (e) {
   console.log(e); 
   return false;
  }
}

export default function Navbar() {
  // const logSignRef = useRef(null);
  // const logginedRef = useRef(null);
  // const userNameRef = useRef(null);
  const audioStartRef = useRef();
  const inputRef = useRef();
  const navigate = useNavigate();
  const {count} = useSelector(state=>state.cart);
  const {likeCount} = useSelector(state=>state.like);
  const dispatch = useDispatch();
  const [img,setImg] = useState("images/navbar/user.png");
  const [showGif,setShowGif] = useState(false);
  const [user,setUser] = useState();
  const [userProfLoad, setUserProfLoad] = useState(false);
  const [showUserProf, setShowUserProf] = useState(null);
  const [userName, setUserName] = useState('user name');

  function firstName(str){
    const newStr = str.split(" ")[0];
    return newStr;
  }
  async function callData(name, email, tokenVal){
    const userName = name;
    const isUserLog = email;
    const token = tokenVal;

    if(isUserLog!=null){
      setUserProfLoad(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_REACT_API_URL}/user?user=${isUserLog}`,{
          method:"GET",
          headers:{
            "authorization":`Bearer ${token}`,
            body:JSON.stringify({isUserLog})
          }
        });
        const finalRes = await res.json();

        if(finalRes.Unauthorized){
          navigate("/unthorize");
        }else{
          setShowUserProf(true);
          const {cartList,wishList,name,profileImg} = finalRes;  
          dispatch(Counting(cartList.length));
          dispatch(CountingLike(wishList.length));
          setUserName(name);
          setImg(profileImg);
          setUser(userName);
        }
      } catch (error) {
        alert("failed to fetch user credentials");
        console.log(error);
      }finally{
        setUserProfLoad(false);
      }
    }else{
      setShowUserProf(false);
    }
  }
  
  useEffect(()=>{
    localStorage.setItem("MDB_USER_NAME", "rahul Sharma");
    localStorage.setItem("MDB_USER_EMAIL_ID", "rahulsharma1082@gmail.com");
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2EyMmI0NjZmZDhiY2YxMmM1OGUxNWYiLCJpYXQiOjE3Mzg2ODE1NzV9.pMo7ToY5ZJTkc3KT5Qay6YnmgulOJnKzx_PAvu9ZKXk";
    Cookies.set("token",token,{expires: new Date("March 1, 3000 11:13:00")});

    callData("rahul Sharma","rahulsharma1082@gmail.com",token);
  },[])
  
  function logout(){
    localStorage.removeItem("MDB_USER_NAME");
    localStorage.removeItem("MDB_USER_EMAIL_ID");
    Cookies.remove("token");
    location.reload();
  }

  function handleSpeech(){
    setShowGif(!showGif); 
    const audio = audioStartRef.current;
    audio.play();
    voiceRecognition();
  }
  function voiceRecognition(){
  
   const SpeechRecognition =  window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.interimResults = true;

    let text;
    recognition.addEventListener("result", (e) => {
      text = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
    });
    setTimeout(()=>{
      recognition.addEventListener("end", () => {
        if(text){
          inputRef.current.value += text;
        }
        recognition.stop();
        setShowGif(false);
      });
    },2000)

    recognition.start();
  }
  useEffect(()=>{
    if(showGif)
    {
      document.body.style.backgroundColor = "lightgrey";
    }else{
      document.body.style.backgroundColor = "";
    }
  },[showGif])


  return (
    <>
    <div id='mainNav'>
        <div id='logoNav'>
        <Link to="/" style={{textDecoration:"none",color:"black"}}>
          <img src={logo} alt="error" height="50px" />
        </Link>
        </div>
        <div id='searchNav'>
            <img src={searchImage} style={{marginRight:"5px"}} alt="error" />
            <input type="text" placeholder='Search for product brand or more...' ref={inputRef} id='searchBox' onKeyDown={(e)=>e.key==="Enter"?window.location.href=`/search?search=${e.target.value}`:""}/>

            <div id='speechNavDiv'>
              <img src={speechImage} alt="error" id='speechNav' onClick={handleSpeech}/> 
              <span>Search with your voice</span>
            </div>

           <audio ref={audioStartRef}>
              <source src={speechRecAudio} typeof='audio/mp3'/>
           </audio>   
        </div>
        <div id='user_Cart'>
          <div id='userNav'>
            { showUserProf == false?<div id='Login_signup'>
              <Link to="/login" id='logBtnNavbar'>
                <button id='loginBtn'>Login</button>
              </Link>
              <Link to="/signup">
                <button id='signupBtn'>Signup</button>
              </Link>
            </div>
            :
            (userProfLoad?
              <div id='userProfLoading_nav'></div>
            :
            <div id="loggined">
              <h4 id="userName">{"Hello, "+ firstName(userName)}</h4>
              <div id='profileImgNavbar'>
                <img src={img||userImage} alt="error" />
              </div>
              <div id='optionsNav' >
                  <Link to="/myAccount" ><img src={accountImg} alt="error"/><span>My Account</span></Link>
                  <Link to="/myOrders" ><img src={orderImg} alt="Error"/><span>My Orders</span></Link>
                  <Link to="/cart" ><img src={cartImg} alt="Error"/><span>Cart</span></Link>
                  <Link to="/addAddress" ><img src={addAddressImg} alt="Error"/><span>Add Address</span></Link>
                  <Link to="/" onClick={logout}><img src={logoutImg} alt="Error"/><span>Logout</span></Link>
              </div>
            </div>)
              
            }
            
            {user && <div id='profileImgPhoneNav' onClick={()=>navigate("/myAccount")} >
              <img src={img||userImage} alt="error" />
            </div>}
          </div>
          <div id='wishlistNavbar'>
              <div>{isNaN(likeCount)?0:likeCount}</div>
              <Link to={user?"/wishlist":"/login"}>
                <img src={wishlistImage} alt='error'/>
              </Link>
              <span>wishlist</span>
          </div>
          <div id='cartNavbar'>
            <div>{isNaN(count) ? 0 : count}</div>
            <Link to={user?"/cart":"/login"}>
              <img src={cartImage} alt="error" />
            </Link>
            <span>your cartlist</span>
          </div>
        </div>
    </div>
    {showGif&&
    <div className='voiceGifDiv'>
      <img src={voiceRecognitionGif} alt="error" />
    </div>
    }
    </>
  )
}
