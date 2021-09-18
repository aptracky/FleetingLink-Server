import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import PlaceHolder from './components/placeholder';


function App() {
  return (
    <Router>
      <div className="container">
        <Route path="/" component={PlaceHolder} />
      </div>
    </Router>
  );
}

export default App;
