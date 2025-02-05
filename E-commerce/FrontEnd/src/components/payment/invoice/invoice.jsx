import React, { useRef, useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import "./invoice.css";
import Loader from "../../homepage/loader/loader";
import { fireDB } from "../../../../firebaseConfig";
import { deleteObject, getDownloadURL,ref,uploadBytes } from "firebase/storage";
import logo from "/images/navbar/logo.png";

export default function Invoice({invoiceNo,totalAmount,orderId}) {
  const {rating,userEmail, orderL,selectedAdd} = useSelector((state)=>state.payment);
  const [loading,setLoading] = useState();
  const [data,setData] = useState(orderL);
  const invoiceRef = useRef();


  const handleInvoicePdf = useReactToPrint({
    content: () => invoiceRef.current,
    documentTitle: "Invoice",
  });
  async function savePdfDB() {
    const content = invoiceRef.current;

    if(content){
      setLoading(true);
      try {
        const canvas = await html2canvas(content);
        const image = canvas.toDataURL('image/png');

        const pdf = new jsPDF();
        pdf.addImage(
          image,
          'PNG',
          0,
          0,
          pdf.internal.pageSize.width,
          pdf.internal.pageSize.height
        );
    
        const pdfData = pdf.output('dataurlstring');
        // const user = localStorage.getItem("loginedUser");
        const blob = pdf.output('blob');  
        const uploading = ref(fireDB,`MerchandiseBingoo/users/${userEmail}/orders/${invoiceNo}`);
        //Upload PDF to firebase Storage
        const response = await uploadBytes(uploading,blob);
        const pdfUrl = await getDownloadURL(response.ref);
  
        if(pdfData){
            const res = await fetch(
              `${import.meta.env.VITE_REACT_API_URL}/user`,
              {
                method: "POST",
                headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({ pdfUrl, userEmail, invoiceNo }),
            }
            );
            const finalRes = await res.json();
            
            if (finalRes.success) {
              setLoading(false);
            } else if (finalRes.fail) {
              await deleteObject(response.ref);
              setLoading(false);
              alert("fail to insert data");
            } else if (finalRes.error) {
              setLoading(false);
              alert(finalRes.error);
            }
          }
      } catch (error) {
        setLoading(false);
        console.error("Error:", error);
        alert("An error occurred while saving the PDF.");
      }
    }
  }

  function price(price,sale){
    const x = parseFloat((price - parseFloat( (price*(sale/100)).toFixed(2) )).toFixed(2));
    return x;
  }
  function totalPrice(quantity,price,sale){
    const x = parseFloat((price - parseFloat((price*(sale/100)).toFixed(2))).toFixed(2));
    return quantity*x;
  }  
  function ProductPrice({ price, sale }) {
    const discountPrice = parseFloat((price - parseFloat((price * (sale / 100)).toFixed(2)) ).toFixed(2));
    const off = parseFloat((price * (sale / 100)).toFixed(2));
    return (
      <>
        <p style={{color:"green",fontFamily:`'Berkshire Swash', serif`, fontWeight:'bold'}}>Extra ₹{off} off</p>
        <h4>
          ₹{discountPrice} <del style={{color:"grey",fontFamily:`'Berkshire Swash', serif`}}>{parseFloat(price.toFixed(2))}</del>{" "}
          <span style={{color:"green",fontFamily:`'Berkshire Swash', serif`}}>{sale}% off</span>
        </h4>
      </>
    );
  }
  function productName(str){
    if(str.length>40)
    return str.slice(0,40)+"...";
    else
    return str;
  }
  function HandleRating({ rate, width }) {
    const numToStr = rate + "";
    let rating = numToStr.split(".")[0];
    const dec = numToStr.split(".")[1];

    const arr = [];
    for (let i = 0; i < 5; i++) {
      if (rating > 0)
        //this if statement push number of stars that is equal to integer part of rating. In other word, select fullstar
        arr.push(
          <img
            src={rating > 0 ? "images/fullStar.png" : "images/emptyStar.png"}
            alt="error"
            key={i}
            style={{ width: width }}
          />
        );
      else if (rating == 0 && dec) {
        // this if statement push a half star if decimal value of number is exist and push when fullstar already pushed
        arr.push(
          <img
            src="images/halfStar.jpg"
            alt="error"
            key={i}
            style={{ width: width }}
          />
        );
      } else {
        // and finally push remaining empty star
        arr.push(
          <img
            src="images/emptyStar.png"
            alt="error"
            key={i}
            style={{ width: width }}
          />
        );
      }
      rating--;
    }
    return arr;
  }

  useEffect(()=>{
    if(data){
      savePdfDB();
      console.log(data);
    }
  },[data])
  useEffect(()=>{
    console.log(selectedAdd);
  },[selectedAdd])
  return (
    <>
    <div id="mainInvoice">
    <div id="orderItemPreview">
      <div>
        <h1 id="productsAftSuc">Products :-</h1>
      </div>
      <div id="orderItemPreviewDiv">
        {/* image and name */}
        {data && data.map((elem,index)=>(
          <div key={index} id="orderItemInvoice">
              <div id="productImgInv">
                <img 
                src={elem.img[0]}
                alt="error"
                style={{
                  height:"100%",
                  width:"100%"
                }} 
                  />
              </div>
              <div>
                <div>
                  <h4 style={{fontFamily:`'Lora', serif`}}>{productName(elem.name)}</h4>
                  <p style={{fontSize:"12px",fontFamily:`'Cinzel Decorative', serif`, marginTop:'5px'}}><span style={{color:"red",fontWeight:"bold",fontFamily:`'Cinzel Decorative', serif`}}>Company Name:</span> <span style={{color:'black',fontWeight:'bold'}}>{elem.companyName}</span></p>
                </div>
                <div style={{marginTop:"0.3rem"}}>
                  <HandleRating rate={rating} width={"20px"}/>
                </div>
                <div style={{marginTop:"5px"}}>
                  <ProductPrice price={elem.price} sale={elem.sale}/>
                </div>
              </div>
          </div>
        ))}
        </div>
    </div>
      <div id="invoiceCon">
          {/* first block which contain invoice number and company name with email and address */}
       { data &&  <div ref={invoiceRef} id="x">
          <div>
            <div id="comNameInvoiceNum">
              <div id='logoNav'>
                <img src={logo} alt="error" height="50px" />
              </div>
              <h3>
                #{invoiceNo} <span id="paidSpan">Paid</span>
              </h3>
            </div>
            <div id="comAddGNum">
              {/* <p>company address</p> */}
              <p>MerchandiseBingoo@gmail.com</p>
              <p>012-345-6789</p>
            </div>
          </div>

          <hr id="hrTagInvoice" />
          {/* Second block which contain invoice number, invoice data, order number and user's address */}

          <div id="billAdd_OrderNumDiv">
            {selectedAdd && <div
              id="addDetailDivInvoice"
            >
              <h2 id="billh2">Billed To:</h2>
              <div style={{fontSize:"12px"}}>
                <h3>{selectedAdd.name}</h3>
                <p>{selectedAdd.address}</p>
                <p>Locality: {selectedAdd.locality}</p>
                {selectedAdd.landmark!=""?<p>Landmark: {selectedAdd.landmark}</p>:null}
                <p>{selectedAdd.city},{selectedAdd.state} {selectedAdd.pincode}</p>
                <p>Phone No. : {selectedAdd.phoneNo}</p>
                {selectedAdd.altPhone!=""?<p>Alternative Phone No. : {selectedAdd.altPhone}</p>:null}
              </div>
            </div>}

            <div id="numDateOrderNumDiv">
              <div>
                <h3>Invoice No:</h3>
                <p style={{fontSize:"15px"}}>#{invoiceNo}</p>
              </div>
              <div>
                <h3>Invoice Date:</h3>
                <p style={{fontSize:"15px"}}>{new Date().toLocaleDateString()}</p>
              </div>
              <div>
                <h3>Order No:</h3>
                <p style={{fontSize:"15px"}}>#{orderId}</p>
              </div>
            </div>
          </div>
          {/* Third block which contain products details like name,price,quantity. Also contain total,delivery charges   */}
          <div>
            <h3 >Order Summary</h3>
            <table id="tableInvoice">
              <thead>
                <tr>
                  <th style={{ width: "3rem",textAlign:"center" }}>No.</th>
                  <th>Item</th>
                  <th>Price</th>
                  <th style={{textAlign:"center"}}>Quantity</th>
                  <th style={{textAlign:"center" }}>Total</th>
                </tr>
              </thead>
                <tbody >
              {data.map((elem,index)=>(
                  <tr key={index}>
                    <td style={{textAlign:"center"}}>{index+1}.</td>
                    <td style={{fontSize:"0.7rem"}}>{elem.name}</td>
                    <td style={{fontSize:"0.7rem"}}>₹{price(elem.price,elem.sale)}</td>
                    <td style={{fontSize:"0.7rem",textAlign:"center"}}>{elem.quantity}</td>
                    <td style={{fontSize:"0.7rem",textAlign:"center"}}>₹{totalPrice(elem.quantity,elem.price,elem.sale)}</td>
                  </tr>
                  ))}
                  <tr>
                    <td
                      style={{
                        borderTop: "2px solid",
                        borderBottom: "2px solid",
                        paddingTop: "5px",
                        paddingBottom: "5px",
                      }}
                    ></td>
                    <td
                      style={{
                        borderTop: "2px solid",
                        borderBottom: "2px solid",
                        paddingTop: "5px",
                        paddingBottom: "5px",
                      }}
                    ></td>
                    <td
                      style={{
                        borderTop: "2px solid",
                        borderBottom: "2px solid",
                        paddingTop: "5px",
                        paddingBottom: "5px",
                      }}
                    ></td>
                    <td
                      id="subTotalTD"
                    >
                      Sub Total:
                    </td>
                    <td
                      style={{
                        borderTop: "2px solid",
                        borderBottom: "2px solid",
                        textAlign:"center"
                      }}
                    >
                      ₹{totalAmount}
                    </td>
                  </tr>
                </tbody>
            </table>
            <div id="TotalDivInvoice">
              <div>
                <h3>Delivery Charges:</h3>
                
                <h3>Total:</h3>
              </div>
              <div>
                <p style={{ fontSize: "20px" }}>Free</p>
                <h2 style={{fontSize:"20px"}}>₹{totalAmount}</h2>
              </div>
            </div>
          </div>
        </div> }

        <div id="saveInvoiceDiv">
          <button onClick={handleInvoicePdf}>save</button>
        </div>
      </div>
    </div>
    {loading?<Loader/>:null}
    </>
  );
}
