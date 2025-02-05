import React, { useEffect, useRef, useState } from 'react';
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Cookies from "js-cookie";
import "./deliveryAddress.css";
import {disDelAddPage,disOrderPage,selectAddres} from "../../../services/actions/actions";
import plus from "/images/addAddress/plus1.png";
import Loader from '../../homepage/loader/loader';

export default function DeliveryAddress() {
  const [home,setHome] = useState([]);
  const [work,setWork] = useState([]);
  const [loading,setLoading] = useState(false);
  const dispatch = useDispatch();

  const homeRef = useRef();
  const workRef = useRef();
  const imgRef = useRef();
  const navigate = useNavigate();
  
  const {dispAddress} = useSelector((state)=>state.payment)
  
  function handleHome(){
    const home = homeRef.current;
    const content = home.nextElementSibling;

    if(content.style.maxHeight){
      content.style.maxHeight = null;
      content.style.padding = "unset";
      content.style.visibility = "hidden";
      home.style.margin= "0px";
    }else{
      content.style.maxHeight = content.scrollHeight +'px';
      content.style.padding = "20px"; 
      content.style.visibility = "unset";
      home.style.marginBottom= "20px";
    }
  }
  function handleWork(){
    const work = workRef.current;
    const content = work.nextElementSibling;

    if(content.style.maxHeight){
        content.style.maxHeight = null;
        content.style.padding = "unset";
        content.style.visibility = "hidden";
        work.style.margin="0px";
    }else{
        content.style.maxHeight = content.scrollHeight+"px";
        content.style.padding = "20px";
        content.style.visibility = "unset";
        work.style.marginBottom = "20px";
    }
  }  
  function handleSpin(){
    const img = imgRef.current;

    img.style.animation = "spin 1s ease";

    setTimeout(()=>{
        navigate("/addAddress");
    },1100)
  }
  function navigateToOrder(obj){
    dispatch(selectAddres(obj))
    dispatch(disDelAddPage(false));
    dispatch(disOrderPage(true));
  }
  async function callData(){
    try {
      const token = Cookies.get("token");
      const user = localStorage.getItem("MDB_USER_EMAIL_ID");

      const res = await fetch(`${import.meta.env.VITE_REACT_API_URL}/user?user=${user}`,{
        method:"GET",
        headers:{
          "authorization":`Bearer ${token}`
        }
      })
      const finalRes = await res.json();
      
      if(finalRes.unauthorized){
        navigate("/unauthorize")
      }else{
        const {addAddressList} = finalRes;
        addAddressList.map((elem)=>{
          if(elem.addressType === "Home"){
            setHome((prev)=>([...prev,elem]));
          }else{
            setWork((prev)=>([...prev,elem]))
          }
        })
      }
      setLoading(false);
    } catch (error) {
      alert("failed to get user details");
      console.log(error);
      setLoading(false);
    }
  }
  useEffect(()=>{
    setLoading(true)
    callData();
  },[])
  return (
    <>
    {loading?<Loader/>:null}
   {dispAddress && <div id='deliveryMain'>
      <div id='homeAddressDelivery'  >
          <h2 ref={homeRef} onClick={handleHome} style={{fontFamily: `'Cinzel Decorative', serif`}}>Home Address</h2>
            <div id='homeAddressCon'>
               {home.length!=0 && home.map((elem,index)=>(
                <div id='addressDivDelivery' onClick={()=>navigateToOrder(elem)} key={index}>
                      <div>
                          <p style={{fontWeight:"bold",fontFamily: "'Cinzel Decorative', serif"}}>{elem.name}</p>
                          <p>{elem.address}</p>
                          <p>Locality:{elem.locality}</p>
                          {(elem.landmark).length?<p>Landmark:{elem.landmark}</p>:""}
                          <p>{elem.city}, {elem.state}{elem.pincode}</p>
                          <p>India</p>
                          <p>Phone no.: {elem.phoneNo}</p>
                          {(elem.altPhone).length!=0?<p>Alternate Phone no.: {elem.altPhone}</p>:""}
                      </div>
                  </div>
               ))}
            </div>
      </div>
      <div id='workAddressDelivery' >
        <h2 ref={workRef} onClick={handleWork} style={{fontFamily: `'Cinzel Decorative', serif`}}>Work Address</h2>
        <div id='workAddressCon'>
        {work.length!=0 && work.map((elem,index)=>(
                <div id='addressDivDelivery' onClick={navigateToOrder} key={index}>
                      <div>
                          <p style={{fontWeight:"bold",fontFamily: `'Cinzel Decorative', serif`}}>{elem.name}</p>
                          <p>{elem.address}</p>
                          <p>Locality:{elem.locality}</p>
                          {(elem.landmark).length?<p>Landmark:{elem.landmark}</p>:""}
                          <p>{elem.city}, {elem.state}{elem.pincode}</p>
                          <p>India</p>
                          <p>Phone no.: {elem.phoneNo}</p>
                          {(elem.altPhone).length!=0?<p>Alternate Phone no.: {elem.altPhone}</p>:""}
                      </div>
                  </div>
               ))}
            </div>
      </div>
      <div id='createNewAdd' onClick={handleSpin}>
        <img src={plus} alt="error" height="40px" ref={imgRef}/>
        <h3>Add new address</h3>
      </div>
    </div>}
    </>
  )
}
