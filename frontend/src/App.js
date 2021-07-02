import "./App.css";
import AppNavMenu from "./Components/AppNavMenu";
import HomePage from "./Pages/HomePage";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import MovieTypeahead from "./Components/MovieTypeahead";

function App() {
    return (
        <Router>
            <div className="App">
                <AppNavMenu></AppNavMenu>
                <MovieTypeahead></MovieTypeahead>
                <Switch>
                    <Route path="/" component={HomePage} exact />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
