import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./productPage.css";
import Navbar from "../navbar/navbar";
import fullStarImg from "/images/fullStar.png";
import halfStarImg from "/images/halfStar.jpg";
import emptyStarImg from "/images/emptyStar.png";
import PrevPage from "/images/PrevPage.png";
import NextPage from "/images/NextPage.png";
import noSearchResult from "/images/noSearchResult.jpg";
import filterImg from "/images/filter.png";
import Loader from "../loader/loader";
import Footer from "../footer/footer";
import { PhoneFooter } from "../homepage";
import { useDispatch } from "react-redux";
import { incrementLike,decrementLike, CountingLike,remLikeList } from '../../../services/actions/actions.jsx';
import {handleLikeList} from "../navbar/navbar";
import favImg from "/images/favorite.png";
import favFullImg from "/images/favorite_full.png";
import CryptoJS from "crypto-js";

export default function ProductPage({ data }) {
  const [loading, setLoading] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [selComName, setSelComName] = useState([]);
  const [count, setCount] = useState(5);
  const [comNameArrSize, setComNameArrSize] = useState();
  const [search, setSearch] = useState();
  const [likeBtn,setLikeBtn] = useState();
  const myRef = useRef();
  const myRef1 = useRef();
  const likeList=[];
  const removeLikeList=[];
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / productsPerPage);
  const uniqueCompanyNames = [];

  const handleNextChange = (newPage) => {
    if (newPage <= totalPages) {
      setLoading(true);
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behaviour: "smooth" });

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };
  const handlePrevChange = (newPage) => {
    if (newPage > 0) {
      setLoading(true);
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behaviour: "smooth" });
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };
  useEffect(() => {
    {
      data && setProducts(data.products);
    }
  }, [data]);
  useEffect(() => {
    window.scrollTo({ top: 0, behaviour: "smooth" });
  }, []);
  function catePriceWithOff(sale, price) {
    return parseFloat((price - price * (sale / 100)).toFixed(2));
  }
  function handlePriceFilter() {
    if (maxPrice !== undefined && minPrice !== undefined) {
      const newList = products.filter((elem) => {
        const price = catePriceWithOff(data.sale, elem.price);
        return price <= maxPrice && price >= minPrice;
      });
      setProducts(newList);
    }
  }
  function sortPriceFilter(minPrice, maxPrice) {
    const newList = data.products.filter((elem) => {
      const price = catePriceWithOff(data.sale, elem.price);
      return price <= maxPrice && price >= minPrice;
    });
    setProducts(newList);
  }
  function handleSortingFilter(str) {
    switch (str) {
      case "highToLow":
        const sortedProducts1 = [...products].sort((a, b) => b.price - a.price);
        setProducts(sortedProducts1);
        break;
      case "lowToHigh":
        const sortedProducts2 = [...products].sort((a, b) => a.price - b.price);
        setProducts(sortedProducts2);
        break;
      default:
        setProducts(data.products);
    }
  }
  function handleCompanyNameFilter(name, state) {
    if (state !== undefined) {
      if (state) {
        setSelComName((prev) => {
          const newElem = [...prev, name];
          setProducts(() => {
            const list = data.products;
            const newList = list.filter((elem) => {
              if (newElem.includes(elem.companyName)) {
                return true;
              } else {
                return false;
              }
            });
            return newList;
          });
          return newElem;
        });
      } else {
        const idx = selComName.indexOf(name);
        setSelComName((prev) => {
          prev.splice(idx, 1);
          setProducts(() => {
            const list = data.products;
            const newList = list.filter((elem) => {
              if (prev.includes(elem.companyName)) {
                return true;
              } else {
                return false;
              }
            });
            return newList;
          });
          return prev;
        });
      }
      if (myRef.current != undefined) {
        const nodeList = myRef.current.childNodes;
        const inputVal = Array.from(nodeList).map((div) => {
          const inputElem = div.querySelector("input");
          return inputElem.checked;
        });
        const allFalse = !inputVal.includes(true);
        console.log("i am allfalse", allFalse);
        if (allFalse) {
          setProducts(() => data.products);
        }
      }
    }
  }

  function ComName({ search }) {
    const comNameArr = [];

    if (search != "" && search != undefined) {
      uniqueCompanyNames.length = 0;
      comNameArr.length = 0;
      const newArr = data.products
        .filter((elem) => {
          if (!uniqueCompanyNames.includes(elem.companyName.trim())) {
            uniqueCompanyNames.push(elem.companyName.trim());
            return true;
          }
          return false;
        })
        .filter((elem) => {
          if (elem.companyName.toLowerCase().startsWith(search.toLowerCase())) {
            return true;
          } else {
            return false;
          }
        });
      for (let i = 0; i < count; i++) {
        if (i < newArr.length) {
          comNameArr.push(
            <div>
              <label
                htmlFor={`${newArr[i].companyName}BrandFilter`}
                key={i}
                onClick={(e) =>
                  handleCompanyNameFilter(
                    newArr[i].companyName,
                    e.target.checked
                  )
                }
              >
                <input
                  type="checkbox"
                  id={`${newArr[i].companyName}BrandFilter`}
                  checked={selComName.includes(newArr[i].companyName)}
                  onChange={() => {}}
                />{" "}
                {newArr[i].companyName}
              </label>
            </div>
          );
        }
      }
      useEffect(() => {
        setComNameArrSize(newArr.length);
      }, [newArr.length]);
      return comNameArr;
    } else {
      uniqueCompanyNames.length = 0;
      comNameArr.length = 0;
      const newArr = data.products.filter((elem) => {
        if (!uniqueCompanyNames.includes(elem.companyName.trim())) {
          uniqueCompanyNames.push(elem.companyName.trim());
          return true;
        }
        return false;
      });
      useEffect(() => {
        setComNameArrSize(newArr.length);
      }, [newArr.length]);
      for (let i = 0; i < count; i++) {
        if (i < newArr.length) {
          comNameArr.push(
            <div key={i}>
              <label
                htmlFor={`${newArr[i].companyName}BrandFilter`}
                onClick={(e) =>
                  handleCompanyNameFilter(
                    newArr[i].companyName,
                    e.target.checked
                  )
                }
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <input
                  type="checkbox"
                  id={`${newArr[i].companyName}BrandFilter`}
                  checked={selComName.includes(newArr[i].companyName)}
                  onChange={() => {}}
                />
                {newArr[i].companyName}
              </label>
            </div>
          );
        }
      }
      return comNameArr;
    }
  }
  function HandleRating({ reviews, width }) {
    const reviewsArr = reviews;
    const countArr = [];

    for (let i = 0; i < 6; i++) {
      countArr[i] = 0;
    }
    reviewsArr.map((elem) => {
      countArr[elem.cusRating]++;
    });
    const x =
      5 * countArr[5] +
      4 * countArr[4] +
      3 * countArr[3] +
      2 * countArr[2] +
      1 * countArr[1];
    let y = 0;
    countArr.map((elem) => {
      y += elem;
    });
    const avgRating = x / y;

    const numToStr = avgRating + "";
    let rating = numToStr.split(".")[0];
    const dec = numToStr.split(".")[1];

    const arr = [];
    for (let i = 0; i < 5; i++) {
      if (rating > 0) {
        //this if statement push number of stars that is equal to integer part of rating. In other word, select fullstar
        arr.push(
          <img src={fullStarImg} alt="error" key={i} style={{ width: width }} />
        );
      } else if (rating == 0 && dec) {
        // this if statement push a half star if decimal value of number is exist and push when fullstar already pushed
        arr.push(
          <img src={halfStarImg} alt="error" key={i} style={{ width: width }} />
        );
      } else {
        // and finally push remaining empty star
        arr.push(
          <img
            src={emptyStarImg}
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
  function Product({elem,index,sale,category}){
  const [fav,setFav] = useState(false);
  const [load,setLoad] = useState(false);

  function productName(str) {
    return str.slice(0, 40);
  }

  function catePriceWithOff(sale, price) {
    return parseFloat((price - price * (sale / 100)).toFixed(2));
  }

  async function addToWishList(){
    try {  
      handleWishList();
      setLoad(true);
      handleLikeList(likeList,removeLikeList);
      setTimeout(()=>{
        setLoad(false);
      },2000)
      likeList.pop();
    } catch (error) {
      console.log(error);
     alert("faild to add in wishlist"); 
    }
    
  }
  const handleWishList = () => {
    setFav(!fav);

    if(!fav){
      const likeObj = {
        id:elem._id,
        category:category
      }

      likeList.push(likeObj);
      dispatch(incrementLike(likeList))
      const newRem = removeLikeList.filter((item)=>item.id !== data._id )
      removeLikeList.length=0;
      removeLikeList.push(...newRem);
    }else{
      const likeObj = {
        id:elem._id,
        category:category
      }
      removeLikeList.push(likeObj);
      const updatedList = likeList.filter((item) => item.id !== data._id);
      likeList.length = 0; // Clear the original likeList
      likeList.push(...updatedList);//use to push elements of updatedList inside likeList array
      dispatch(decrementLike(likeList));
      dispatch(remLikeList(removeLikeList));
    }
  };

  function isAlreadyLiked(){
    if(likeBtn){
      likeBtn.map((item)=>{
        if(item.id == elem._id && item.category == category){
          setFav(true);
        }
      })
      setLoad(false);
    }
    setLoad(false);
  }
  function navigateTo(category,sale,id){
    const encSale = "sale="+sale.toString();
    const encryS = CryptoJS.AES.encrypt(encSale,import.meta.env.VITE_REACT_EncryptKey);
    return `?category=${category}&&${encryS.toString()}&&id=${id}`;
  }
  useEffect(()=>{
    setLoad(true);
    isAlreadyLiked();
  },[])

    return(
      <>
      {load?<Loader/>:null}
      <div id="productItemPP" key={index}>
      <Link
        style={{ color: "black", textDecoration: "none" }}
        to={{
          pathname: "/buyPage",
          search: navigateTo(category,sale,elem._id),
        }}
        target="_blank"
      >
        <div id="pIWImgDiv">
          <img src={elem.img[0]} alt="error" />
        </div>
      </Link>
          <div onClick={addToWishList} id='addTofavCP'>
            <img src={fav?favFullImg:favImg} alt="error" />
          </div>
      <Link
        style={{ color: "black", textDecoration: "none" }}
        to={{
          pathname: "/buyPage",
          search: navigateTo(category,sale,elem._id),
        }}
        target="_blank"
      >
        <div id="pIDetailDiv">
          <p id="comNameProductList">{elem.companyName}</p>
          <h3 style={{ marginTop: "10px" ,fontFamily: `'Lora', serif`}}>
            {productName(elem.name)}...
          </h3>
          <div>
            <HandleRating
              reviews={elem.reviews ? elem.reviews : []}
              width={"20px"}
            />
          </div>
          <p style={{fontFamily: `'Roboto Slab', serif`}}>reviews({elem.reviews?elem.reviews.length:0})</p>
          <p style={{ margin: "10px 0px" , fontWeight:'bold'}}>
            ₹{catePriceWithOff(sale, elem.price)}{" "}
            <del style={{color:'grey'}}>{parseFloat( (elem.price).toFixed(2) )}</del>{" "}
            <span style={{ color: "green", fontWeight: "bold" }}>
              {sale}% off
            </span>
          </p>
        </div>
      </Link>
    </div>
    </>
    )
  }
  function ProductList({ currentProducts, sale }) {

    return (
      <div id="productsConCP" ref={myRef1}>
        {currentProducts.map((elem, index) => (
          <Product index={index} elem={elem} sale={sale} category={data.category}/>
        ))}
      </div>
    );
  }
  function ratingFilter(val) {
    const newData = data.products.filter((elem) => {
      const reviewsArr = elem.reviews;
      const countArr = [];

      for (let i = 0; i < 6; i++) {
        countArr[i] = 0;
      }

      reviewsArr.map((elem) => {
        countArr[elem.cusRating]++;
      });

      const x =
        5 * countArr[5] +
        4 * countArr[4] +
        3 * countArr[3] +
        2 * countArr[2] +
        1 * countArr[1];

      let y = 0;
      countArr.map((elem) => {
        y += elem;
      });
      const avgRating = x / y;
      const str = avgRating + "";
      const rating = str.split(".")[0];
      if (rating == val) {
        return elem;
      }
    });
    setProducts(newData);
  }
  function popularityFilter() {
    const arr = data.products;
    arr.forEach((elem, index) => {
      const reviewsArr = elem.reviews;
      const countArr = [];

      for (let i = 0; i < 6; i++) {
        countArr[i] = 0;
      }

      reviewsArr.map((elem) => {
        countArr[elem.cusRating]++;
      });

      const x =
        5 * countArr[5] +
        4 * countArr[4] +
        3 * countArr[3] +
        2 * countArr[2] +
        1 * countArr[1];

      let y = 0;
      countArr.map((elem) => {
        y += elem;
      });
      const avgRating = x / y;
      const str = avgRating + "";
      const rating = str.split(".")[0];

      arr[index].rating = isNaN(rating)?0:+rating;
    });
    const newData = [...arr].sort((a,b)=>b.rating-a.rating);
    setProducts(newData);
  }
  useEffect(() => {
    if (myRef1.current != undefined) {
      const nodeList = myRef1.current.childNodes;
      if (nodeList.length === 0) {
        setCurrentPage(1);
      }
    }
  });
  function handleClick(){
    const div = document.getElementsByClassName("filterDiv");

    if(div[0]){
      div[0].classList.toggle('showFilterDiv');
    }
  }
  async function call(){
    try {
      setLoading(true);      
      const isUserLog = localStorage.getItem("MDB_USER_EMAIL_ID");
      const res = await fetch(`${import.meta.env.VITE_REACT_API_URL}?SpecialProduct=true&&user=${isUserLog}`);
      const finalRes = await res.json();
      const {likeData} = finalRes;
      if(!likeData){
        alert('error while getting wishlist data');
        setLoading(false);
        return;
      }
      setLikeBtn(likeData);
      setLoading(false);
    } catch (error) {
      alert('error while getting wishlist data and error is generated from here');
      console.log(error);
      setLoading(false);
    }
  }
  useEffect(()=>{
   call(); 
  },[])
  return (
    <>
      <Navbar />
      <div id="mainProductPage">

        <div className="filterDiv">
          <div id="priceFilter">
            <h3>Price filter</h3>
            <div id="priceFilterDiv">
              <p onClick={() => sortPriceFilter(0, 1000)}>Under 1000</p>
              <p onClick={() => sortPriceFilter(1000, 5000)}>1000 - 5000</p>
              <p onClick={() => sortPriceFilter(5000, 10000)}>
                5,000 - 10,000
              </p>
              <p onClick={() => sortPriceFilter(10000, 20000)}>
                10,000 - 20,000
              </p>
            </div>
            <div>
              <input
                type="number"
                placeholder="₹min"
                value={minPrice != 0 ? minPrice : ""}
                onChange={(e) => setMinPrice(e.target.value)}
              />{" "}
              -{" "}
              <input
                type="number"
                placeholder="₹max"
                value={maxPrice != 0 ? maxPrice : ""}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
              <button onClick={handlePriceFilter}>Go</button>
            </div>
          </div>

          {data && data.products[0].companyName && (
            <div id="brandFilter">
              <h3>Brand filter</h3>

              <>
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="search brand name.."
                />
                <div ref={myRef}>
                  <ComName search={search} />
                </div>
                <button
                  onClick={() => setCount(count + 5)}
                  disabled={count < comNameArrSize ? false : true}
                  id="moreComName"
                >
                  more
                </button>
              </>
            </div>
          )}

          <div id="customerReviewFilterDiv">
            <h3>Rating filter</h3>
            <div onClick={() => ratingFilter(5)}>
              <img src={fullStarImg} alt="error" style={{ height: "20px" }} />
              <img src={fullStarImg} alt="error" style={{ height: "20px" }} />
              <img src={fullStarImg} alt="error" style={{ height: "20px" }} />
              <img src={fullStarImg} alt="error" style={{ height: "20px" }} />
              <img src={fullStarImg} alt="error" style={{ height: "20px" }} />
              <p>& up</p>
            </div>
            <div onClick={() => ratingFilter(4)}>
              <img src={fullStarImg} alt="error" style={{ height: "20px" }} />
              <img src={fullStarImg} alt="error" style={{ height: "20px" }} />
              <img src={fullStarImg} alt="error" style={{ height: "20px" }} />
              <img src={fullStarImg} alt="error" style={{ height: "20px" }} />
              <img src={emptyStarImg} alt="error" style={{ height: "20px" }} />
              <p>& up</p>
            </div>
            <div onClick={() => ratingFilter(3)}>
              <img src={fullStarImg} alt="error" style={{ height: "20px" }} />
              <img src={fullStarImg} alt="error" style={{ height: "20px" }} />
              <img src={fullStarImg} alt="error" style={{ height: "20px" }} />
              <img src={emptyStarImg} alt="error" style={{ height: "20px" }} />
              <img src={emptyStarImg} alt="error" style={{ height: "20px" }} />
              <p>& up</p>
            </div>
            <div onClick={() => ratingFilter(2)}>
              <img src={fullStarImg} alt="error" style={{ height: "20px" }} />
              <img src={fullStarImg} alt="error" style={{ height: "20px" }} />
              <img src={emptyStarImg} alt="error" style={{ height: "20px" }} />
              <img src={emptyStarImg} alt="error" style={{ height: "20px" }} />
              <img src={emptyStarImg} alt="error" style={{ height: "20px" }} />
              <p>& up</p>
            </div>
            <div onClick={() => ratingFilter(1)}>
              <img src={fullStarImg} alt="error" style={{ height: "20px" }} />
              <img src={emptyStarImg} alt="error" style={{ height: "20px" }} />
              <img src={emptyStarImg} alt="error" style={{ height: "20px" }} />
              <img src={emptyStarImg} alt="error" style={{ height: "20px" }} />
              <img src={emptyStarImg} alt="error" style={{ height: "20px" }} />
              <p>& up</p>
            </div>
          </div>

          <div id="sortByFilterDiv">
            <h3>Sort by:</h3>
            <div>
              <button onClick={handleSortingFilter}>Relevance</button>
            </div>
            <div>
              <button onClick={popularityFilter}>Popularity</button>
            </div>
            <div>
              <button onClick={() => handleSortingFilter("highToLow")}>
                high-to-low
              </button>
            </div>
            <div>
              <button onClick={() => handleSortingFilter("lowToHigh")}>
                low-to-high
              </button>
            </div>
          </div>
        </div>

        <div style={{ width: "100%" }}>
            <div id="filPhone" onClick={handleClick}>
              <img src={filterImg} alt="error" />
              <p>Filter</p>
            </div>
          <div id="extraSortDiv">
            <h2>Sort By</h2>
            <button style={{ color: "blue" }} onClick={handleSortingFilter}>
              Relevence
            </button>
            <button onClick={popularityFilter}>Popularity</button>
            <button onClick={() => handleSortingFilter("lowToHigh")}>
              Price -- Low to High
            </button>
            <button onClick={() => handleSortingFilter("highToLow")}>
              Price -- High to Low
            </button>
          </div>
          {data ? (
            data.length!=0?
            <ProductList sale={data.sale} currentProducts={currentProducts} />
            :
            <div style={{height:"100vh",textAlign:"center"}}>
              <img src={noSearchResult} alt="error" style={{height:"100%"}} />
           </div>
          ) : (
            <Loader />
          )}
          <div id="PageChangeDiv">
            <img
              src={PrevPage}
              onClick={() => handlePrevChange(currentPage - 1)}
              alt="error"
            />
            <div>
              {currentPage} <span>Page number</span>
            </div>
            <img
              src={NextPage}
              onClick={() => handleNextChange(currentPage + 1)}
              alt="error"
            />
          </div>
        </div>
      </div>
      <Footer/>
      <PhoneFooter/>
      {loading ? <Loader /> : ""}
    </>
  );
}
