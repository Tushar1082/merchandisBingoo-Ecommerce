import React, { useEffect,useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import './orderSummary.css';
import {disOrderPage,disPaymentPage,incCartPrice,incCartDisPrice,decCartPrice,decCartDisPrice,orderList,totalAmount} from "../../../services/actions/actions";
import fullStar from "/images/fullStar.png";
import Loader from '../../homepage/loader/loader';

function OrderItem({img,price,sale,name,id,category,quantity,items,setItems,orderL}){
  const dispatch = useDispatch();
  const {rating} = useSelector((state)=>state.payment);
  const [count,setCount] = useState(quantity);

  function handleInc(){
    const off = parseFloat( (price * (sale / 100)).toFixed(2) );
    dispatch(incCartPrice(parseFloat(price.toFixed(2))));
    dispatch(incCartDisPrice(off));
    setCount(count+1);
    
    setItems((prev) => {
      return prev.map(item => {
        if (item._id === id && item.category === category) {
          return { ...item, quantity: item.quantity+1 };
        }
        return item;
      });
    });
  }
  function handleDec(){
    if(count>1){
    const off = parseFloat( (price * (sale / 100)).toFixed(2) );
    dispatch(decCartPrice(parseFloat(price.toFixed(2))));
    dispatch(decCartDisPrice(off));
      setCount(count-1);
      setItems((prev) => {
        return prev.map(item => {
          if (item._id === id && item.category === category) {
            return { ...item, quantity: item.quantity-1 };
          }
          return item;
        });
      });
    }
  }
  function Price({ price, sale }) {
    // const discountPrice = Math.floor(price - Math.floor(price * (sale / 100)));
    const discountPrice = parseFloat( (price - parseFloat( (price * (sale / 100)).toFixed(2) )).toFixed(2) );
    const off = parseFloat( (price * (sale / 100)).toFixed(2) );
    return (
      <>
        <p style={{color:"green",fontSize:"1.2rem"}}>Extra {off} off</p>
        <h2>
          ₹{discountPrice} <del style={{color:"grey"}}>{parseFloat(price.toFixed(2))}</del>{" "}
          <span style={{color:"green"}}>{sale}% off</span>
        </h2>
      </>
    );
  }
  function handleRemove(){
    const filterItems = items.filter((elem)=> elem._id!=id && elem.category != category);
      
    setItems(filterItems);
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

  return(
    <div id='orderOrderSummary'>
      <div id='orderImgBtn'>
          <div id='OIBFDiv'>
              <img src={img} alt="error" style={{width:"100%"}} />
          </div>
          <div>
              <button onClick={handleDec}>-</button>
              <div>{count}</div>
              <button onClick={handleInc}>+</button>
          </div>
      </div>
      <div id='orderNamePrice'>
          <h2 style={{fontFamily:`'Lora', serif`}}>{name}</h2>
          <div>
              <HandleRating rate={rating} width={"20px"}/>
          </div>
          <div id='orderPrice'>
              <Price price={price} sale={sale}/>
              <button onClick={handleRemove}>Remove</button>
          </div>
      </div>
    </div>
  )
}
export default function OrderSummary({orderL,dispOrder}) {
  const dispatch = useDispatch();
  // const {dispOrder} = useSelector((state)=>state.payment);
  const {cartPrice,cartDisPrice} = useSelector((state)=>state.cart);
  const [items,setItems] = useState(orderL);
  const [loading,setLoading] = useState(false);

  function navigateToPay(){
    const total = cartPrice - cartDisPrice;
    if(total){
      setLoading(true);
      finalToPay();
    }
  }
  function finalToPay(){
    const total = cartPrice - cartDisPrice;
      setLoading(false);
      dispatch(orderList(items));
      dispatch(totalAmount(total));
      dispatch(disOrderPage(false));
      dispatch(disPaymentPage(true));
  }

  function findTotal(){
    if(orderL){
      orderL.forEach((elem)=>{
        const off = parseFloat( ( (elem.price * (elem.sale / 100)) * elem.quantity ).toFixed(2) );
        const initialPrice = parseFloat( (elem.price * elem.quantity).toFixed(2) );
        dispatch(incCartPrice(initialPrice));
        dispatch(incCartDisPrice(off));
      });
    }
  }
  useEffect(()=>{
    // callData();
    findTotal();
  },[])
  return (
    <>
    {dispOrder && <div id='mainOrderSummary'>
      <div style={{margin:"20px"}}>
        <h1 id='orderSummaryHead'>Order Summary</h1>
        <div id='orderCon'>
        {items && items.map((elem,index)=>(
            <OrderItem 
              key={index}
              img={elem.img[0]}
              sale={elem.sale}
              price={elem.price}
              name={elem.name}
              id={elem._id}
              category={elem.category}
              quantity = {elem.quantity}
              items={items}
              setItems={setItems}  
              orderL={orderL}
              />
          ))
        }    
        </div>
      </div>
      <div id='totalCart'>
              <div id='priceheadDiv'>
                <h1 style={{fontFamily: `'Berkshire Swash', serif`, color:'black'}}>Price details</h1>
              </div>
              <div id='totalCartPriceDiv'>
                  <div style={{display:"flex",justifyContent:"space-between"}}>
                      <p>Price ({items && items.length} items)</p>
                      <p>₹{parseFloat(cartPrice.toFixed(2))}</p>
                  </div>

                  <div style={{display:"flex",justifyContent:"space-between"}}>
                    <p>Discount</p>
                    <p style={{color:"green",fontWeight:"bold"}}>-₹{parseFloat(cartDisPrice.toFixed(2))}</p>
                  </div>

                  <div style={{display:"flex",justifyContent:"space-between"}}>
                    <p>Delivery Charges</p>
                    <p>free</p>
                  </div>
              </div>
              <div id="totalAmountDiv">
                <h2>Total Amount</h2>
                <p>₹{parseFloat((cartPrice-cartDisPrice).toFixed(2))}</p>
              </div>
              <div style={{borderTop:"2px dashed lightgrey",textAlign:"center",paddingTop:"10px",color:"green",fontWeight:"bold"}}>
                <p>You will save ₹{parseFloat(cartDisPrice.toFixed(2))} on this order</p>
              </div>
              <div id='totalAmountBtnDiv'>
                <button onClick={navigateToPay} style={{fontWeight:'bold'}}>Payment Now</button>
              </div>
        </div>
    </div>}
    {loading?<Loader/>:null}
    </>
  )
}
