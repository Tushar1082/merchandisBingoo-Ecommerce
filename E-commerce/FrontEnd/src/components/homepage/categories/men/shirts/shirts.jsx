import React,{useState,useEffect} from 'react'
import ProductPage from '../../../productPage/productPage';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

export default function ShirtMen() {
  const [data,setData] = useState();
  const navigate = useNavigate();

  async function callData(){
    const token = Cookies.get("token");
    const user = localStorage.getItem("MDB_USER_EMAIL_ID");

    const res = await fetch(`${import.meta.env.VITE_REACT_API_URL}/category/men/shirts?user=${user}`,{
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
      const {shirts} = finalRes;
      setData(shirts);
    }
  }
  useEffect(()=>{
    callData();
  },[])
return (
  <ProductPage data={data}/>
)
}