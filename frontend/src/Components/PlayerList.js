import PlayerElement from "./PlayerElement";

const PlayerList = (props) => {
    return (
        <div style={{width: "18rem"}}>
            <PlayerElement
                strikes="2"
                color="red"
                userName="First"
                status="alive"
            ></PlayerElement>
            <PlayerElement
                strikes="1"
                color="blue"
                userName="Second"
                status="alive"
            ></PlayerElement>
            <PlayerElement
                strikes="3"
                color="green"
                userName="Someone"
                status="eliminated"
            ></PlayerElement>
        </div>
    );
};

export default PlayerList;
