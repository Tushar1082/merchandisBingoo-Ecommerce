import React,{useEffect} from 'react';
import CryptoJS from 'crypto-js';
import "./slider.css";

export default function SliderPhone() {
  const encryptSale50 = CryptoJS.AES.encrypt("sale=50",import.meta.env.VITE_REACT_EncryptKey);
  const encryptSale40 = CryptoJS.AES.encrypt("sale=40",import.meta.env.VITE_REACT_EncryptKey);
  
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
          <img src="images/slider/asus.webp"
            alt="error" 
            className='slides'
            onClick={()=>window.location.href=`/buyPage?category=laptops&&${encryptSale50.toString()}&&id=16`}
            style={{cursor:"pointer"}}
            />
                      <img src="images/slider/womenSale.webp"
            alt="error" 
            className='slides'
            onClick={()=>window.location.href=`/category/women`}
            style={{cursor:"pointer"}}
            />
                      <img src="images/slider/menSale.webp"
            alt="error" 
            className='slides'
            onClick={()=>window.location.href=`/category/men`}
            style={{cursor:"pointer"}}
            />
                      <img src="images/slider/mobileSale.webp"
            alt="error" 
            className='slides'
            onClick={()=>window.location.href=`buyPage?category=realme&&${encryptSale40.toString()}&&id=6`}
            style={{cursor:"pointer"}}
            />
                      <img src="images/slider/electronicSale.webp"
            alt="error" 
            className='slides'
            onClick={()=>window.location.href='/category/electronics'}
            style={{cursor:"pointer"}}
            />
                      <img src="images/slider/ps5.webp"
            alt="error" 
            className='slides'
            onClick={()=>window.location.href=`/buyPage?category=gamingConsoles&&${encryptSale50.toString()}&&id=11`}
            style={{cursor:"pointer"}}
            />
            <img src="images/slider/laptopSale.webp"
            alt="error" 
            className='slides'
            onClick={()=>window.location.href=`/category/electronics/laptops`}
            style={{cursor:"pointer"}}
            />
          <div id='sliderBtn'>
            <button onClick={prev} className='btn1SP' id='btnRef' >&lt;</button>
            <button onClick={next} className='btn2SP' id='btnRef' >&gt;</button>
          </div>
      </div>
    </div>
  )
}
