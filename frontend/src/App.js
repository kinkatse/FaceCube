import { Route, Switch } from 'react-router-dom'
import LoginForm from "./components/LoginForm";
import SignupForm from './components/SignupForm';

function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/">
          <h1>Hello from App</h1>
        </Route>
        <Route path="/auth">
          <LoginForm/>
          <SignupForm/>
        </Route>
      </Switch>
    </main>
  );
}

export default App;
