import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import About from './components/about/about';
import Contact from "./components/contact/contact";
import Homepage from './components/homepage/homepage';
import ForgotPass from './components/forgotPass/forgotPass';
import CartPage from './components/cart/cart';
import Wishlist from './components/wishlist/wishlist';

import Women from './components/homepage/categories/women/women';
import Bags from './components/homepage/categories/bag/bag';
import Book from './components/homepage/categories/book/book';
import Men from './components/homepage/categories/men/men';
import Mobile from './components/homepage/categories/mobile/mobile';
import Electronics from './components/homepage/categories/electronics/electronics';

import BagMen from './components/homepage/categories/bag/menBag/men';
import BagWomen from './components/homepage/categories/bag/womenBag/women';

import BookCate from './components/homepage/categories/book/book/books';

import SareeWomen from './components/homepage/categories/women/sarees/sarees';
import JacketWomen from './components/homepage/categories/women/jackets/jackets';
import JeansWomen from './components/homepage/categories/women/jeans/jeans';
import TopWomen from './components/homepage/categories/women/tops/tops';
import ShirtWomen from './components/homepage/categories/women/shirts/shirts';
import LehengaWomen from './components/homepage/categories/women/lahenga/lehenga';

import ShirtMen from './components/homepage/categories/men/shirts/shirts';
import ShoesMen from './components/homepage/categories/men/shoes/shoes';
import TShirtMen from './components/homepage/categories/men/t-shirts/t-shirts';
import JeansMen from './components/homepage/categories/men/jeans/jeans';
import BlazerMen from './components/homepage/categories/men/blazers/blazers';
import JacketMen from './components/homepage/categories/men/jackets/jackets';

import SamsungMobile from './components/homepage/categories/mobile/samsung/samsung';
import VivoMobile from './components/homepage/categories/mobile/vivo/vivo';
import RealmeMobile from './components/homepage/categories/mobile/realme/realme';
import PocoMobile from './components/homepage/categories/mobile/poco/poco';
import IPhoneMobile from './components/homepage/categories/mobile/iPhone/iPhone';

import GamingConsolesElectronics from './components/homepage/categories/electronics/gamingConsole/gamingConsoles';
import HeadphoneElectronics from './components/homepage/categories/electronics/headphones/headphones';
import LaptopElectronics from './components/homepage/categories/electronics/laptop/laptop';
import SpeakerElectronics from './components/homepage/categories/electronics/speakers/speakers';
import TelevisionElectronics from './components/homepage/categories/electronics/televisions/televisions';

import BuyPage from './components/homepage/buyPage/buyPage';
import SearchPage from './components/searchPage/searchPage';
import AddAddress from './components/homepage/user/addAddress/addAddress';
import MyAccount from './components/homepage/user/myAccount/myAccount';
import PageNotFound from './components/pageNotFound/pageNotFound';
import UnauthorizedUser from './components/unauthorizedUser/unauthorizedUser';
import Payment from './components/payment/payment';
import MyOrders from './components/homepage/user/myOrders/myOrders';
import ProductOrderPage from './components/homepage/user/myOrders/productOrderPage/productOrderPage';
import './App.css';

function App() {

  return (
    <>
      <div id='mainApp'>
        <Router>
          <Routes>
            <Route path='/' element={<Homepage/>}/>
            <Route path='/login' element={<Login/>}/>
            {/* <Route path='/forgotpassword' element={<ForgotPass/>}/> */}
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/cart' element={<CartPage/>}/>
            <Route path='/wishlist' element={<Wishlist/>}/>
            
            <Route path="/addAddress" element={<AddAddress/>}/>
            <Route path='/myAccount' element={<MyAccount/>}/>
            <Route path="/myOrders" element={<MyOrders/>}/>
            <Route path='/productOrderPage' element={<ProductOrderPage/>}/>
            <Route path='/category/bags' element={<Bags/>}/>
            <Route path='/category/book' element={<Book/>}/>
            <Route path='/category/women' element={<Women/>}/>
            <Route path='/category/men' element={<Men/>}/>
            <Route path='/category/mobile' element={<Mobile/>}/>
            <Route path='/category/electronics' element={<Electronics/>}/>

            <Route path='/category/bags/womenBags' element={<BagWomen/>}/> 
            <Route path='/category/bags/menBags' element={<BagMen/>}/>

            <Route path='/category/book/books' element={<BookCate/>}/> 

            <Route path='/category/women/sarees' element={<SareeWomen/>}/> 
            <Route path='/category/women/jackets' element={<JacketWomen/>}/> 
            <Route path='/category/women/jeans' element={<JeansWomen/>}/> 
            <Route path='/category/women/tops' element={<TopWomen/>}/> 
            <Route path='/category/women/shirts' element={<ShirtWomen/>}/>
            <Route path='/category/women/lehengas' element={<LehengaWomen/>}/>  

            <Route path='/category/men/shirts' element={<ShirtMen/>}/> 
            <Route path='/category/men/shoes' element={<ShoesMen/>}/> 
            <Route path='/category/men/tShirts' element={<TShirtMen/>}/> 
            <Route path='/category/men/jeans' element={<JeansMen/>}/> 
            <Route path='/category/men/blazers' element={<BlazerMen/>}/> 
            <Route path='/category/men/jackets' element={<JacketMen/>}/> 

            <Route path='/category/mobile/samsung' element={<SamsungMobile/>}/>
            <Route path='/category/mobile/vivo' element={<VivoMobile/>}/>
            <Route path='/category/mobile/realme' element={<RealmeMobile/>}/>
            <Route path='/category/mobile/poco' element={<PocoMobile/>}/>
            <Route path='/category/mobile/iPhone' element={<IPhoneMobile/>}/>

            <Route path='/category/electronics/televisions' element={<TelevisionElectronics/>}/>
            <Route path='/category/electronics/headphones' element={<HeadphoneElectronics/>}/>
            <Route path='/category/electronics/speakers' element={<SpeakerElectronics/>}/>
            <Route path='/category/electronics/gamingConsoles' element={<GamingConsolesElectronics/>}/>
            <Route path='/category/electronics/laptops' element={<LaptopElectronics/>}/>

            <Route path='/buyPage' element={<BuyPage/>}/>
            <Route path='/search' element={<SearchPage/>} />
            <Route path="/unauthorize" element={<UnauthorizedUser/>}/>
            <Route path="/buyProduct" element={<Payment/>}/>
            <Route path='*' element={<PageNotFound/>}/>
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
