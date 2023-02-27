import { Button, Container, Nav, Navbar } from "react-bootstrap";

const Navigation = ({ props }) => {
  const account = props[5];
  const connectHandler = async () => {
    if (account === null) {
      window.alert("Please set up MetaMask on your Chrome.");
    }
  };

  const logoutHandler = () => {};

  const handleOnClick = (e) => {
    const currText = e.target.innerText;

    if (currText === "ELECTRIC CARS") {
      props[0](true);
      props[1](false);
      props[2](false);
      props[3](false);
      props[4](false);
    }
    if (currText === "PERSONAL GADGETS") {
      props[0](false);
      props[1](true);
      props[2](false);
      props[3](false);
      props[4](false);
    }
    if (currText === "BOOKS & MAGAZINES") {
      props[0](false);
      props[1](false);
      props[2](true);
      props[3](false);
      props[4](false);
    }
    if (currText === "CLOTHING") {
      props[0](false);
      props[1](false);
      props[2](false);
      props[3](true);
      props[4](false);
    }
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Nav.Link href="/" style={{ fontSize: "50px" }}>
            UniMarket
          </Nav.Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav style={{ marginRight: "15px" }} className="justify-content-center">
            <Nav.Link onClick={(e) => handleOnClick(e)}>ELECTRIC CARS</Nav.Link>
            <Nav.Link onClick={(e) => handleOnClick(e)}>PERSONAL GADGETS</Nav.Link>
            <Nav.Link onClick={(e) => handleOnClick(e)}>BOOKS & MAGAZINES</Nav.Link>
            <Nav.Link onClick={(e) => handleOnClick(e)}>CLOTHING</Nav.Link>
          </Nav>
          {account ? (
            <>
              <div>
                <Button onClick={logoutHandler} style={{ marginRight: "15px" }}>
                  Logout
                </Button>
                <Button onClick={connectHandler}>
                  {account.slice(0, 5) + "..." + account.slice(38, 42)}
                </Button>
              </div>
            </>
          ) : (
            <Button onClick={connectHandler}>CONNECT TO METAMASK</Button>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
