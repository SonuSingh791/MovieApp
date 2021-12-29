
import './App.css';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import Movies from './Components/Movies';
import Favourite from './Components/Favourite';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Switch>
          <Route exact path="/">
            <Banner/>
            <Movies/>
          </Route>
          <Route exact path="/favourites">
            <Favourite/>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
