import React,{useEffect} from 'react';
import CryptoJS from 'crypto-js';
import "./slider.css";

export default function Slider() {
  const encryptSale50 = CryptoJS.AES.encrypt("sale=50",import.meta.env.VITE_REACT_EncryptKey);

  const imgArr = [
    {
      // img:"images/slider/asus.webp",
      img: "https://firebasestorage.googleapis.com/v0/b/ecommercewebapp-40db9.appspot.com/o/MerchandiseBingoo%2FappOwnData%2Fasus.webp?alt=media&token=47369da5-b52e-4ef6-806f-9e11e2f7ccb8",
      link:`/buyPage?category=laptops&&${encryptSale50.toString()}&&id=16`
    },
    {
     img:"images/slider/womenSale.webp",
     link:"/category/women"
    },
    {
     img:"images/slider/menSale.webp",
     link:"/category/men"
    },
    {
      img:"images/slider/ps5.webp",
      link:`/buyPage?category=gamingConsoles&&${encryptSale50.toString()}&&id=11`
    }
  ];

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
              <img src={elem.img}
                alt="error" 
                key={index} 
                className='slides'
                onClick={()=>window.location.href=elem.link}
                style={{cursor:"pointer"}}
                        loading={index === 0 ? "eager" : "lazy"} 
                fetchpriority={index === 0?"high":"low"}
                />
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
export function SliderPhone() {
  const encryptSale50 = CryptoJS.AES.encrypt("sale=50",import.meta.env.VITE_REACT_EncryptKey);
  
  const imgArrMobileView = [
    {
      // img:"images/slider/silderImagesForMobileView/asus.webp",
      img: "https://firebasestorage.googleapis.com/v0/b/ecommercewebapp-40db9.appspot.com/o/MerchandiseBingoo%2FappOwnData%2Fasus%20-%20mobile.webp?alt=media&token=8ba84bc1-c363-4ec8-90f9-280658971e7f",
      link:`/buyPage?category=laptops&&${encryptSale50.toString()}&&id=16`
    },
    {
     img:"images/slider/silderImagesForMobileView/womenSale.webp",
     link:"/category/women"
    },
    {
     img:"images/slider/silderImagesForMobileView/menSale.webp",
     link:"/category/men"
    },
    {
      img:"images/slider/silderImagesForMobileView/ps5.webp",
      link:`/buyPage?category=gamingConsoles&&${encryptSale50.toString()}&&id=11`
    }
  ];

  const slides = document.getElementsByClassName("slidesMobileView");
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
      <div id='mainSliderMobile'>
          {imgArrMobileView.map((elem,index)=>(
              <img src={elem.img}
                alt="error" 
                key={index} 
                className='slidesMobileView'
                onClick={()=>window.location.href=elem.link}
                style={{cursor:"pointer"}}
                        loading={index === 0 ? "eager" : "lazy"} 
                                fetchpriority={index === 0?"high":"low"}
                />
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
