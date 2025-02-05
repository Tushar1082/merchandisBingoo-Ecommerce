import React,{useEffect, useRef,useState} from 'react';
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import yourAccount from "/images/wishlist/account.png";
import manageAddress from "/images/wishlist/address.png";
import yourCartlist from "/images/wishlist/cart.png";
import homepage from "/images/wishlist/homepage.png";
import yourOrder from "/images/wishlist/order.png";
import profile from "/images/wishlist/profile.png";
import "./addAddress.css";
import Navbar from '../../navbar/navbar';
import Footer from '../../footer/footer';
import Loader from '../../loader/loader';
import { PhoneFooter } from '../../homepage';

export default function AddAddress() {
  const [address,setAddress] = useState({
    id:undefined,
    name:"",
    phoneNo:"",
    pincode:"",
    locality:"",
    address:"",
    city:"",
    state:"",
    landmark:"",
    altPhone:"",
    addressType:""
  });
  const [state,setState] = useState([]);
  const [profilePic,setProfilePic] = useState();
  const [userName,setUserName] = useState();
  const [loading,setLoading] = useState();
  const navigate = useNavigate();
  const divRef = useRef();
  const newRef = useRef();
  const conRef = useRef();

  function handleClick(){
    const user = localStorage.getItem("MDB_USER_EMAIL_ID");
    if(!user){
      navigate("/login");
    }
    const div = divRef.current;
    const newAdd = newRef.current;

    div.classList.toggle('rotated');
    setTimeout(()=>{
      newAdd.style.display = "inline-flex";
    },1000)
  }
  function handleCancel(){
    for(let key in address){
      if(key == "id"){
        setAddress((prev)=>({...prev,id:undefined}))
      }
      else if(key == "state" || key == "addressType" ){
        setAddress((prev)=>({...prev,[key]:address[key]}))
      }
      else{
        setAddress((prev)=>({...prev,[key]:""}))
      }
    }
    const newAdd = newRef.current;
    if(newAdd){
      newAdd.style.display="none";
    }
  }

  function handleName(e){
    const  id = Math.floor(Math.random()*1000)

    setAddress((prev)=>({
      ...prev,
      name:e.target.value,
      id:id 
    }))
  }
  function handlePhoneNo(e){
    setAddress((prev)=>({
      ...prev,
      phoneNo:e.target.value
    }))
  }
  function handlePinCode(e){
    setAddress((prev)=>({
      ...prev,
      pincode:e.target.value
    }))
  }
  function handleLocality(e){
    setAddress((prev)=>({
      ...prev,
      locality:e.target.value
    }))
  }
  function handleAddress(e){
    setAddress((prev)=>({
      ...prev,
      address:e.target.value
    }))
  }
  function handleCity(e){
    let value = e.target.value;
    value = value.toUpperCase(); 
    setAddress((prev)=>({
      ...prev,
      city:value
    }))
  }
  function handleState(e){
    let value = e.target.value;
    value = value.toUpperCase();
    setAddress((prev)=>({
      ...prev,
      state:value
    }))
  }
  function handleLandmark(e){
    setAddress((prev)=>({
      ...prev,
      landmark:e.target.value
    }))
  }
  function handleAltPhone(e){
    setAddress((prev)=>({
      ...prev,
      altPhone:e.target.value
    }))
  }
  function handleAddressType(e){
    setAddress((prev)=>({
      ...prev,
      addressType:e.target.value
    }))
  }
  async function handleSave(){
    if(address["phoneNo"].length>10){
      alert("Length of phone number is not greator than 10");
    }else if(address["phoneNo"].length<10){
      alert("Length of phone number is not less than 10");
    }else if(address["name"].length ==0){
      alert("Enter Name");
    }else if(address["pincode"].length == 0){
      alert("Enter Pincode");
    }else if(address["locality"].length == 0){
      alert("Enter Locality");
    }else if(address["address"].length === 0) 
    {
      alert("Enter address");
    }else if(address["city"].length ==0){
      alert("Enter city");
    }else if(address["addressType"].length ==0){
      alert("Choose Address Type");
    }else{
      setLoading(true);
      try {
        const user = localStorage.getItem("MDB_USER_EMAIL_ID");
        const res = await fetch(`${import.meta.env.VITE_REACT_API_URL}/user?user=${user}`,{
          method:"POST",
          headers:{
            "content-type":"application/json"
          },
          body:JSON.stringify(address)
        });
        const finalRes  = await res.json();
        
        for(let key in address){
          if(key == "id"){
            setAddress((prev)=>({...prev,id:undefined}))
          }
          else if(key == "state" || key == "addressType" ){
            setAddress((prev)=>({...prev,[key]:address[key]}))
          }
          else{
            setAddress((prev)=>({...prev,[key]:""}))
          }
        }
        if(finalRes.ok){
          setTimeout(()=>{
            setLoading(false);
            // alert(finalRes.ok);
          },2000)
        }else if(finalRes.msg){
          setTimeout(()=>{
            setLoading(false);
            // alert(finalRes.msg);
          },2000)
        }else if(finalRes.error){
          setTimeout(()=>{
            setLoading(false);
            // alert("failed to add address");
          },2000)
        }
      } catch (error) {
        setTimeout(()=>{
          setLoading(false);
          alert("Error:- failed to add address");
          console.log(error);
        },2000)
      }

      setTimeout(()=>{
        setState((prev)=>[...prev,address]);
        const div = newRef.current;
        div.style.display = "none";
      },2000)
    }
  }
  async function handleRemove(name,address,id){
    try {      
      const user = localStorage.getItem("MDB_USER_EMAIL_ID");
      const res = await fetch(`${import.meta.env.VITE_REACT_API_URL}/user?user=${user}`,{
        method:"DELETE",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify({name,address})
      });
      const finalRes = await res.json();

      if(finalRes.ok){
        alert(finalRes.ok);
      }else if(finalRes.msg){
        alert(finalRes.msg);
      }else if(finalRes.error){
        alert("Failed to delete address");
      }
    } catch (error) {
      alert("Error:- Failed to delete address");
      console.log(error);
    }

    const newState = state.filter((elem)=>(
      elem.id !=id
    ));
    setState(newState);
  }
  function UserName({name}){

    let str = name.toLowerCase();

    if(str.includes("mr.") || str.includes("mrs.") || str.includes("mr") || str.includes("mrs")){
      str = name.split(" ");
      const re = str[0]+" "+str[1]; 
      return re;
    }else{
      return name.split(" ")[0];
    }
  }
  async function callData(){
    try {      
      const token = Cookies.get("token");
      const user = localStorage.getItem("MDB_USER_EMAIL_ID");
      const res = await fetch(`${import.meta.env.VITE_REACT_API_URL}/user?user=${user}`,{
        method:'GET',
        headers:{
          'authorization': `Bearer ${token}`,
        }
      });
      const finalRes = await res.json();
      if(finalRes.Unauthorized){
        navigate("/unauthorize");
      }
      const {addAddressList,profileImg,name} = finalRes;
      setUserName(name);
      setProfilePic(profileImg);
      if(addAddressList){
        setState(addAddressList);
      }
    } catch (error) {
      alert("failed to fetch address of user");
      console.log(error);
    }
  }

  useEffect(()=>{
    callData();
  },[])
  useEffect(()=>{
    const con = conRef.current;

    if(state.length!=0){
      con.style.justifyContent = "unset";
      con.style.alignItems="unset";
    }else{
      con.style.justifyContent = "center";
      con.style.alignItems="center";
    }
  },[state])
  return (
    <>
      <Navbar/>
      <div id='mainAddAddress'>
          <div id="userInfo">
            <div id="userProfileDivWishlist">
              <div id="userProfileWishlist">
                <img src={profilePic||profile} alt="error" />
              </div>
              <div style={{ display: "inline-block" }}>
                {userName && <h4>Hello, <UserName name={userName}/></h4>}
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

        <div id='mainAddAddressDiv'>
          <h1 style={{textAlign:"center",fontFamily:`'Cinzel Decorative', serif`}}>My Addresses</h1>
          <div id='addressCon' ref={conRef}>
            <div id='addAddressDiv' ref={divRef}>
                <img src="images/addAddress/plus.png" alt="error" onClick={handleClick} />
                <h1 style={{fontFamily:`'Cinzel Decorative', serif`}}>Add Address</h1>
            </div>
            {
              (state && state.length!=0) && state.map((elem,index)=>(
                <div id='addressDivAddAddress' key={index}>
                  <div>
                      <p style={{fontWeight:"bold",fontFamily:`"Cinzel Decorative", serif`}} id='userNameAddAd' >{elem.name}</p>
                      <p>{elem.address}</p>
                      <p>Locality:{elem.locality}</p>
                      {elem.landmark && (elem.landmark).length!=0?<p>Landmark:{elem.landmark}</p>:""}
                      <p>{elem.city},{elem.state} {elem.pincode}</p>
                      <p>India</p>
                      <p>Phone no.: {elem.phoneNo}</p>
                      { elem.altPhone && (elem.altPhone).length!=0?<p>Alternate Phone no.: {elem.altPhone}</p>:""}
                  </div>
                  <div id='addressDivBtnDiv'>
                    <button onClick={()=>handleRemove(elem.name,elem.address,elem.id)}>Remove</button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        
        <div id='newAddressDiv' ref={newRef}>
          <h3 style={{fontFamily:`'Roboto Slab', serif`}}>ADD A NEW ADDRESS</h3>
          <div>
            <form action="" id='firstFormAddAddress'>
              <input type="text" required name='name' placeholder='Name' id='nameAddAdress' value={address.name} onChange={handleName}/>
              <input type="number" required name='mobileNumber' placeholder='10-digit mobile number' id='mobileNumAddAddress' value={address.phoneNo} onChange={handlePhoneNo}/>
              <input type="number" required name='pincode' placeholder='Pincode' id='pincodeAddAddress' value={address.pincode} onChange={handlePinCode}/>
              <input type="text" required name='Locality' placeholder='Locality' id='localityAddAddress' value={address.locality} onChange={handleLocality}/>
            </form>
          </div>
          <div>
            <textarea id="addressArea" cols="90" rows="5" placeholder='Address...' style={{resize:"none",padding:"10px",border:"1px solid",borderRadius:"5px",outline:"none"}} value={address.address} onChange={handleAddress}></textarea>
          </div>
          <div>
            <form action="" id='secondFormAddAddress'>
              <input type="text" required placeholder='City/District/Town' value={address.city} onChange={handleCity}/>
              <select required id="selectAdd" onChange={handleState} >
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Tripura">Tripura</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="West Bengal">West Bengal</option>
              </select>
              <input type="text" placeholder='Landmark(optinal)' id='landmarkAdd' value={address.landmark} onChange={handleLandmark}/>
              <input type="number" placeholder='Alternative Phone(Optional)' value={address.altPhone} onChange={handleAltPhone}/>
            </form>
          </div>
          <div>
            <h4 style={{marginBottom:"0.5rem",fontFamily:`'Roboto Slab', serif`}}>Address Type</h4>
            <div style={{display:"flex",gap:"5px",fontSize:"1.2rem"}}>
                  <input type="radio" id='homeAddress' name="addressType" value="Home"  onChange={handleAddressType}/>
                <label htmlFor="homeAddress" style={{fontFamily:`'Roboto Slab', serif`, cursor:'pointer'}}>
                Home
                </label>
                  <input type="radio" id='workAddress' value="Work" name="addressType"  onChange={handleAddressType}/>
                <label htmlFor="workAddress" style={{fontFamily:`'Roboto Slab', serif`, cursor:'pointer'}}>
                Work
                </label>
            </div>
          </div>
          <div>
            <button id='saveNewAddress' onClick={handleSave}>Save</button>
            <button id='cancelNewAddress' onClick={handleCancel}>Cancel</button>
          </div>
        </div>
        
      </div>
      {loading?<Loader/>:null}
      <Footer/>
      <PhoneFooter/>
    </>
  )
}
