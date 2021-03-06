import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import "./AppNavMenu.css";

function AppNavMenu() {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand class="navbar-brand mx-auto" href="#home">
                    <img
                        alt=""
                        src="logo192.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{" "}
                    Movie Game
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default AppNavMenu;
