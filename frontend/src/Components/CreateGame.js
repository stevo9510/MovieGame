import OptionBorder from "./OptionBorder";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function CreateGame() {
    return (
        <OptionBorder title="Create New Game">
            <Form>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Control
                        type="text"
                        placeholder="User Name"
                    ></Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Create!
                </Button>
            </Form>
        </OptionBorder>
    );
}

export default CreateGame;
