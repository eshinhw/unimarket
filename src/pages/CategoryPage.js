import { prettyFormat } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import sampleData from "../testData.json";
import "../css/CategoryPage.css"

function CategoryPage({ category }) {
  const [products, setProducts] = useState(null);
  const [loaded, setLoaded] = useState(false);

  console.log(category);
  const loadProducts = async () => {
    const products = await sampleData.data.filter((item) => item.category === category);
    console.log(products);
    setProducts(products);
    setLoaded(true);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="category__page">
      <p>{category}</p>
      <br />
      {loaded ? (
        <div className="home__row">
          {products.map((item, idx) => (
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
      ) : (
        <></>
      )}
    </div>
  );
}

export default CategoryPage;
