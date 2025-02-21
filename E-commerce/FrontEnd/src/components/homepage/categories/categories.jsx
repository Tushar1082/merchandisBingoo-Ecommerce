import React from "react";
import "./categories.css";
import { handleList } from "../navbar/navbar";
import { useSelector } from "react-redux";

export default function Categories(){
    const {list,remCartList} = useSelector((state=>state.cart));
    
    function bag(){
        handleList(list,remCartList);
        window.location.href="/category/bags";
    }
    function book(){
        handleList(list,remCartList);
        window.location.href="/category/book";
    }
    function women(){
        handleList(list,remCartList);
        window.location.href="/category/women";
    }
    function men(){
        handleList(list,remCartList);
        window.location.href="/category/men";
    }
    function mobile(){
        handleList(list,remCartList);
        window.location.href="/category/mobile";
    }
    function electronics(){
        handleList(list,remCartList);
        window.location.href="/category/electronics";
    }
    return(
        <>
            <div id="mainCate">
               <div id="cateTop">
               <div>
                    <img src="images/categories/delivery truck.png" alt="error" />
                    <h5>Free delivery</h5>
                    <p>Free Delivery</p>
               </div>
                    <img src="images/categories/line.png" alt="error" />
               <div>
                    <img src="images/categories/customer support.png" alt="error" />
                    <h5>Customer Support</h5>
                    <p>Quick response 24/7</p> 
               </div>
               <img src="images/categories/line.png" alt="error" />
                    <div>
                    <img src="images/categories/cashback.png" alt="error" />
                    <h5>Refund Guarantee</h5>
                    <p>worry-free shopping</p>
                    </div>
               </div>

               <div id="cateCon" >
                    <div id="cateFirst">
                         <div onClick={women}>
                            <img src="images/categories/category/women.jpg" alt="error" loading = "lazy"/>
                            <h3>Women</h3>
                            <p>view all</p>
                        </div>
                        <div onClick={men}>
                            <img src="images/categories/category/men.png" alt="error" loading = "lazy"/>
                            <h3>Men</h3>
                            <p>view all</p>
                        </div>
                        <div onClick={mobile}>
                            <img src="images/categories/category/mobile.jpeg" alt="error" id="cateMobileImg" loading = "lazy"/>
                            <h3>Mobiles</h3>
                            <p>view all</p>
                        </div>
                    </div>

                    <div id="cateSecond">
                        <div  id="cateElec" onClick={electronics}>
                            <img src="images/categories/category/electronics.png" alt="error" loading = "lazy"/>
                            <h3>Electronics</h3>
                            <p>view all</p>
                        </div>
                        <div onClick={bag}>
                            <img src="images/categories/category/bag.png" alt="error" loading = "lazy"/>
                            <h3>Bags</h3>
                            <p>view all</p>
                        </div>
                        <div onClick={book}>
                            <img src="images/categories/category/b.jpg" alt="error" loading = "lazy"/>
                            <h3>Books</h3>
                            <p>view all</p>
                        </div>
                    </div>
               </div>
            </div>
        </>
    )
}
