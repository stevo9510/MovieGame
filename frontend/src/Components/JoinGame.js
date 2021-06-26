import OptionBorder from "./OptionBorder";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function JoinGame() {
    return (
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
                        placeholder="User Name"
                    ></Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Play!
                </Button>
            </Form>
        </OptionBorder>
    );
}

export default JoinGame;
