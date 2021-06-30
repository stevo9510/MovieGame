import Card from "react-bootstrap/Card";
import "./PlayerElement.css";

const PlayerElement = (props) => {
    let strikes = "";
    for (var i = 0; i < props.strikes; i++) {
        strikes += "X ";
    }

    return (
        <Card
            text="light"
            className="PlayerCard"
            style={{
                backgroundColor: props.color,
            }}
        >
            <Card.Header className="PlayerHeader">{props.userName}</Card.Header>
            <Card.Body className="PlayerBody">
                <Card.Title>{props.status}</Card.Title>
                <div className="Strikes">{strikes}</div>
            </Card.Body>
        </Card>
    );
};

export default PlayerElement;
