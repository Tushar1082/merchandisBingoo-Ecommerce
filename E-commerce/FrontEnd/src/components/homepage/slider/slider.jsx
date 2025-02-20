import React, { useEffect, useState } from "react";
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
      img:"https://firebasestorage.googleapis.com/v0/b/ecommercewebapp-40db9.appspot.com/o/MerchandiseBingoo%2FsiteOwnData%2Fasus.webp?alt=media&token=f1d074f8-a3a6-4473-87c4-453058972326",
      link:`/buyPage?category=laptops&&${encryptSale50.toString()}&&id=16`
    },
    {
     img:"https://firebasestorage.googleapis.com/v0/b/ecommercewebapp-40db9.appspot.com/o/MerchandiseBingoo%2FsiteOwnData%2FwomenSale.webp?alt=media&token=721bc0ee-1bc2-4ae8-8a4c-b9182c63654b",
     link:"/category/women"
    },
    {
     img:"https://firebasestorage.googleapis.com/v0/b/ecommercewebapp-40db9.appspot.com/o/MerchandiseBingoo%2FsiteOwnData%2FmenSale.webp?alt=media&token=9872e90d-6fcb-49ec-9b73-2901a0ef2d94",
     link:"/category/men"
    },
    {
      img:"https://firebasestorage.googleapis.com/v0/b/ecommercewebapp-40db9.appspot.com/o/MerchandiseBingoo%2FsiteOwnData%2FmobileSale.webp?alt=media&token=82f4672f-f9f1-4a70-ae49-55cf421839cf",
      link:`/buyPage?category=realme&&${encryptSale40.toString()}&&id=6`
    },
    {
      img:"https://firebasestorage.googleapis.com/v0/b/ecommercewebapp-40db9.appspot.com/o/MerchandiseBingoo%2FsiteOwnData%2FelectronicSale.webp?alt=media&token=a3af6968-b7fc-4ff3-b27e-1cf32fdd6381",
      link:"/category/electronics"
    },
    {
      img:"https://firebasestorage.googleapis.com/v0/b/ecommercewebapp-40db9.appspot.com/o/MerchandiseBingoo%2FsiteOwnData%2Fps5.webp?alt=media&token=1fb58f6e-c1a2-4f45-a40d-a77a0dcda742",
      link:`/buyPage?category=gamingConsoles&&${encryptSale50.toString()}&&id=11`
    },
    {
      img:"https://firebasestorage.googleapis.com/v0/b/ecommercewebapp-40db9.appspot.com/o/MerchandiseBingoo%2FsiteOwnData%2FlaptopSale.webp?alt=media&token=8e7ae06b-734a-4ae0-8432-b02396c1b580",
      link:"/category/electronics/laptops"
    }];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState(Array(imgArr.length).fill(false));

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => {
      const updatedImages = [...prev];
      updatedImages[index] = true;
      return updatedImages;
    });
  };

  const next = () => {
    if (currentIndex < imgArr.length - 1 && loadedImages[currentIndex + 1]) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const autoSlide = setInterval(() => {
      next();
    }, 4000);

    return () => clearInterval(autoSlide);
  }, [currentIndex, loadedImages]);

  return (
    <div style={{ backgroundColor: "#d3d3d34a" }}>
      <div id="mainSlider">
        {imgArr.map((elem, index) => (
          <img
            key={index}
            src={elem.img}
            alt="error"
            className="slides"
            onClick={() => window.location.href = elem.link}
            style={{
              cursor: "pointer",
              display: index === currentIndex ? "block" : "none",
            }}
            onLoad={() => handleImageLoad(index)}
          />
        ))}

        <div id="sliderBtn">
          <button onClick={prev} className="btn1SP" id="btnRef">
            &lt;
          </button>
          <button onClick={next} className="btn2SP" id="btnRef">
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
