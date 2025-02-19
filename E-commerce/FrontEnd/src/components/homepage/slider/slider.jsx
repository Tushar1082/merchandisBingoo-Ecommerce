import React,{useEffect} from 'react'; 
import CryptoJS from 'crypto-js';
import "./slider.css";

export default function SliderPhone() {
  const encryptSale50 = CryptoJS.AES.encrypt("sale=50",import.meta.env.VITE_REACT_EncryptKey);
  const encryptSale40 = CryptoJS.AES.encrypt("sale=40",import.meta.env.VITE_REACT_EncryptKey);

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
      img:"images/slider/mobileSale.png",
      link:`/buyPage?category=realme&&${encryptSale40.toString()}&&id=6`
    },
    {
      img:"images/slider/electronicSale.jpg",
      link:"/category/electronics"
    },
    {
      img:"images/slider/ps5.jpg",
      link:`/buyPage?category=gamingConsoles&&${encryptSale50.toString()}&&id=11`
    },
    {
      img:"images/slider/laptopSale.png",
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
                loading="lazy"
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
    )};
