import OptionBorder from "./OptionBorder";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import React, { useState } from "react";

const JoinGame = () => {
    const [userName, setUserName] = useState("");
    const [gameCode, setGameCode] = useState("");
    const MAX_GAME_CODE_SIZE = 5;

    const userNameChanged = (event) => {
        setUserName(event.target.value);
    };

    const gameCodeChanged = (event) => {
        var cleanedInput = event.target.value
            .replace(/[^0-9a-z]/gi, "")
            .toUpperCase();

        if (cleanedInput.length > MAX_GAME_CODE_SIZE) {
            event.preventDefault();
        } else {
            setGameCode(cleanedInput);
        }
    };

    return (
        <OptionBorder title="Join Existing Game">
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="5 Letter Game Code"
                    value={gameCode}
                    onChange={gameCodeChanged}
                ></FormControl>
            </InputGroup>
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="User Name"
                    value={userName}
                    onChange={userNameChanged}
                ></FormControl>
            </InputGroup>
            <Button variant="primary">Play!</Button>
        </OptionBorder>
    );
};

export default JoinGame;
