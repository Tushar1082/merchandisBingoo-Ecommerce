import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navbar/navbar';
import Slider,{SliderPhone} from './slider/slider';
import Categories from './categories/categories';
import SpecialProduct from './specialProducts/specialProduct';
import Events,{EventsPhone} from './events/events';
import TopDeals from './topDeals/topDeals';
import Footer from './footer/footer';
import accountImg from "/images/navbar/account.png";
import addAddressImg from "/images/navbar/address.png";
import cartImg from "/images/navbar/cart.png";
import orderImg from "/images/navbar/order.png";
import logoutImg from "/images/navbar/logout.png";
import wishlistImg from '/images/navbar/wishlistPhone.png';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { showPayment } from '../../services/actions/actions';

export default function Homepage() {
  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(showPayment(false));
  },[]);
  
  return (
    <>
    <Navbar/>
{/*     <Slider/> */}
{/*     <SliderPhone/> */}
    <Categories/>
    <SpecialProduct/>
{/*  <Events/> */}
{/*     <EventsPhone/>  */}
    <TopDeals/>
    <Footer/>
    <PhoneFooter/>
    </>
  )
}
export function PhoneFooter(){
  function logout(){
    localStorage.removeItem("MDB_USER_NAME");
    localStorage.removeItem("MDB_USER_EMAIL_ID");
    Cookies.remove("token");
    location.reload();
  }
  const user = localStorage.getItem("MDB_USER_NAME");
  return(
    <div id='mobileNavDiv'>
        <Link to="/myOrders" ><img src={orderImg} alt="Error"/><span>My Orders</span></Link>
        <Link to="/wishlist" ><img src={wishlistImg} alt="error"/><span>wishlist</span></Link>
        <Link to="/cart" ><img src={cartImg} alt="Error"/><span>Cart</span></Link>
        <Link to="/addAddress" ><img src={addAddressImg} alt="Error"/><span>Add Address</span></Link>
        {user!=null?<Link to="/" onClick={logout}><img src={logoutImg} alt="Error"/><span>Logout</span></Link>:null}
    </div>
  )
}
