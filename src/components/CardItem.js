import { useState } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import star_regular from "../assets/star-regular.svg";
import star_solid from "../assets/star-solid.svg";

function CardItem({ data }) {
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Row>
        {data.map((d, index) => (
          <Col sm={4}>
            <Card style={{ width: "20rem" }}>
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
