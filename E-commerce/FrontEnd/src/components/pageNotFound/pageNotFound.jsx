import React from 'react'
import NotFound from "/images/404 Not Found.jpg";

export default function PageNotFound() {
  return (
    <div style={{height:"100vh"}}>
      <img 
        src={NotFound}
        alt="error"
        style={{
          width:"100%",
          height:"100%",
          objectFit:"contain"
        }}
        />
    </div>
  )
}
