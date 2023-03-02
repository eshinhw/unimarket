import bannerImg1 from "../assets/banner-img-1.jpg";
import bannerImg2 from "../assets/banner-img-2.jpg";
import "../css/HomePage.css";
import Product from "./Product";

const HomePage = () => {
  return (
    <div className="home">
      <div className="home__container">
        {/* <img src={bannerImg1} /> */}
        <img className="home__image" src={bannerImg2} />
        <div className="home__row">
          <Product
            title='ASUS Chromebook C403 Rugged & Spill Resistant Laptop, 14.0\" HD, 180 Degree, Intel Celeron N3350 Processor, 4GB RAM, 32GB eMMC, MIL-STD 810G Durability, Dark Grey, Education, Chrome OS, C403NA-Q2-CB'
            price={179.99}
            image="https://m.media-amazon.com/images/I/71dU9NRTzqL._AC_SL1500_.jpg"
            rating={4}
          />
          <Product
            title="2K Security Cameras Wireless Outdoor Solar Battery Powered WiFi Camera 3MP Surveillance Camera for Home Security Outside/Indoor with Spotlight Siren, Motion Detection, Color Night Vision,Two-Way Audio"
            price={71.99}
            image="https://m.media-amazon.com/images/I/71VXQ30gGsL._AC_SL1500_.jpg"
            rating={3}
          />
        </div>
        <div className="home__row">
          <Product
            title="Start with Why: How Great Leaders Inspire Everyone to Take Action"
            price={23.99}
            image="https://m.media-amazon.com/images/I/71K9EcfzJ4L.jpg"
            rating={4}
          />
          <Product
            title="The Rust Programming Language, 2nd Edition"
            price={59.93}
            image="https://m.media-amazon.com/images/I/61BJFgaVnyL.jpg"
            rating={5}
          />
          <Product
            title="The Staff Engineer's Path: A Guide for Individual Contributors Navigating Growth and Change"
            price={52.01}
            image="https://m.media-amazon.com/images/I/813cTBVF1hL.jpg"
            rating={2}
          />
        </div>

        <div className="home__row">
          <Product
            title="Sceptre 30-inch Curved Gaming Monitor 21:9 2560x1080 Ultra Wide/Slim HDMI DisplayPort up to 200Hz Build-in Speakers, Metal Black (C305B-200UN1)"
            price={351.74}
            image="https://m.media-amazon.com/images/I/612RvBYr4fL._AC_SL1417_.jpg"
            rating={5}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
