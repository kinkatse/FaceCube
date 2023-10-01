import { Route, Switch } from 'react-router-dom'
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/">
          <h1>Hello from App</h1>
        </Route>
        <Route path="/login">
          <LoginForm/>
        </Route>
      </Switch>
    </main>
  );
}

export default App;
