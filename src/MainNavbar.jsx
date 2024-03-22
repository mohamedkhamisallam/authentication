import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

function MainNavbar(props) {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          {props.userDATA ? (
            <>
              <Nav className="ms-auto   d-flex justify-content-between">
                <span
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={props.logout}
                >
                  LogOut
                </span>
              </Nav>
            </>
          ) : (
            <>
              <Nav className="ms-auto  w-75 d-flex justify-content-between">
                <NavLink to="/register">SignUp</NavLink>
                <NavLink to="/login">Login</NavLink>
              </Nav>
            </>
          )}
        </Container>
      </Navbar>
    </>
  );
}

export default MainNavbar;
