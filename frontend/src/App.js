import { Route, Switch } from 'react-router-dom'
import LoginForm from "./components/LoginForm";
import Navigation from './components/Navigation';
import SignupForm from './components/SignupForm';

function App() {
  return (
    <main>
      <Navigation/>
      <Switch>
        <Route exact path="/">
          <h1>Hello from App</h1>
        </Route>
        <Route path="/login">
          <LoginForm/>
        </Route>
        <Route path="/signup">
          <SignupForm/>
        </Route>
      </Switch>
    </main>
  );
}

export default App;
