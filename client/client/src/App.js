import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PageNotFound from './components/404';
import Create from './components/create';

function App() {
  return (
    <Router>
      <Switch>
          <Route exact path="/" component={Create} />
          <Route component={PageNotFound} />
        </Switch>
    </Router>
  );
}
export default App;
