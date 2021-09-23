import Home from "./Home";
import Graphs from "./Graphs";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={() => <Home />} />
          <Route exact path="/graphs" component={() => <Graphs />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
