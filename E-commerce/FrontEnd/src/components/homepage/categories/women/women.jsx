import React,{useEffect, useState} from 'react';
import CategoryPage from '../categoryPage';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import "./women.css";


export default function Women() {
  const navigate = useNavigate();

  const SlidesData=[
    {
      img:"1.jpg",
      link:"/category/women/tops"
    }
    ,{
      img:"2.png",
      link:"/category/women/shirts"
    }
    ,{
      img:"3.jpg",
      link:"/category/women/sarees"
    }
    ,{
      img:"4.jpg",
      link:"/category/women/jackets"
    }
    ,{
      img:"5.jpg",
      link:"/category/women/lehengas"
    }
  ]
  const [data,setData] = useState();

  async function callData(){
    const token = Cookies.get("token");
    const user = localStorage.getItem("MDB_USER_EMAIL_ID");

    const res = await fetch(`${import.meta.env.VITE_REACT_API_URL}/category/women?user=${user}`,{
      method:"GET",
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
      const {women} = finalRes;
      setData(women);
    }
  }
  return(
    <CategoryPage data={data} SlidesData={SlidesData} callData={callData} imgFileName={"women"}/>
  )
}
