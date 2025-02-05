import React,{useState} from 'react';
import CategoryPage from '../categoryPage';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

export default function Bags() {
  const SlidesData=[
    {
      img:"1.png",
      link:"/category/bags/womenBags"
    },
    {
      img:"2.png",
      link:"/category/bags/menBags"
    }
  ]
  const [data,setData] = useState();
  const navigate = useNavigate();
  
  async function callData(){
    const token = Cookies.get("token");
    // const user = localStorage.getItem("loginedUser");
    const user = localStorage.getItem("MDB_USER_EMAIL_ID");

    const res = await fetch(`${import.meta.env.VITE_REACT_API_URL}/category/bags?user=${user}`,{
      method: "GET",
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
      const {bags} = finalRes;
      setData(bags);
    }
  }
  return(
    <>
    <CategoryPage data={data} SlidesData={SlidesData} callData={callData} imgFileName={"bag"}/>
    </>
  )

}
