import React, { useEffect, useState,useRef } from 'react';
import "./events.css";
import { Link } from 'react-router-dom';
// import lehengaImg from '/images/events/7.webp';
// import lehengaOff from '/images/events/lehengaOff.webp';
// import tShirtImg from '/images/events/cloth.webp';
// import tShirtOff from '/images/events/t-shirtOff.webp';
// import sareeImg from '/images/events/4.webp';
// import sareeOff from '/images/events/sareeOff.webp';
// import blazerImg from '/images/events/5.webp';
// import blazerOff from '/images/events/blazarOff.webp';
// import bookImg from '/images/events/6.webp';
// import bookOff from '/images/events/bookOff.webp';

// images for mobile view
import lehengaImgMobileView from '/images/events/mobileView/7.webp';
import lehengaOffMobileView from '/images/events/mobileView/lehengaOff.webp';
import tShirtImgMobileView from '/images/events/mobileView/cloth.webp';
import tShirtOffMobileView from '/images/events/mobileView/t-shirtOff.webp';
import sareeImgMobileView from '/images/events/mobileView/4.webp';
import sareeOffMobileView from '/images/events/mobileView/sareeOff.webp';
import blazerImgMobileView from '/images/events/mobileView/5.webp';
import blazerOffMobileView from '/images/events/mobileView/blazarOff.webp';
import bookImgMobileView from '/images/events/mobileView/6.webp';
import bookOffMobileView from '/images/events/mobileView/bookOff.webp';
import CryptoJS from 'crypto-js';

function OtherEvent() {
  const mainRef = useRef();
  const divImgRefs = useRef([]);

  function isElementOnScreen(element) {
    var rect = element.getBoundingClientRect();
    var windowHeight = window.innerHeight || document.documentElement.clientHeight;
    return rect.top < windowHeight && rect.bottom > 0;
  }

  function eventsTemplateImg() {
    const element = mainRef.current;

    window.addEventListener("scroll", () => {
      if (isElementOnScreen(element)) {
        divImgRefs.current.forEach((divImg) => {
          if (divImg) {
            divImg.style.opacity = "1";
            divImg.style.visibility = "visible";
          }
        });
      } else {
        divImgRefs.current.forEach((divImg) => {
          if (divImg) {
            divImg.style.opacity = "0";
            divImg.style.visibility = "hidden";
          }
        });
      }
    });
  }

  useEffect(() => {
    eventsTemplateImg();
  }, []);

  function otherEventTemplate(str) {
    const routes = {
      lehenga: "/category/women/lehengas",
      tShirt: "/category/men/tShirts",
      saree: "/category/women/sarees",
      blazer: "/category/men/blazers",
    };
    window.location.href = routes[str] || "/";
  }

  return (
      <div id="mainOtherEvent">
      <div ref={mainRef}>
        <div id="firstEventMain">
          <div id="firstEvent" onClick={() => otherEventTemplate("lehenga")}>
            <img src="images/events/7.webp" alt="error" />
            <img
              src="images/events/lehengaOff.webp"
              alt="error"
              ref={(el) => (divImgRefs.current[0] = el)}
              className="fade-image"
            />
          </div>
          <div id="secondEvent" onClick={() => otherEventTemplate("tShirt")}>
            <img src="images/events/cloth.webp" alt="error" />
            <img
              src="images/events/t-shirtOff.webp"
              alt="error"
              ref={(el) => (divImgRefs.current[1] = el)}
              className="fade-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Events() {
  const images=["/images/events/1.webp","/images/events/2.webp","/images/events/3.webp","/images/events/game.webp"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const sliderInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds

    return () => {
      clearInterval(sliderInterval);
    };
  }, [currentIndex]);

  const nextSlide = () => {
    setTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setTransitioning(false);
    }, 500); // Transition duration is 0.5 seconds
  };

  // const prevSlide = () => {
  //   setTransitioning(true);
  //   setTimeout(() => {
  //     setCurrentIndex((prevIndex) =>
  //       (prevIndex - 1 + images.length) % images.length
  //     );
  //     setTransitioning(false);
  //   }, 500); // Transition duration is 0.5 seconds
  // };
  function handleChange(index){
    setTransitioning(true);
    setTimeout(()=>{
      setCurrentIndex(index);
      setTransitioning(false);
    },500)
  }
  function eventTemplate(currentIndex){
    switch(currentIndex){
      case 0:
        window.location.href="/category/women/jackets";
      break;
      case 1:
        window.location.href="/category/men/jackets";
      break;
      case 2:
        window.location.href="/category/women/tops";
      break;
      case 3:
        window.location.href=`/buyPage${navigateTo("gamingConsoles",50,2)}`;
        break;
      default:
        window.location.href="/";
    }
  }
  function navigateTo(category,sale,id){
    const encSale = "sale="+sale.toString();
    const encryS = CryptoJS.AES.encrypt(encSale,import.meta.env.VITE_REACT_EncryptKey);
    return `?category=${category}&&${encryS.toString()}&&id=${id}`;
  }
  return (
    <>
    <div id='mainEvent'>
      <div 
      id='firstEventE'
      onClick={()=>window.location.href="/category/book"}
      >
        <img src="images/events/6.webp" alt="error"/>
        <img
          src="images/events/bookOff.webp"
          alt="error"
        />
      </div>
      <div className='otherEvent'>
         <div id='otherEvent1'>
            <div id='otherEventDiv1' >
            <Link to={{pathname:"/buyPage",search:navigateTo("laptops",50,13)}}>
              <div>
                <h4>APPLE 2023 MacBook Pro M2 Max</h4>
                <p>from ₹2,85,490 at 7%off</p>
              </div>
            </Link>
            </div>
            <div id='otherEventDiv2' >
            <Link to={{pathname:"/buyPage",search:navigateTo("televisions",50,2)}}>
              <div>
                <h4>Kodak 106 cm (42 inches) Full HD</h4>
                <p> from ₹15,999</p>
              </div>
            </Link>
            </div>
          </div>

          <div id='otherEvent2'>
            <div id='otherEventDiv3' >
            <Link to={{pathname:"/buyPage",search:navigateTo("speakers",50,9)}}>
              <div>
                  <h4>Alexa with Alexa Assistant Smart Speaker  (Black)</h4>
                  <p> from ₹4,450</p>
               </div>
            </Link>
            </div>
            <div id='otherEventDiv4' >
            <Link to={{pathname:"/buyPage",search:navigateTo("headphones",50,5)}}>
              <div>
                <h4>boAt Immortal 131 with Beast Mode, 40 Hours Playback</h4>
                <p>from ₹13,999</p>
              </div>
            </Link>
            </div>
         </div> 
      </div>
    </div>
    <OtherEvent/>
    </>
  );
}
