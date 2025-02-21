import React,{useState,useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {compare} from 'bcryptjs';
import Cookies from "js-cookie";
import Footer from '../../footer/footer';
import Navbar from '../../navbar/navbar';
import { PhoneFooter } from '../../homepage';
import profile from "/images/wishlist/profile.png";
import editProfileImg from "/images/editProfile.png";
import img from "/images/myAccount/1.jpg";
import Loader from '../../loader/loader';
import "./myAccount.css";

export default function MyAccount() {
  const [editProfile,setEditProfile] = useState(false);
  const [editName,setEditName] = useState(false);
  const [editGender,setEditGender] = useState(false);
  const [editEmail,setEditEmail] = useState(false);
  const [editPhoneNo,setEditPhoneNo] = useState(false);
  const [newChanges,setNewChanges] = useState({
    profileImg:"",
    name:"",
    email:"",
    gender:"",
    phoneNo:"",
    address:"",
    oldPass:"",
    newPass:""
  });
  const [loading,setLoading] = useState(false);
  const [showChangePassOption,setShowChangePassOption] = useState(false);
  const [userCurrPass,setUserCurrPass] = useState('');
  const navigate = useNavigate();

  function handleFile(e){
  const file = e.target.files[0];
  const reader = new FileReader();
  
    reader.onload=function(e){
      const result = e.target.result;
      setNewChanges((prev)=>({...prev,profileImg:result}));
    }
    reader.readAsDataURL(file);
  }
  async  function handleSave(){
    try {
      let isMatch = false;

      if(showChangePassOption){
        if(newChanges.oldPass.length==0){
          alert('Enter current password first to change password');
          return;
        }else if(newChanges.newPass.length==0){
          alert('Enter new password to change password');
          return;
        }
        isMatch = await compare(newChanges.oldPass,userCurrPass);

        if(!isMatch){
          alert('Old password is not matched with current password');
          return;
        }
      }
    setLoading(true);
      const user = localStorage.getItem("MDB_USER_EMAIL_ID");
      const res = await fetch(`${import.meta.env.VITE_REACT_API_URL}/user?user=${user}`,{
        method:"PUT",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify({...newChanges,isChangePass:isMatch})
      });
      const finalRes = await res.json();

      if(finalRes.success){
          setLoading(false);
          localStorage.setItem("MDB_USER_NAME",newChanges.name);
          localStorage.setItem("MDB_USER_EMAIL_ID",newChanges.email);
          window.location.reload();
      }else if(finalRes.fail){
        alert(finalRes.fail)
      }else{
        alert("Error from server, due to failed to update new changes");
      }
    } catch (error) {
      console.log(error)
      alert("failed to update new changes");
    }
  }
  async function callData(){
    const token = Cookies.get("token");
    setLoading(true);
    try {      
      const user = localStorage.getItem("MDB_USER_EMAIL_ID");
      const res = await fetch(`${import.meta.env.VITE_REACT_API_URL}/user?user=${user}`,{
        method:"GET",
        headers:{
          "authorization":`Bearer ${token}`
        }
      });
      const finalRes = await res.json();

      if(finalRes.notSignUp){
        navigate("/login");
      }
      if(finalRes.Unauthorized){
          navigate("/unauthorize");
      }else{
        if(finalRes.msg){
          alert(finalRes.msg);
        }else{
          setLoading(false);
          const {profileImg,name,email,gender,phoneNo,address,password} = finalRes;
          setUserCurrPass(password);
          setNewChanges({profileImg,name,email,gender,phoneNo,address,oldPass:'',newPass:''});
        }
      }
    } catch (error) {
      alert("failed to fetch user details");
    }
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
  useEffect(()=>{
    callData();
  },[])
  return (
    <>
    <Navbar/>
    <div id="mainMyAccount">
      <div id='myAccBgImg'>
        <img src={img} alt="error"/>
      </div>
      <div id='mainMyAccountDiv'>
        <div style={{margin:"auto",display:"flex",flexDirection:"column",gap:"2.5rem"}}>
        <div id='mainUserProfileMyAccount'>
            <div id='userProfileMyAccount'>
                <div>
                  <label htmlFor="uploadFile">
                  <img src={(newChanges.profileImg)!=""?newChanges.profileImg:profile} alt="error" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                  </label>
                  <input type="file" id='uploadFile' hidden disabled={editProfile?false:true} onChange={handleFile}/>
                </div>
                <div>
                    <img src={editProfileImg} alt="error" onClick={()=>setEditProfile(!editProfile)} style={{height:"1.5rem"}} />
                </div>
            </div>    
            <div>
                <h2>Hello, <UserName name={newChanges.name}/></h2>
                {newChanges && <p style={{color:'grey'}}>{newChanges.address}</p>}
            </div>
          </div>
          <div >
            <div style={{display:"flex",gap:"20px",marginBottom:"1rem"}}>
              <h3>Name</h3>
              <img src={editProfileImg} id='editImgMyAccount' alt="error" onClick={()=>{setEditName(!editName)}} />
            </div>
            <div>
              <input
              type="text"
              disabled={editName?false:true}
              value={newChanges.name}
              onChange={(e)=>setNewChanges((prev)=>({...prev,name:e.target.value}))}
                />
            </div>
          </div>
          <div >
            <div style={{display:'flex',gap:"20px",marginBottom:"1rem"}}>
              <h3>Your Gender</h3>
              <img src={editProfileImg} id='editImgMyAccount' alt="error" onClick={()=>setEditGender(!editGender)} />
            </div>
            <div style={{display:"flex",gap:"20px",fontSize:"20px"}}>
              <label htmlFor="male" style={{cursor:'pointer'}}>
                <input 
                type="radio" 
                name="gender"
                value="male"
                hidden
                id='male'
                style={{scale:"1.4"}}
                disabled={editGender?false:true} 
                checked={newChanges.gender=="male"?true:false}
                onChange={(e)=>setNewChanges((prev)=>({...prev,gender:e.target.value}))}
                />
                <div 
                id='maleDiv'
                style={{
                  background:editGender?"linear-gradient(113deg, dodgerblue 2rem, #1e90ff54)":"linear-gradient(113deg, grey, lightgrey)",
                  boxShadow:editGender?"0px 0px 10px -2px dodgerblue":"0px 0px 3px 2px lightgrey"  
                }}>♂</div>
              </label>
              <label htmlFor="female" style={{cursor:'pointer'}}>
                <input 
                type="radio"
                name="gender" 
                id='female' 
                value="female" 
                hidden
                style={{scale:"1.4"}}  
                disabled={editGender?false:true}
                checked={newChanges.gender=="female"?true:false}
                onChange={(e)=>setNewChanges((prev)=>({...prev,gender:e.target.value}))}
                />
                <div 
                id='femaleDiv'
                style={{
                  background:editGender?"linear-gradient(113deg, deeppink 2rem, pink)":"linear-gradient(113deg, grey, lightgrey)",
                  boxShadow:editGender?"0px 0px 10px -2px deeppink":"0px 0px 3px 2px lightgrey",
                  color:editGender?"black":"white"
                }}
                >♀</div>
              </label>
            </div>
            <div style={{marginTop:"1rem",fontSize:"15px"}}>
             <span style={{marginRight:"10px",fontWeight:"bold", fontSize:'large'}}>Current gender:-</span>
             <span style={{fontSize:'large'}}>{newChanges.gender}</span>
            </div>
          </div>
          <div >
            <div style={{display:"flex",gap:"20px",marginBottom:"1rem"}}>
              <h3>Email Address</h3>
              <img src={editProfileImg} id='editImgMyAccount' alt="error" onClick={()=>setEditEmail(!editEmail)} />
            </div>
            <div>
              <input 
              type="email"
              disabled={editEmail?false:true}
              value={newChanges.email}
              onChange={(e)=>setNewChanges((prev)=>({...prev,email:e.target.value}))}
              />
            </div>
          </div>
          <div >
            <div style={{display:"flex",gap:"20px",marginBottom:"1rem"}}>
              <h3>Mobile Number</h3>
              <img src={editProfileImg} id='editImgMyAccount' alt="error" onClick={()=>setEditPhoneNo(!editPhoneNo)} />
            </div>
            <div>
              <input 
              type="Number"
              disabled={editPhoneNo?false:true}
              value={newChanges.phoneNo}
              onChange={(e)=>setNewChanges((prev)=>({...prev,phoneNo:e.target.value}))}
              />
            </div>
          </div>
          <div id='changePassDiv'>
            <div>
              <button onClick={()=>setShowChangePassOption(!showChangePassOption)}>Change Password</button>
            </div>
            {showChangePassOption && <div>
                <input 
                  type="password" 
                  placeholder='Old Password' 
                  onChange={(e)=>setNewChanges((prev)=>({...prev, oldPass:e.target.value}))}
                />
                <input 
                  type="password" 
                  placeholder='New Password' 
                  onChange={(e)=>setNewChanges((prev)=>({...prev, newPass:e.target.value}))}
                />
            </div>}
          </div>
          <div id='saveNewChanges'>
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
    </div>
    {loading?<Loader/>:null}
      <Footer/>
      <PhoneFooter/>
      </>
  )
}
