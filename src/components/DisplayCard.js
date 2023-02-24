import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import teslaX from "../assets/items/Model-X.jpeg";

function DisplayCard({ data }) {
  console.log("DisplayCard");
  console.log(data.length);

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
              >
                Purchase
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default DisplayCard;
