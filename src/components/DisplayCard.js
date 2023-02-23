import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function DisplayCard({ data }) {
  console.log("DisplayCard");
  console.log(data.length);

  return (
    <div>
      <Row>
        {data.map((car, index) => (
          <Col sm={4}>
            <Card style={{ width: "20rem" }}>
              <Card.Img variant="top" src={car.image} />
              <Card.Body>
                <Card.Title>{data.model_name}</Card.Title>
                <Card.Text></Card.Text>
                <Button variant="primary">Purchase</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default DisplayCard;
