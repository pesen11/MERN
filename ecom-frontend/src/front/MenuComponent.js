import { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

const MenuComponent = () => {
  const localUser = JSON.parse(localStorage.getItem("auth_user") ?? null);

  let [totalItems, setTotalItems] = useState();

  const total = useSelector((store) => {
    let items = 0;
    store.cart.cartDetail.map((item) => (items += item.qty));
    return items;
  });
  useEffect(() => {
    setTotalItems(total);
  }, [total]);
  // console.log(totalItems);
  // console.log(localUser);
  let navigate = useNavigate();
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="me-auto">
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
          {!localUser && (
            <>
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
            </>
          )}

          <NavLink to={"/cart"} className="nav-link">
            {" "}
            Cart ({totalItems})
          </NavLink>
          {localUser && (
            <>
              <NavLink className="nav-link" to={"/" + localUser.role[0]}>
                {localUser.name}
              </NavLink>
              <NavLink
                className="nav-link"
                to="/login"
                onClick={(e) => {
                  e.preventDefault();
                  localStorage.removeItem("auth_user");
                  localStorage.removeItem("auth_token");
                  navigate("/login");
                }}
              >
                Logout
              </NavLink>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MenuComponent;
