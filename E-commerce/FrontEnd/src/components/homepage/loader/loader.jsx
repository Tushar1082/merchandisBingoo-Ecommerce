import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import "./loader.css";
import loadingVideo from "/images/loading.mp4";

export default function Loader({value}){
  useEffect(()=>{
    if(value){
      return;
    }
    const disableInteractions = (event)=>{
      event.preventDefault();
      event.stopPropagation();
    }
    document.body.addEventListener('click',disableInteractions, { capture: true });
    // document.body.style.overflow = "hidden";

    return () => {
      // Re-enable interactions when the Loader is unmounted
      document.body.removeEventListener('click', disableInteractions, { capture: true });
      document.body.style.overflow = ''; // Optional: Restore scrolling
    };
  },[])
  return(
    <div id='loadingDiv' className={value?"loaderClass":''}>
        <video autoPlay muted src={loadingVideo} width="200px" loop alt="error" />
        <h3>Loading...</h3>
      </div>
  )
}
