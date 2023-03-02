import bannerImg1 from "../assets/banner-img-1.jpg";
import bannerImg2 from "../assets/banner-img-2.jpg";
import "../css/HomePage.css"

const HomePage = () => {
  return (
    <div className="home">
      <div className="home__container">
        {/* <img src={bannerImg1} /> */}
        <img className="home__image" src={bannerImg2} />
      </div>
      <div className="home__row">
        {/* Product */}
      </div>
    </div>
  );
};

export default HomePage;
