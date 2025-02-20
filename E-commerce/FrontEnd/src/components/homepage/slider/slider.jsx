import React,{useEffect} from 'react';
import CryptoJS from 'crypto-js';
import "./slider.css";

export default function SliderPhone() {
  const encryptSale50 = CryptoJS.AES.encrypt("sale=50",import.meta.env.VITE_REACT_EncryptKey);
  const encryptSale40 = CryptoJS.AES.encrypt("sale=40",import.meta.env.VITE_REACT_EncryptKey);

  const imgArr = [
    {
      img:"https://firebasestorage.googleapis.com/v0/b/ecommercewebapp-40db9.appspot.com/o/MerchandiseBingoo%2FsiteOwnData%2Fasus.jpeg?alt=media&token=0cf121f5-eba3-43c2-8834-9c722a763334",
      link:`/buyPage?category=laptops&&${encryptSale50.toString()}&&id=16`
    },
    {
     img:"https://firebasestorage.googleapis.com/v0/b/ecommercewebapp-40db9.appspot.com/o/MerchandiseBingoo%2FsiteOwnData%2FwomenSale.jpeg?alt=media&token=edca4567-e3f3-479d-a52a-32f143c194da",
     link:"/category/women"
    },
    {
     img:"https://firebasestorage.googleapis.com/v0/b/ecommercewebapp-40db9.appspot.com/o/MerchandiseBingoo%2FsiteOwnData%2FmenSale.png?alt=media&token=f49213a2-e83e-453a-b1ec-97176aa7cf5c",
     link:"/category/men"
    },
    {
      img:"https://firebasestorage.googleapis.com/v0/b/ecommercewebapp-40db9.appspot.com/o/MerchandiseBingoo%2FsiteOwnData%2FmobileSale.jpeg?alt=media&token=3585cb76-c7dc-4059-adbe-0dc9330f7c72",
      link:`/buyPage?category=realme&&${encryptSale40.toString()}&&id=6`
    },
    {
      img:"https://firebasestorage.googleapis.com/v0/b/ecommercewebapp-40db9.appspot.com/o/MerchandiseBingoo%2FsiteOwnData%2FelectronicSale.jpg?alt=media&token=6e0e0901-4710-41d3-a654-79841ccb088b",
      link:"/category/electronics"
    },
    {
      img:"https://firebasestorage.googleapis.com/v0/b/ecommercewebapp-40db9.appspot.com/o/MerchandiseBingoo%2FsiteOwnData%2Fps5.jpg?alt=media&token=25636f9d-4b07-45fb-9018-2077bd62601e",
      link:`/buyPage?category=gamingConsoles&&${encryptSale50.toString()}&&id=11`
    },
    {
      img:"https://firebasestorage.googleapis.com/v0/b/ecommercewebapp-40db9.appspot.com/o/MerchandiseBingoo%2FsiteOwnData%2FlaptopSale.png?alt=media&token=1dccb522-890b-4fb9-87c6-ff87f6f7d253",
      link:"/category/electronics/laptops"
    }];
  
  const slides = document.getElementsByClassName("slides");
  let count=0;

  function slideImg(){
    for(let i=0;i<slides.length;i++){
      slides[i].style.transform = `translateX(-${count*100}%)`;
    }
  }
  function next(){
    if(count<slides.length-1){
      count++;
      slideImg();
    }else if(count===slides.length-1){
      while(count>=0){
        count--;
        slideImg();
      }
    }
  }
  function prev(){
    if(count>0){
      count--;
      slideImg();
    }
  }
  function autoSide(){
    setInterval(()=>{
      next()
    },4000)
  }
  useEffect(()=>{
    for(let i=0;i<slides.length;i++){
        slides[i].style.left= `${i*100}%`;
      }
      autoSide();
  },[])
  
  return (
    <div style={{backgroundColor:'#d3d3d34a'}}>
      <div id='mainSlider'>
          {imgArr.map((elem,index)=>(
            <>
              <img src={elem.img}
                alt="error" 
                key={index} 
                className='slides'
                onClick={()=>window.location.href=elem.link}
                style={{cursor:"pointer"}}
                />
            </>
          ))
          }
          <div id='sliderBtn'>
            <button onClick={prev} className='btn1SP' id='btnRef' >&lt;</button>
            <button onClick={next} className='btn2SP' id='btnRef' >&gt;</button>
          </div>
      </div>
    </div>
  )
}
