import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Create from './components/create';
import Privacy from './components/privacy';
import Login from './components/login';
import PageNotFound from './components/404';


function App() {
  return (
    <Router>
      <Switch>
          <Route exact path="/" component={Create} />
          <Route exact path="/privacy" component={Privacy} />
          <Route exact path="/login" component={Login} />
          <Route component={PageNotFound} />
        </Switch>
    </Router>
  );
}

export default App;
