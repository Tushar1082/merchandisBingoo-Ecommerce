import React,{useEffect} from 'react';
import CryptoJS from 'crypto-js';
import "./slider.css";

export default function Slider() {
  const encryptSale50 = CryptoJS.AES.encrypt("sale=50",import.meta.env.VITE_REACT_EncryptKey);

  const imgArr = [
    {
      // img:"images/slider/asus.webp",
      img: "https://firebasestorage.googleapis.com/v0/b/ecommercewebapp-40db9.appspot.com/o/MerchandiseBingoo%2FappOwnData%2Fslider%2Fasus.webp?alt=media&token=57a76325-8d00-4dbc-a9bc-2b81931b1fe5",
      link:`/buyPage?category=laptops&&${encryptSale50.toString()}&&id=16`
    },
    {
     // img:"images/slider/womenSale.webp",
      img: "https://firebasestorage.googleapis.com/v0/b/ecommercewebapp-40db9.appspot.com/o/MerchandiseBingoo%2FappOwnData%2Fslider%2FwomenSale.webp?alt=media&token=8db2c1a9-016e-4e76-96ba-33ec744347f8",
     link:"/category/women"
    },
    {
     // img:"images/slider/menSale.webp",
      img:"https://firebasestorage.googleapis.com/v0/b/ecommercewebapp-40db9.appspot.com/o/MerchandiseBingoo%2FappOwnData%2Fslider%2FmenSale.webp?alt=media&token=7d530fad-44af-453f-b595-687797dd0889",
     link:"/category/men"
    },
    {
      // img:"images/slider/ps5.webp",
      img: "https://firebasestorage.googleapis.com/v0/b/ecommercewebapp-40db9.appspot.com/o/MerchandiseBingoo%2FappOwnData%2Fslider%2Fps5.webp?alt=media&token=d56f02a6-d2a5-4f4f-a542-55446f65b70c",
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
      img: "https://firebasestorage.googleapis.com/v0/b/ecommercewebapp-40db9.appspot.com/o/MerchandiseBingoo%2FappOwnData%2Fslider%2FsilderImagesForMobileView%2Fasus.webp?alt=media&token=e5853d62-139c-491d-91da-e0097d97b389",
      link:`/buyPage?category=laptops&&${encryptSale50.toString()}&&id=16`
    },
    {
     // img:"images/slider/silderImagesForMobileView/womenSale.webp",
      img:"https://firebasestorage.googleapis.com/v0/b/ecommercewebapp-40db9.appspot.com/o/MerchandiseBingoo%2FappOwnData%2Fslider%2FsilderImagesForMobileView%2FwomenSale.webp?alt=media&token=2d1fc8f3-f64a-4a13-b885-97919f9a646a",
     link:"/category/women"
    },
    {
     // img:"images/slider/silderImagesForMobileView/menSale.webp",
      img:"https://firebasestorage.googleapis.com/v0/b/ecommercewebapp-40db9.appspot.com/o/MerchandiseBingoo%2FappOwnData%2Fslider%2FsilderImagesForMobileView%2FmenSale.webp?alt=media&token=cb9d8cb0-fb5f-4b94-a84b-b3f77a7d7c06",
     link:"/category/men"
    },
    {
      // img:"images/slider/silderImagesForMobileView/ps5.webp",
      img: "https://firebasestorage.googleapis.com/v0/b/ecommercewebapp-40db9.appspot.com/o/MerchandiseBingoo%2FappOwnData%2Fslider%2FsilderImagesForMobileView%2Fps5.webp?alt=media&token=4a30feb1-8072-492d-adab-5833e28d38ee",
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
