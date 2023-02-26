import Carousel from 'react-bootstrap/Carousel';
import tesla3 from '../assets/items/Model-3.jpeg'
import teslaS from '../assets/items/Model-S.jpeg'
import teslaX from '../assets/items/Model-X.jpeg'

function CarouselItems() {
  return (
    <Carousel style={{width: "1200px", marginLeft: "auto", marginRight: "auto", marginTop: "20px"}}>
      <Carousel.Item interval={2500}>
        <img
          className="d-block w-100"
          src={teslaS}
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2500}>
      <img
          className="d-block w-100"
          src={teslaS}
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img
          className="d-block w-100"
          src={teslaX}
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselItems;