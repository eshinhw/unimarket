import { useEffect, useState } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

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
              <Card.Body style={{ marginLeft: "auto", marginRight: "auto" }}>
                <Card.Title>{d.name}</Card.Title>
                <Card.Text></Card.Text>
              </Card.Body>
              <Button
                variant="primary"
                style={{ marginLeft: "auto", marginRight: "auto", marginBottom: "20px" }}
                onClick={() => {
                  setModalData(d);
                  handleShow();
                }}
              >
                Purchase
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
                        <Col>
                          <div style={{ fontSize: "20px" }}>
                            <p>
                              <strong>{modalData.name}</strong>
                            </p>
                            <p>
                              <h1 style={{ display: "inline", fontSize: "25px" }}>Price: </h1>{" "}
                              {modalData.cost} ETH
                            </p>

                            {d.inventory > 0 ? <p>In Stock.</p> : <p>Sold Out.</p>}

                            <p>
                              FREE DELIVERY
                              <br />
                              <strong>
                                {new Date(Date.now() + 345600000).toLocaleDateString(undefined, {
                                  weekday: "long",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </strong>
                            </p>
                            <div style={{ fontSize: "12px" }}>
                              <p>
                                Ship from UniMarket
                                <br />
                                Sold by UniMarket
                              </p>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Container>
                  </Modal.Body>
                  <Modal.Footer>
                    {order ? (
                      <div>
                        Item bought on{" "}
                        <strong>
                          {new Date(Number(order.time.toString() + "000")).toLocaleDateString(
                            undefined,
                            {
                              weekday: "long",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </strong>
                      </div>
                    ) : (
                      <div>Price: {modalData.cost} ETH</div>
                    )}
                    <Button variant="primary" onClick={buyHandler}>
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
