import React,{useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { fireDB } from '../../../firebaseConfig';
import { getDownloadURL, ref, uploadBytes, deleteObject } from 'firebase/storage';
import Loader from "../homepage/loader/loader";
import "./signup.css";

export default function Signup() {
  const [pass,setPass] = useState();
  const [conPass,setConPass] = useState();
  const [img,setImg] = useState("./images/login_signup/profile.png");
  const [imgFile,setImgFile] = useState();
  // const [profile,setProfile] = useState([]);
  const [user,setUser] = useState({
    name:"", address:"", email:"", gender:"Choose" ,phoneNo:"", password:"", confirmPassword:""
  });
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  let name,value;


  const handleFile=(props)=>{
    const reader = new FileReader();
    setImgFile(props);
    reader.onload = function(e){
      const img = e.target.result;
      
      setImg(img);
    }
    reader.readAsDataURL(props);
  }
  const handleInputs=async(e)=>{
    const res = await fetch(`${import.meta.env.VITE_REACT_API_URL}/signup`);
    const data = await res.json();
        
    name= e.target.name;
    value= e.target.value;
    if(name === "email"){
      data.forEach((elem)=>{
        if(value === elem.email){
          setTimeout(()=>{
            e.target.value = "";
          },500)
          alert("Email is already exists");
        }
      })
    }
    if(name=="gender" && value=="Choose"){
      alert("Select your gender");
      return;
    }
    setUser(
      {
        ...user,
        [name]:value
      }
      ) 
  };

  const generateImg = async () => {
    try {
      setLoading(true);
      const imgRef = ref(fireDB, `MerchandiseBingoo/users/${user.email}/${user.email}`);
      const uploadResult = await uploadBytes(imgRef, imgFile); // Wait for the upload to complete
      const url = await getDownloadURL(uploadResult.ref); // Wait for the URL to be generated
      return url; // Return the URL
    } catch (error) {
      console.error("Image upload failed", error);
      return false; // Return false if any error occurs
    }
  };
  const deleteImg = async () => {
    try {
      const imgRef = ref(fireDB, `MerchandiseBingoo/users/${user.email}/${user.email}`); // Reference to the image
      await deleteObject(imgRef); // Delete the image
      console.log("Image deleted successfully");
      return true; // Return true on success
    } catch (error) {
      console.error("Failed to delete image", error);
      return false; // Return false on failure
    }
  };

  async function finalSubmit(){

      if(user.name == ""){
        alert("Enter your name");
        setLoading(false);
      }
      else if(user.address == ""){
        alert("Enter your address");
        setLoading(false);
      }
      else if(user.email == ""){
        alert("Enter your emailId");
        setLoading(false);
      }
      else if(user.gender == "Choose"){
        alert("Select your gender");
        setLoading(false);
      }
      else if(user.phoneNo.length>10)
      {
        alert("Phone number length not greator than 10");
        setLoading(false);
      }else if(user.phoneNo.length<10){
        alert("Phone number length not less than 10");
        setLoading(false);
      }else if(pass !== conPass){
        e.preventDefault();
        alert("Password and Confirm Password are not match");
        setLoading(false);
      }
      else{
        try 
        {
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          const bool = emailRegex.test(user.email);
          if(!bool){
            alert("Enter correct email id");
            setLoading(false);
            return;
          }
          const profileImg = await generateImg();

          if(!profileImg){
            alert('Failed to upload image. Try again later.');
            setLoading(false);
            return;
          }
            const res = await fetch(`${import.meta.env.VITE_REACT_API_URL}/signup`,{
              method:"POST",
              headers:{
                "Content-type":"application/json"
              },
              body:JSON.stringify({user,profile:profileImg})
            });
            const finalRes = await res.json();
            
            if(finalRes.success){
              setTimeout(()=>{
                setLoading(false);
                navigate("/login");
              })
            }else if(finalRes.fail){
              alert(finalRes.fail);
              await deleteImg();
              setLoading(false);
            }else{
              alert("fail");
              await deleteImg();
              setLoading(false);
            }
        } catch (error) {
          alert("fail error occor");
          console.log(error);
          await deleteImg();
          setLoading(false);
        }
      }
 
  }

  const multiFunction1=(e)=>{
    setPass(e.target.value);
    handleInputs(e);
  }
  const multiFunction2=(e)=>{
    setConPass(e.target.value);
    handleInputs(e);
  }
  return (
    <>
    <div id="mainSignup">
        <div id="profileSignup">
        <div id="profileDivSignup">
            <label htmlFor="profileImgSignup" id='signupLabel'>
              <img src={img} alt="error" id="profilePic"/>
            </label>
            <input type="file" id="profileImgSignup" accept="image/*" onChange={(e)=>handleFile(e.target.files[0])} name='profile'/>
            <div style={{display:"flex",flexDirection:"column"}}>
                <input type="text" name="name" required id="name" placeholder="Enter name" onChange={handleInputs}/>
                <input type="text" name="address" required id="address" placeholder="Enter address" onChange={handleInputs}/>
                <input type="email" name="email" required id="email" placeholder="Enter email Id" onChange={handleInputs}/>
                <select onChange={handleInputs} name='gender' id='genderSignup'>
                  <option>Choose</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
                <input type="number" name="phoneNo" id="mobileNo" placeholder="Enter mobile number" onChange={handleInputs}/>
                <input type="password" name="password" required id="password" placeholder="Enter password" onChange={multiFunction1}/>
                <input type="password" name="confirmPassword" id="conPass" required placeholder="Enter password again" onChange={multiFunction2}/>
                {/* <input type="submit" id="submitSignup" onClick={postData}/> */}
                <button id="submitSignup" onClick={finalSubmit}>Submit</button>
                <span>Already a member?<Link to="/login">Login now</Link></span>
            </div>
        </div>
      </div>
    </div>
    {loading?<Loader/>:null}
    </>
  )
}
