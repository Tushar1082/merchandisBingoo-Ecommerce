import React,{useState} from 'react';
import CategoryPage from '../categoryPage';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

export default function Men() {
  const SlidesData=[
    {
      img:"1.png",
      link:"/category/men"
    },
    {
      img:"2.png",
      link:"/category/men/jackets"
    },
    {
      img:"3.jpg",
      link:"/category/men/blazers"
    },
    {
      img:"4.jpg",
      link:"/category/men/tShirts"
    }
  ]
  const [data,setData] = useState();
  const navigate = useNavigate();
  
  async function callData(){
    const token = Cookies.get("token");
    const user = localStorage.getItem("MDB_USER_EMAIL_ID");

    const res = await fetch(`${import.meta.env.VITE_REACT_API_URL}/category/men?user=${user}`,{
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
      const {men} = finalRes;
      setData(men);
    } 
   }

  return(
    <>
    <CategoryPage data={data} SlidesData={SlidesData} callData={callData} imgFileName={"men"}/>
    </>
  )
}