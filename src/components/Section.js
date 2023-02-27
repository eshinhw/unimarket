import CardItem from "./CardItem";

const Section = ({ title, cars, setToggle, unimarket, provider, account }) => {
  console.log("provider inside Section: ", provider);
  return (
    <div className="cards__section">
      <h3>{title}</h3>
      <hr />
      <CardItem data={cars} unimarket={unimarket} provider={provider} account={account} />
    </div>
  );
};

export default Section;
