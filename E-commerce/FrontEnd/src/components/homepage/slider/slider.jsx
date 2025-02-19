import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import "./slider.css";

export default function SliderPhone() {
  const encryptSale50 = CryptoJS.AES.encrypt(
    "sale=50",
    import.meta.env.VITE_REACT_EncryptKey
  );
  const encryptSale40 = CryptoJS.AES.encrypt(
    "sale=40",
    import.meta.env.VITE_REACT_EncryptKey
  );

  const imgArr = [
    {
      img: "images/slider/asus.jpg",
      link: `/buyPage?category=laptops&&${encryptSale50.toString()}&&id=16`,
    },
    { img: "images/slider/womenSale.png", link: "/category/women" },
    { img: "images/slider/menSale.png", link: "/category/men" },
    {
      img: "images/slider/mobileSale.png",
      link: `/buyPage?category=realme&&${encryptSale40.toString()}&&id=6`,
    },
    { img: "images/slider/electronicSale.jpg", link: "/category/electronics" },
    {
      img: "images/slider/ps5.jpg",
      link: `/buyPage?category=gamingConsoles&&${encryptSale50.toString()}&&id=11`,
    },
    { img: "images/slider/laptopSale.png", link: "/category/electronics/laptops" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  function next() {
    setCurrentIndex((prev) => (prev + 1) % imgArr.length);
  }

  function prev() {
    setCurrentIndex((prev) => (prev - 1 + imgArr.length) % imgArr.length);
  }

  useEffect(() => {
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval); // Clears the interval when unmounted
  }, []);

  return (
    <div style={{ backgroundColor: "#d3d3d34a" }}>
      <div id="mainSlider">
        {imgArr.map((elem, index) => (
          <img
            key={index}
            src={elem.img}
            alt="slider"
            className="slides"
            onClick={() => (window.location.href = elem.link)}
            loading={index === 0 ? "eager" : "lazy"} // First image loads eagerly
            style={{
              cursor: "pointer",
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: "transform 1s ease-in-out",
            }}
          />
        ))}
        <div id="sliderBtn">
          <button onClick={prev} className="btn1SP">&lt;</button>
          <button onClick={next} className="btn2SP">&gt;</button>
        </div>
      </div>
    </div>
  );
}
