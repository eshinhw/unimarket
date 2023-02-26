import { ethers } from "ethers";
import CardItem from "./CardItem";

// Components
import Rating from "./Rating";

const Section = ({ title, cars, setToggle, unimarket, provider }) => {
  console.log("provider inside Section: ", provider);
  return (
    <div className="cards__section">
      <h3>{title}</h3>
      <hr />
      <CardItem data={cars} unimarket={unimarket} provider={provider} />
    </div>
  );
};

export default Section;

{
  /* <Rating value={car.rating} /> */
}
// <p>{ethers.utils.formatUnits(car.cost.toString(), "ether")} ETH</p>
