import React from 'react';
import faceImg from "/images/footer/facebook.png";
import instaImg from "/images/footer/instagram.png";
import twitterImg from "/images/footer/twitter.png";
import pin from "/images/footer/pinterest.png";
import map from "/images/footer/map.png";
import phone from "/images/footer/phone.png";
import gmail from "/images/footer/gmail.png";
import bg from "/images/footer/bgImg.webp";
import "./footer.css";

export default function Footer() {
  return (
    // background: url("images/footer/bgImg.png");
    <div id='mainFooter' style={{background:`url(${bg})`}}>
        <div id='footer'>
            <div id='descriptionFooter'>
                <h2>MarchandiseBingoo</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Quia doloribus qui, vitae quasi quibusdam molestiae voluptatibus,
                voluptate eaque rem nisi iusto error, magni voluptas soluta. 
                Consequuntur, officiis ipsum! Exercitationem, esse.</p>
                <div>
                    <img src={faceImg} alt="Error" />
                    <img src={instaImg} alt="Error" />
                    <img src={twitterImg} alt="Error" />
                    <img src={pin} alt="Error" />
                </div>
            </div>      
            <div id='middleFooter'>
                <div>
                    <h3>Company</h3>
                    <li>About us</li>
                    <li>Cart</li>
                    <li>Store Location</li>
                    <li>Our Blog</li>
                    <li>Reviews</li>
                </div>
                <div>
                <h3>Shop</h3>
                    <li>Game & videos</li>
                    <li>Phone & Tablets</li>
                    <li>Computers & Laptop</li>
                    <li>Sport Watches</li>
                    <li>Events</li>
                </div>
                <div>
                <h3>Support</h3>
                    <li>FAQ</li>
                    <li>Revies</li>
                    <li>Contact Us</li>
                    <li>Shipping</li>
                    <li>Live chat</li>
                </div>
            </div>      
            <div id='lastFooter'>
                <h2>Contact</h2>
                <div>
                    <img src={map} alt="error" />
                    <p>S-26 Sanjay nagar rajpur chungi,agra</p>
                </div>
                <div>
                    <img src={phone} alt="error" />
                    <p>+91 9397646250</p>
                </div>
                <div>
                    <img src={gmail} alt="error" />
                    <p>marchandiseBingoo@gmail.com</p>
                </div>
            </div>      
        </div>
        <div style={{textAlign:"center",paddingBottom:"10px",fontWeight:"bold"}}>
        © 2023 MarchandiseBingoo.com
        </div>
    </div>
  )
}
