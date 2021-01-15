import { Container } from "react-bootstrap";
import Navbar from "./components/navigation";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RegisterForm from "./components/form";
import List from "./components/list";

function App() {
  return (
    <Router>
      <Container className="pt-3">
        <Navbar />
        <Switch>
          <Route path="/list">
            <List />
          </Route>
          <Route path="/">
            <RegisterForm />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
