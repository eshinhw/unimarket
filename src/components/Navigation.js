import { ethers } from "ethers";
import { Button, Container, Nav, Navbar } from "react-bootstrap";

const Navigation = ({ account, setAccount }) => {
  const connectHandler = () => {
    console.log("connecting...");
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Nav.Link href="/" style={{fontSize: "50px"}}>UniMarket</Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav style={{ marginRight: "15px" }} className="justify-content-center">
          <Nav.Link>ELECTRIC CARS</Nav.Link>
          <Nav.Link>PERSONAL GADGETS</Nav.Link>
          <Nav.Link>BOOKS & MAGAZINES</Nav.Link>
          <Nav.Link>CLOTHING</Nav.Link>
        </Nav>
        <Button>CONNECT</Button>
      </Container>
    </Navbar>

    //   {account ? (
    //     <button type="button" className="nav__connect">
    //       {account.slice(0, 5) + "..." + account.slice(38, 42)}
    //     </button>
    //   ) : (
    //     <button type="button" className="nav__connect" onClick={connectHandler}>
    //       Connect to MetaMask
    //     </button>
    //   )}
    // </nav>
  );
};

export default Navigation;
