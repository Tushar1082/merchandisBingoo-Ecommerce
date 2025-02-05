import React from 'react'
import unauthorized from "/images/unauthorized.jpg";

export default function UnauthorizedUser() {
  return (
    <div style={{height:"100vh"}}>
    <img 
      src={unauthorized}
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
