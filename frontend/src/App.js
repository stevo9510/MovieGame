import "./App.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

function App() {
    return (
        <div className="App">
            <AppNavMenu></AppNavMenu>
            <header className="App-header">
                <OptionBorder title="Join Existing Game">
                    <Form>
                        <Form.Group className="mb-3" controlId="formGameCode">
                            <Form.Control
                                type="text"
                                placeholder="5 Letter Game Code"
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Control
                                type="text"
                                placeholder="Name"
                            ></Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Play!
                        </Button>
                    </Form>
                </OptionBorder>
                <div class="w-25" style={{ margin: "25px" }}>
                    <hr></hr>
                </div>
                <OptionBorder title="Create New Game">
                    <Form>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Control
                                type="text"
                                placeholder="Name"
                            ></Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Create!
                        </Button>
                    </Form>
                </OptionBorder>
            </header>
        </div>
    );
}

function OptionBorder(props) {
    return (
        <div className="OptionBorderStyle">
            <h4 style={{ margin: "15px" }}>{props.title}</h4>
            {props.children}
        </div>
    );
}

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

export default App;
