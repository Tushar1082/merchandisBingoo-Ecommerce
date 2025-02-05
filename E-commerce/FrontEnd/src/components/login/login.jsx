import { useState,useEffect } from 'react';
import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import "./login.css";
import Loader from '../homepage/loader/loader';
import ForgotPass from '../forgotPass/forgotPass';

export default function Login() {
    const [pass,setHidePass] = useState(true);
    const [img,setImg] = useState("./images/login_signup/profile.png");
    const [user,setUser] = useState({
        email:"", password:""
    })
    const [wrongPass,setWrongPass] = useState(false);
    const [notUser,setNotUser] = useState(false);
    const [loading,setLoading] = useState(false);
    const [forPassData,setForPassData] = useState({
        show:false,
        name:'',
        email:'',
        profileImg:''
    });
    
    let name,value;
    const navigate = useNavigate();
    
    const toggleVisibility = ()=>{
        setHidePass(!pass);
    }
    const handleInputs=(e)=>{
      name= e.target.name;
      value= e.target.value;

      setUser({
        ...user,
        [name]:value
      })
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true);

        try{
            const res = await fetch(`${import.meta.env.VITE_REACT_API_URL}/login`,{
                method:"POST",
                headers:{
                  "Content-type":"application/json"
                },
                body:JSON.stringify(user),
                credentials:'include'
            })
            const data = await res.json();

            if(data.wrongPass=='true'){
                setWrongPass(true);
                if(data.email === user.email){
                    setImg(data.profileImg||"./images/login_signup/profile.png");
                }
                setLoading(false);
                return;
            }
            if(data.message){
                setNotUser(true);
                setLoading(false);
                return;
            }else{
                const {name,email,profileImg,token} = data;
                localStorage.setItem("MDB_USER_NAME",name);
                localStorage.setItem("MDB_USER_EMAIL_ID",email);
                Cookies.set("token",token,{expires: new Date("March 1, 3000 11:13:00")});
                if(email === user.email){
                    setImg(profileImg||"./images/login_signup/profile.png");
                }
                setTimeout(()=>{
                    setLoading(false);
                    navigate("/");
                },2000)
            }
        }catch(e){
            console.log(e);
        }
    }
    const forgotPass=async()=>{
        if(user.email){
            try{
                const res = await fetch(`${import.meta.env.VITE_REACT_API_URL}/login`,{
                    method:"POST",
                    headers:{
                      "Content-type":"application/json"
                    },
                    body:JSON.stringify(user)
                })
                const data = await res.json();

                if(data.message){
                    setNotUser(true);
                }else{
                    const {name,email,profileImg} = data;
                    setForPassData({show:true,name,email,profileImg});
                }
            }catch(e){
                console.log(e);
            }
        }else{
            alert("enter your email id");
        }
    }
  return (
    <div id='masterMainLogin'>
        { !forPassData.show && <div id="mainLogin">
            <div id="profileLogin">
                <div id="profileImgDiv">
                <img src={img} alt="error" id="profilePicLogin"/>
                </div>
                <form method="post" >
                    <input type="email" name="email" required id="emailLogin" placeholder="Enter email Id" onChange={handleInputs}/>
                    <div id="passDiv">
                        <input type={pass?"password":"text"} name="password" required id="passwordLogin" placeholder="Enter password" onChange={handleInputs}/>
                        <img src="./images/login_signup/eye.png" alt="error" id="eyeLogin" onClick={toggleVisibility} style={{display: pass?'block':'none'}}/>
                        <img src="./images/login_signup/crossEye.png" alt="error" id="crossEyeLogin" onClick={toggleVisibility} style={{display:pass?'none':'block'}}/>
                    </div>
                    <div id='forgetPass'>
                        <span onClick={forgotPass}>forget password?</span>
                    </div>
                    <input type="submit" id="submitLogin" onClick={handleSubmit}/>
                    <span id='spanLogin'>Not a member?<Link to="/signup">Signup now</Link></span>
                </form>
            </div>
                {notUser?
                <div id="notUser" onAnimationEnd={()=>setNotUser(false)}>
                        <h1>!!You are not registered plz <span>Signup!!</span></h1>
                </div>
                :notUser}

                {wrongPass?
                <div id="passWrong" onAnimationEnd={()=>setWrongPass(false)}>
                    <h1>!!You entered <span>wrong</span> password!!</h1>
                </div>
                :wrongPass}
        </div>}
        {loading?<Loader/>:null}
        {forPassData.show?
        <ForgotPass 
            name={forPassData.name} 
            email={forPassData.email} 
            profileImg={forPassData.profileImg} 
        />:null}
    </div>
  )
}