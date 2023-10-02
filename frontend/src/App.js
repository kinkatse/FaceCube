import { Route, Switch } from 'react-router-dom'
import LoginForm from "./components/LoginForm";
import Modal from './components/Modal';
import NavBar from './components/NavBar';
import SignupForm from './components/SignupForm';

const App = () => {
  return (
    <>
      <NavBar/>
      <Modal />
      <main id='content'>
        <Switch>
          <Route exact path="/">
            <h2>Home Page</h2>
            <h2>Home Page</h2>
          </Route>
          <Route path="/video/:videoId">
            <h1>Video Show Page</h1>
          </Route>
          <Route path="/channel/:channelId">
            <h1>Channel Show Page</h1>
          </Route>
          <Route path="/search">
            <h1>Search Page</h1>
          </Route>
          <Route path="/studio">
            <h1>Studio Page</h1>
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
