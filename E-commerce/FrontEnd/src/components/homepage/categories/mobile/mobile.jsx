import React,{useState} from 'react';
import CategoryPage from '../categoryPage';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

export default function Mobile() {
  const SlidesData=[
    {
      img:"1.jpg",
      link:"/"
    },
    {
      img:"2.jpg",
      link:"/category/mobile/iPhone"
    }
  ]
  const [data,setData] = useState();
  const navigate = useNavigate();
  
  async function callData(){
    const token = Cookies.get("token");
    const user = localStorage.getItem("MDB_USER_EMAIL_ID");

    const res = await fetch(`${import.meta.env.VITE_REACT_API_URL}/category/mobile?user=${user}`,{
      headers:{
        'authorization': `Bearer ${token}`,
      }
    });
    const finalRes = await res.json();
    
    if(finalRes.notSignUp){
      navigate("/login");
    }
    if(finalRes.Unauthorized){
      navigate("/unauthorize");
    }else{
      const {mobile} = finalRes;
      if(mobile){
        setData(mobile);
      }else if(finalRes.msg){
        console.log("msg",finalRes.msg);
      }else if(finalRes.e){
        console.log("error",finalRes.e);
      }
    }
  }
  return(
    <>
    <CategoryPage data={data} SlidesData={SlidesData} callData={callData} imgFileName={"mobile"}/>
    </>
  )
}