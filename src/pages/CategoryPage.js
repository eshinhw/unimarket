import { useContext } from "react";
import { useSelector } from "react-redux";
import { DataContext } from "../App";
import CardItem from "../components/CardItem";
import Navigation from "../components/Navigation";

const CategoryPage = ({ title, data }) => {
  // const items = useSelector((state) => state.payload);
  const dataContext = useContext(DataContext);


  console.log(title);
  console.log(data);
  console.log(dataContext);
  return (
    <>
      <Navigation />
      <div className="cards__section">
        <h3>{title}</h3>
        <hr />
        <CardItem data={data} />
      </div>
    </>
  );
};

export default CategoryPage;
