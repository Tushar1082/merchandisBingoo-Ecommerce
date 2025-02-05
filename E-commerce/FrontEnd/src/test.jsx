import React,{useEffect, useState} from 'react';
import { fireDB } from '../firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export default function Test() {
  const [img,setImg] = useState();
  const [imgUrl,setImgUrl] = useState([]);
  
  useEffect(()=>{
    if(img){
      const imgRef = ref(fireDB,`users/${user}/${img.name}`);
      uploadBytes(imgRef,img).then(value=>{
        getDownloadURL(value.ref).then(url=>(
          setImgUrl(data=>[...data,url])
        ))
      })
    }
  },[img])
  useEffect(()=>{
    if(imgUrl){

    }
  },[imgUrl])
  return (
    <div style={{margin:"20px"}}>
        <div style={{textAlign:"center"}}>
          <label htmlFor="fileUpload">
            <img src="images/profile.png" alt="error" height="200px" />
          </label>

          <input type="file" id='fileUpload' hidden onChange={(e)=>setImg(e.target.files[0])} />
        </div>
    </div>
  )
}