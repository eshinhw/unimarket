import { useState } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";



function CardItem({ data }) {
  const [toggleProduct, setToggleProduct] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(data);

  const onClickHandler = (d) => {
    console.log("Ordering...");
    // window.alert("Order starts")
    console.log(d);
  };
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
                onClick={handleShow}
              >
                Purchase
              </Button>
              <Modal size="xl" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>{d.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Container>
                    <Row>
                      <Col>
                        <img src={d.image}></img>
                      </Col>
                      <Col>Inventory: {d.inventory.toNumber()}
                      Price: {d.cost}</Col>
                    </Row>
                  </Container>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleClose}>
                    Submit Order
                  </Button>
                </Modal.Footer>
              </Modal>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default CardItem;
