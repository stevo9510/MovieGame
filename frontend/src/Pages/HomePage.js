import JoinGame from "../Components/JoinGame";
import CreateGame from "../Components/CreateGame";

const HomePage = () => {
    return (
        <header className="App-header">
            <JoinGame />
            <div class="w-25" style={{ margin: "25px" }}>
                <hr></hr>
            </div>
            <CreateGame />
        </header>
    );
};

export default HomePage;