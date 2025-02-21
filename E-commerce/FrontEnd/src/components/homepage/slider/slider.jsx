import React,{useEffect} from 'react';
import CryptoJS from 'crypto-js';
import "./slider.css";

export default function Slider() {
  const encryptSale50 = CryptoJS.AES.encrypt("sale=50",import.meta.env.VITE_REACT_EncryptKey);

  const imgArr = [
    {
      img:"images/slider/asus.jpg",
      link:`/buyPage?category=laptops&&${encryptSale50.toString()}&&id=16`
    },
    {
     img:"images/slider/womenSale.png",
     link:"/category/women"
    },
    {
     img:"images/slider/menSale.png",
     link:"/category/men"
    },
    {
      img:"images/slider/ps5.jpg",
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
      img:"images/slider/silderImagesForMobileView/asus.jpg",
      link:`/buyPage?category=laptops&&${encryptSale50.toString()}&&id=16`
    },
    {
     img:"images/slider/silderImagesForMobileView/womenSale.jpeg",
     link:"/category/women"
    },
    {
     img:"images/slider/silderImagesForMobileView/menSale.jpeg",
     link:"/category/men"
    },
    {
      img:"images/slider/silderImagesForMobileView/ps5.jpg",
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
