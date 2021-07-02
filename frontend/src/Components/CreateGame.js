import OptionBorder from "./OptionBorder";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import React, { useState } from "react";
import socket from "../Socket";
import axios from "axios";

const CreateGame = () => {
    const [userName, setUserName] = useState("");

    const userNameChanged = (event) => {
        setUserName(event.target.value);
    };

    const clickHandler = (event) => {
        socket.on("player joined", (data) => {
            console.log("in player joined");
            console.log(data);
        });
        const url = "http://localhost:3000/api/create";
        const data = {
            userName: userName,
        };
        axios({
            method: "POST",
            url: url,
            data: data,
        }).then((resp) => {
            socket.auth = { gameId: resp.data.gameId, userName: userName };
        });

        socket.connect();
        console.log(userName);
        setUserName("");
    };

    return (
        <OptionBorder title="Create New Game">
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="User Name"
                    onChange={userNameChanged}
                    value={userName}
                ></FormControl>
            </InputGroup>
            <Button variant="primary" onClick={clickHandler}>
                Create!
            </Button>
        </OptionBorder>
    );
};

export default CreateGame;
