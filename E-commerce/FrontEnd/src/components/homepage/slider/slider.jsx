import React, { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';
import "./slider.css";

export default function SliderPhone() {
  const encryptSale50 = CryptoJS.AES.encrypt("sale=50", import.meta.env.VITE_REACT_EncryptKey);
  const encryptSale40 = CryptoJS.AES.encrypt("sale=40", import.meta.env.VITE_REACT_EncryptKey);

  const imgArr = [
    { img: "images/slider/asus.webp", link: `/buyPage?category=laptops&&${encryptSale50.toString()}&&id=16` },
    { img: "images/slider/womenSale.webp", link: "/category/women" },
    { img: "images/slider/menSale.webp", link: "/category/men" },
    { img: "images/slider/mobileSale.webp", link: `/buyPage?category=realme&&${encryptSale40.toString()}&&id=6` },
    { img: "images/slider/electronicSale.webp", link: "/category/electronics" },
    { img: "images/slider/ps5.webp", link: `/buyPage?category=gamingConsoles&&${encryptSale50.toString()}&&id=11` },
    { img: "images/slider/laptopSale.webp", link: "/category/electronics/laptops" }
  ];

  const [loadedImages, setLoadedImages] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const loadImages = async () => {
      const promises = imgArr.map(imgObj => {
        return new Promise(resolve => {
          const img = new Image();
          img.src = imgObj.img;
          img.onload = () => resolve(imgObj.img);
        });
      });
      const loaded = await Promise.all(promises);
      setLoadedImages(loaded);
    };

    loadImages();
  }, []);

  useEffect(() => {
    const slides = document.getElementsByClassName("slides");
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.left = `${i * 100}%`;
    }
    const interval = setInterval(() => {
      next();
    }, 4000);
    return () => clearInterval(interval);
  }, [loadedImages]);

  function slideImg() {
    const slides = document.getElementsByClassName("slides");
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.transform = `translateX(-${count * 100}%)`;
    }
  }

  function next() {
    setCount(prevCount => {
      const newCount = prevCount < imgArr.length - 1 ? prevCount + 1 : 0;
      slideImg();
      return newCount;
    });
  }

  function prev() {
    setCount(prevCount => {
      const newCount = prevCount > 0 ? prevCount - 1 : imgArr.length - 1;
      slideImg();
      return newCount;
    });
  }

  return (
    <div style={{ backgroundColor: '#d3d3d34a' }}>
      <div id='mainSlider'>
        {loadedImages.length === imgArr.length ? (
          imgArr.map((elem, index) => (
            <img
              src={elem.img}
              alt="error"
              key={index}
              className='slides'
              onClick={() => window.location.href = elem.link}
              style={{ cursor: "pointer" }}
            />
          ))
        ) : (
          <p>Loading images...</p>
        )}
        <div id='sliderBtn'>
          <button onClick={prev} className='btn1SP' id='btnRef'>&lt;</button>
          <button onClick={next} className='btn2SP' id='btnRef'>&gt;</button>
        </div>
      </div>
    </div>
  );
}
