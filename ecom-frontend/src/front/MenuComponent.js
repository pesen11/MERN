import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const MenuComponent = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="me-auto">
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
          <NavLink className="nav-link" to="/register">
            Register
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MenuComponent;
