import OptionBorder from "./OptionBorder";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import React, { useState } from 'react';

const CreateGame = () => {
    const [userName, setUserName] = useState('');

    const userNameChanged = (event) => {
        setUserName(event.target.value);
    };

    const clickHandler = (event) => {
        console.log(userName);
        setUserName('');
    };

    return (
        <OptionBorder title="Create New Game">
            <InputGroup className="mb-3">
                <FormControl placeholder="User Name" onChange={userNameChanged} value={userName}></FormControl>
            </InputGroup>
            <Button variant="primary" onClick={clickHandler}>
                Create!
            </Button>
        </OptionBorder>
    );
};

export default CreateGame;
