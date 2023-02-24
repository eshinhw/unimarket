import { ethers } from "ethers";
import DisplayCard from "./CardItem";

// Components
import Rating from "./Rating";

const Section = ({ title, cars, setToggle }) => {
  return (
    <div className="cards__section">
      <h3>{title}</h3>
      <hr />
      <DisplayCard data={cars} />
    </div>
  );
};

export default Section;

{
  /* <Rating value={car.rating} /> */
}
// <p>{ethers.utils.formatUnits(car.cost.toString(), "ether")} ETH</p>
