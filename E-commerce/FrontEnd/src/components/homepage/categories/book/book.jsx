import React,{useState} from 'react';
import CategoryPage from '../categoryPage';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

export default function Book() {
  const SlidesData=[
    {
      img:"1.jpg",
      link:"/category/book/books"
    },
    {
      img:"2.jpeg",
      link:"/category/book/books"
    },
    {
      img:"3.jpg",
      link:"/category/book/books"
    }
  ]
  const [data,setData] = useState();
  const navigate = useNavigate();

  async function callData(){
    const token = Cookies.get("token");
    const user = localStorage.getItem("MDB_USER_EMAIL_ID");

    const res = await fetch(`${import.meta.env.VITE_REACT_API_URL}/category/book?user=${user}`,{
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
    const {book} = finalRes;
      if(book){
        setData(book);
      }else if(finalRes.msg){
        console.log("msg",finalRes.msg);
      }else if(finalRes.e){
        console.log("error",finalRes.e);
      }
    }
  }
  return(
    <>
    <CategoryPage data={data} SlidesData={SlidesData} callData={callData} imgFileName={"book"}/>
    </>
  )
}