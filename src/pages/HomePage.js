import bannerImg2 from "../assets/banner-img-2.jpg";
import "../css/HomePage.css";
import Product from "../components/Product";
import testData from "../testData.json";

const HomePage = () => {
  console.log(testData);
  return (
    <div className="home">
      <div className="home__container">
        <img className="home__image" src={bannerImg2} />
        <div className="home__row">
          {testData.data.map((item, idx) => (
            <Product
              className="home__row__item"
              id={item.id}
              title={item.name}
              category={item.category}
              image={item.image}
              price={item.price}
              rating={item.rating}
              inventory={item.inventory}
              key={idx}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
