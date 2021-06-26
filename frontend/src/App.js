import "./App.css";
import AppNavMenu from "./Components/AppNavMenu";
import JoinGame from "./Components/JoinGame";
import CreateGame from "./Components/CreateGame";

function App() {
    return (
        <div className="App">
            <AppNavMenu></AppNavMenu>
            <header className="App-header">
                <JoinGame />
                <div class="w-25" style={{ margin: "25px" }}>
                    <hr></hr>
                </div>
                <CreateGame />
            </header>
        </div>
    );
}

export default App;
