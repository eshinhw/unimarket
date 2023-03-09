import React, { useContext, useEffect, useState } from "react";
import StateContext from "../StateContext";
import { useParams } from "react-router-dom";
import "../css/ProductDetails.css";
import starSolid from "../assets/star-solid.svg";
import { Button } from "react-bootstrap";
import DispatchContext from "../DispatchContext"

function ProductDetails({ id, title, category, image, price, rating, inventory }) {
  const params = useParams();
  const state = useContext(StateContext);
  // const [show, setShow] = useState(false);
  // const [order, setOrder] = useState(null);
  // const [hasPurchased, setHasPurchased] = useState(false);
  const [currProduct, setCurrProduct] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const dispatch = useContext(DispatchContext);
  console.log(currProduct);
  console.log(state.products);

  const addToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { id, title, category, image, price, rating, inventory },
    });
  };

  const loadProduct = () => {
    const cp = state.products.filter((item) => item.id.toString() === params.id);
    setCurrProduct(cp[0]);
    setLoaded(true);
  };

  useEffect(() => {
    loadProduct();
  }, []);
  // const fetchOrderDetails = async () => {
  //   // query all events
  //   if (modalData === null) return;
  //   const events = await unimarket.queryFilter("Purchase");
  //   console.log("events: ", events);
  //   const orders = events.filter(
  //     (event) =>
  //       event.args.buyer === account && event.args.itemId.toString() === modalData.id.toString()
  //   );

  //   console.log("orders: ", orders);

  //   if (orders.length === 0) return;

  //   const order = await unimarket.orders(account, orders[0].args.orderId);
  //   setOrder(order);
  // };
  return (
    <div className="product__details">
      {loaded ? (
        <>
          <div className="product__details__image">
            <img src={currProduct.image} alt="" />
          </div>
          <div className="product__details__description">
            <h1>{currProduct.name}</h1>
            <h2>{currProduct.category}</h2>
            <div className="product__details__rating">
              {Array(rating)
                .fill()
                .map((_, i) => (
                  <img key={i} src={starSolid} alt="" />
                ))}
            </div>
            <h2>{Number(currProduct.price)} ETH</h2>
            <h3>
              {Number(currProduct.inventory) > 0 ? "In Stock, FREE DELIVERY" : "Out of Stock"}
            </h3>
            <div className="manage__buttons">
              <Button onClick={addToCart}>Add to Cart</Button>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ProductDetails;

{
  /* <Modal size="xl" show={show} onHide={handleClose}>
<Modal.Header closeButton>
  <Modal.Title>{title}</Modal.Title>
</Modal.Header>
<Modal.Body>
  <Container>
    <Row>
      <Col>
        <img
          src={image}
          style={{ display: "block", margin: "auto", width: "400px", height: "400px" }}
          alt="Modal"
        ></img>
      </Col>
      <Col style={{ fontSize: "20px" }}>
        <div>
          <p style={{ fontSize: "40px" }}>{title}</p>
          <img
            src={rating >= 1 ? star_solid : star_regular}
            width="20px"
            height="20px"
            alt="Star"
          />
          <img
            src={rating >= 2 ? star_solid : star_regular}
            width="20px"
            height="20px"
            alt="Star"
          />
          <img
            src={rating >= 3 ? star_solid : star_regular}
            width="20px"
            height="20px"
            alt="Star"
          />
          <img
            src={rating >= 4 ? star_solid : star_regular}
            width="20px"
            height="20px"
            alt="Star"
          />
          <img
            src={rating >= 5 ? star_solid : star_regular}
            width="20px"
            height="20px"
            alt="Star"
          />

          <p>
            FREE delivery <br />
            <strong>
              {new Date(Date.now() + 345600000).toLocaleDateString(undefined, {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </strong>
          </p>

          {inventory > 0 ? <p>In Stock.</p> : <p>Out of Stock.</p>}

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima rem, iusto,
            consectetur inventore quod soluta quos qui assumenda aperiam, eveniet doloribus
            commodi error modi eaque! Iure repudiandae temporibus ex? Optio!
          </p>
        </div>
      </Col>
    </Row>
  </Container>
</Modal.Body>
<Modal.Footer>
  {order ? (
    <div>
      Item bought on <br />
      <strong>
        {new Date(Number(order.time.toString() + "000")).toLocaleDateString(undefined, {
          weekday: "long",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        })}
      </strong>
    </div>
  ) : (
    <div>Price: {price} ETH</div>
  )}
  <Button variant="primary">
    Place Order
  </Button>
  <Button variant="secondary" onClick={handleClose}>
    Close
  </Button>
</Modal.Footer>
</Modal> */
}
