import { useState } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

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
              {show ? (<Modal size="xl" show={show} onHide={handleClose} index={index}>
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
                        <div>
                          <p style={{ fontSize: "20px" }}>
                            <h1 style={{ display: "inline", fontSize: "25px" }}>Price: </h1>{" "}
                            {modalData.cost} ETH
                          </p>
                          <p style={{ fontSize: "20px" }}>
                            <h1 style={{ display: "inline", fontSize: "25px" }}>Inventory: </h1>{" "}
                            {modalData.inventory.toNumber()}
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
              </Modal>) : (<></>)}
              
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default CardItem;
