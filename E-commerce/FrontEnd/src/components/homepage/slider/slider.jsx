import React,{useEffect} from 'react';
import CryptoJS from 'crypto-js';
import "./slider.css";

export default function SliderPhone() {
  const encryptSale50 = CryptoJS.AES.encrypt("sale=50",import.meta.env.VITE_REACT_EncryptKey);
  const encryptSale40 = CryptoJS.AES.encrypt("sale=40",import.meta.env.VITE_REACT_EncryptKey);

  const imgArr = [
    {
      img:"https://firebasestorage.googleapis.com/v0/b/ecommercewebapp-40db9.appspot.com/o/MerchandiseBingoo%2FsiteOwnData%2Fasus.jpg?alt=media&token=75265768-5dee-44e1-b2da-0e3c8724755f",
      link:`/buyPage?category=laptops&&${encryptSale50.toString()}&&id=16`
    },
    {
     img:"https://firebasestorage.googleapis.com/v0/b/ecommercewebapp-40db9.appspot.com/o/MerchandiseBingoo%2FsiteOwnData%2FwomenSale.png?alt=media&token=25d31ca7-d3f3-4fec-a2e2-2138e6f03b6c",
     link:"/category/women"
    },
    {
     img:"https://firebasestorage.googleapis.com/v0/b/ecommercewebapp-40db9.appspot.com/o/MerchandiseBingoo%2FsiteOwnData%2FmenSale.png?alt=media&token=d8f84f2e-eaf3-46f7-a6b9-f678329f0f33",
     link:"/category/men"
    },
    {
      img:"https://firebasestorage.googleapis.com/v0/b/ecommercewebapp-40db9.appspot.com/o/MerchandiseBingoo%2FsiteOwnData%2FmobileSale.png?alt=media&token=2f7a46f4-7ba3-48df-9a38-6b413da07ebd",
      link:`/buyPage?category=realme&&${encryptSale40.toString()}&&id=6`
    },
    {
      img:"https://firebasestorage.googleapis.com/v0/b/ecommercewebapp-40db9.appspot.com/o/MerchandiseBingoo%2FsiteOwnData%2FelectronicSale.jpg?alt=media&token=c5a30ed9-471b-4b7b-9f4d-fab1ef72fea6",
      link:"/category/electronics"
    },
    {
      img:"https://firebasestorage.googleapis.com/v0/b/ecommercewebapp-40db9.appspot.com/o/MerchandiseBingoo%2FsiteOwnData%2Fps5.jpg?alt=media&token=0c965c87-342c-47e3-bff4-c80045b23d17",
      link:`/buyPage?category=gamingConsoles&&${encryptSale50.toString()}&&id=11`
    },
    {
      img:"https://firebasestorage.googleapis.com/v0/b/ecommercewebapp-40db9.appspot.com/o/MerchandiseBingoo%2FsiteOwnData%2FlaptopSale.png?alt=media&token=e1d7804f-55d5-48e1-a63e-622f21a899f3",
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
};
