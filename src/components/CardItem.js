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
    setHasPurchased(false);
  };
  const handleShow = () => setShow(true);

  console.log("unimarket inside CardItem: ", unimarket);
  console.log(account);

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
          <Col sm={4} key={index}>
            <Card style={{ width: "20rem" }} key={index}>
              <Card.Img
                variant="top"
                src={d.image}
                style={{ maxHeight: "300px", width: "100%", height: "auto", objectFit: "contain" }}
              />
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
                            alt="Modal"
                          ></img>
                        </Col>
                        <Col style={{ fontSize: "20px" }}>
                          <div>
                            <p style={{ fontSize: "40px" }}>{modalData.name}</p>
                            <img
                              src={modalData.rating >= 1 ? star_solid : star_regular}
                              width="20px"
                              height="20px"
                              alt="Star"
                            />
                            <img
                              src={modalData.rating >= 2 ? star_solid : star_regular}
                              width="20px"
                              height="20px"
                              alt="Star"
                            />
                            <img
                              src={modalData.rating >= 3 ? star_solid : star_regular}
                              width="20px"
                              height="20px"
                              alt="Star"
                            />
                            <img
                              src={modalData.rating >= 4 ? star_solid : star_regular}
                              width="20px"
                              height="20px"
                              alt="Star"
                            />
                            <img
                              src={modalData.rating >= 5 ? star_solid : star_regular}
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

                            {modalData.inventory > 0 ? <p>In Stock.</p> : <p>Out of Stock.</p>}

                            <p>
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima rem,
                              iusto, consectetur inventore quod soluta quos qui assumenda aperiam,
                              eveniet doloribus commodi error modi eaque! Iure repudiandae
                              temporibus ex? Optio!
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
                          {new Date(Number(order.time.toString() + "000")).toLocaleDateString(
                            undefined,
                            {
                              weekday: "long",
                              hour: "numeric",
                              minute: "numeric",
                              second: "numeric",
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
