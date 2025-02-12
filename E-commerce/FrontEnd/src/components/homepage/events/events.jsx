import React, { useEffect, useState,useRef } from 'react';
import "./events.css";
import { Link } from 'react-router-dom';
import lehengaImg from '/images/events/7.jpg';
import lehengaOff from '/images/events/lehengaOff.png';
import tShirtImg from '/images/events/cloth.jpg';
import tShirtOff from '/images/events/t-shirtOff.png';
import sareeImg from '/images/events/4.jpg';
import sareeOff from '/images/events/sareeOff.png';
import blazerImg from '/images/events/5.jpg';
import blazerOff from '/images/events/blazarOff.png';
import bookImg from '/images/events/6.jpg';
import bookOff from '/images/events/bookOff.png';
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
      book: "/category/book",
    };
    window.location.href = routes[str] || "/";
  }

  return (
      <div id="mainOtherEvent">
      <div ref={mainRef}>
        <div style={{ display: "flex", alignItems: "center",gap: "1rem", flexDirection:'column'}}>
          <div id="firstEvent" onClick={() => otherEventTemplate("lehenga")}>
            <img src="images/events/7.jpg" alt="error" />
            <img
              src="images/events/lehengaOff.png"
              alt="error"
              ref={(el) => (divImgRefs.current[0] = el)}
              className="fade-image"
            />
          </div>
          <div id="secondEvent" onClick={() => otherEventTemplate("tShirt")}>
            <img src="images/events/cloth.jpg" alt="error" />
            <img
              src="images/events/t-shirtOff.png"
              alt="error"
              ref={(el) => (divImgRefs.current[1] = el)}
              className="fade-image"
            />
          </div>
        </div>
        <div id="firstEventMain">
          <div className="events_S" onClick={() => otherEventTemplate("saree")}>
            <img src="images/events/4.jpg" alt="error" />
            <img
              src="images/events/sareeOff.png"
              alt="error"
              ref={(el) => (divImgRefs.current[2] = el)}
              className="fade-image"
            />
          </div>
          <div className="events_S" onClick={() => otherEventTemplate("blazer")}>
            <img src="images/events/5.jpg" alt="error" />
            <img
              src="images/events/blazarOff.png"
              alt="error"
              ref={(el) => (divImgRefs.current[3] = el)}
              className="fade-image"
              style={{ top: "30%" }}
            />
          </div>
          <div className="events_S" onClick={() => otherEventTemplate("book")}>
            <img src="images/events/6.jpg" alt="error" />
            <img
              src="images/events/bookOff.png"
              alt="error"
              ref={(el) => (divImgRefs.current[4] = el)}
              className="fade-image"
              style={{ top: "52%", left: "50%", transform: "translate(-50%,-50%)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}


export default function Events() {
  const images=["/images/events/1.jpg","/images/events/2.png","/images/events/3.jpg","/images/events/game.jpg"];
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
      <div className={`sliderEvent ${isTransitioning ? 'transitioning' : ''}`} >
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="sliderImgEvent"
          onClick={()=>eventTemplate(currentIndex)}
        />
        <div className='dotBtnEvent'>
          {images.map((elem,index)=>(
            <button key ={index} onClick={()=>handleChange(index)}></button>
          ))}
        </div>
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
    <OtherEventPhone/>
    </>
  );
}
function OtherEventPhone(){
  const mainRef = useRef();
  const divImgRef1 = useRef();
  const divImgRef2 = useRef();
  const divImgRef3 = useRef();
  const divImgRef4 = useRef();
  const divImgRef5 = useRef();

  function isElementOnScreen(element) {
    var rect = element.getBoundingClientRect();
    var windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    var windowWidth = (window.innerWidth || document.documentElement.clientWidth);
  
    // Check if the element is within the viewport
    return (
      (rect.top <= windowHeight) &&
      ((rect.top + rect.height) >= 0) &&
      (rect.left <= windowWidth) &&
      ((rect.left + rect.width) >= 0)
    );
}

function eventsTemplateImg(){
const element = mainRef.current;
const divImg1 = divImgRef1.current;
const divImg2 = divImgRef2.current;
const divImg3 = divImgRef3.current;
const divImg4 = divImgRef4.current;
const divImg5 = divImgRef5.current;

if(element){
  window.addEventListener('scroll',()=>{
    if(isElementOnScreen(element)){
      divImg1.style.display = "block";
      divImg2.style.display = "block";
      divImg3.style.display = "block";
      divImg4.style.display = "block";
      divImg5.style.display = "block";

    }else{
      divImg1.style.display = "none";
      divImg2.style.display = "none";
      divImg3.style.display = "none";
      divImg4.style.display = "none";
      divImg5.style.display = "none";
    }
  })
}
}
useEffect(()=>{
  eventsTemplateImg();
},[])

  return(
    <div id='mainOEP' ref={mainRef}>
      <div id='lehengaOEP' ref={divImgRef1}>
        <img src={lehengaImg} alt="Error" />
        <img src={lehengaOff} alt="Error" />
      </div>
      <div id='tShirtOEP' ref={divImgRef2}>
        <img src={tShirtImg} alt="error" />
        <img src={tShirtOff} alt="error" />
      </div>
      <div id='sareeOEP' ref={divImgRef3}>
        <img src={sareeImg} alt="error" />
        <img src={sareeOff} alt="error" />
      </div>
      <div id='blazerOEP' ref={divImgRef4}>
        <img src={blazerImg} alt="error" />
        <img src={blazerOff} alt="error" />
      </div>
      <div id='bookOEP' ref={divImgRef5}>
        <img src={bookImg} alt="error" />
        <img src={bookOff} alt="error" />
      </div>
    </div>
  )
}
