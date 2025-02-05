import React,{useState} from 'react';
import CategoryPage from '../categoryPage';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

export default function Electronics() {
  const SlidesData=[
    {
      img:"1.png",
      link:"/"
    },
    {
      img:"2.jpg",
      link:"/category/electronics"
    },
    {
      img:"3.png",
      link:"/category/electronics/laptops"
    },
    {
      img:"4.jpg",
      link:"/"
    },
    {
      img:"5.jpg",
      link:"/"
    }
  ]
  const [data,setData] = useState();
  const navigate = useNavigate();
  
  async function callData(){
    const token = Cookies.get("token");
    const user = localStorage.getItem("MDB_USER_EMAIL_ID");

    const res = await fetch(`${import.meta.env.VITE_REACT_API_URL}/category/electronics?user=${user}`,{
      headers:{
        'authorization': `Bearer ${token}`,
      }
    });
    const finalRes = await res.json();
    const {electronics} = finalRes;
    
    if(finalRes.notSignUp){
      navigate("/login");
    }
    if(finalRes.Unauthorized){
      navigate("/unauthorize");
    }else{
      if(electronics){
        setData(electronics);
      }else if(finalRes.msg){
        console.log("msg",finalRes.msg);
      }else if(finalRes.e){
        console.log("error",finalRes.e);
      }
    }
  }
  return(
    <>
    <CategoryPage data={data} SlidesData={SlidesData} callData={callData} imgFileName={"electronics"}/>
    </>
  )
}