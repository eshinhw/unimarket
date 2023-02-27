import { useEffect, useState } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import star_regular from "../assets/star-regular.svg";
import star_solid from "../assets/star-solid.svg";

function CardItem({ data, unimarket, provider, account }) {
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [order, setOrder] = useState(null);
  const [hasPurchased, setHasPurchased] = useState(false);

  const handleClose = () => {
    setShow(false);
    setModalData(null);
    setOrder(null);
  };
  const handleShow = () => setShow(true);

  console.log("unimarket inside CardItem: ", unimarket);

  const fetchOrderDetails = async () => {
    // query all events
    if (modalData === null) return;
    const events = await unimarket.queryFilter("Purchase");
    console.log("events: ", events);
    const orders = events.filter(
      (event) =>
        event.args.buyer === account && event.args.itemId.toString() === modalData.id.toString()
    );

    console.log("orders: ", orders);

    if (orders.length === 0) return;

    const order = await unimarket.orders(account, orders[0].args.orderId);
    setOrder(order);
  };

  const buyHandler = async () => {
    const signer = await provider.getSigner();
    console.log("signer: ", signer);
    let transaction = unimarket
      .connect(signer)
      .purchase(modalData.id, { value: Number(modalData.cost) });
    await transaction.wait();
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [hasPurchased, modalData]);

  return (
    <div>
      <Row>
        {data.map((d, index) => (
          <Col sm={4}>
            <Card style={{ width: "20rem" }} key={index}>
              <Card.Img variant="top" src={d.image} />
              <Card.Title style={{ textAlign: "center", marginTop: "20px", fontSize: "20px" }}>
                <b>{d.name}</b>
              </Card.Title>
              <Card.Body style={{ marginLeft: "auto", marginRight: "auto" }}>
                <div>
                  <img
                    src={d.rating >= 1 ? star_solid : star_regular}
                    width="20px"
                    height="20px"
                    alt="Star"
                  />
                  <img
                    src={d.rating >= 2 ? star_solid : star_regular}
                    width="20px"
                    height="20px"
                    alt="Star"
                  />
                  <img
                    src={d.rating >= 3 ? star_solid : star_regular}
                    width="20px"
                    height="20px"
                    alt="Star"
                  />
                  <img
                    src={d.rating >= 4 ? star_solid : star_regular}
                    width="20px"
                    height="20px"
                    alt="Star"
                  />
                  <img
                    src={d.rating >= 5 ? star_solid : star_regular}
                    width="20px"
                    height="20px"
                    alt="Star"
                  />
                </div>
                <p
                  style={{
                    textAlign: "center",
                    marginTop: "10px",
                    marginBottom: "10px",
                    fontSize: "18px",
                  }}
                >
                  {d.cost} ETH
                </p>
              </Card.Body>
              <Button
                variant="primary"
                style={{ marginLeft: "auto", marginRight: "auto", marginBottom: "10px" }}
                onClick={() => {
                  setModalData(d);
                  handleShow();
                }}
              >
                Order
              </Button>
              {show ? (
                <Modal size="xl" show={show} onHide={handleClose} index={index}>
                  <Modal.Header closeButton>
                    <Modal.Title>{modalData.name}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Container>
                      <Row>
                        <Col>
                          <img
                            src={modalData.image}
                            style={{ display: "block", margin: "auto" }}
                          ></img>
                        </Col>
                        <Col style={{ fontSize: "20px" }}>
                          <div>
                            <p>
                              <h1 style={{ display: "inline", fontSize: "25px" }}>Price: </h1>{" "}
                              {modalData.cost} ETH
                            </p>
                            <p>
                              <h1 style={{ display: "inline", fontSize: "25px" }}>Inventory: </h1>{" "}
                              {modalData.inventory.toNumber()}
                            </p>
                            <p>
                              <h1 style={{ display: "inline", fontSize: "25px" }}>
                                Product Details:{" "}
                              </h1>{" "}
                            </p>
                          </div>
                        </Col>
                      </Row>
                    </Container>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                      Place Order
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              ) : (
                <></>
              )}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default CardItem;
