import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch } from "react-router-dom";
import { UserProvider } from "./Context/appStore";
import history from "./history";
import PrivateRoute from "./Components/PrivateRoute";
import Register from "./Components/auth/Register";
import Login from "./Components/auth/Login";
import Recovery from "./Components/auth/Recovery";
import Setting from "./Components/user/Setting";
import Landing from "./Components/layouts/Landing";
import "./index.css";

function App() {
  return (
    <>
      <Router history={history}>
        <Switch>
          <UserProvider>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/recovery" component={Recovery} />
            <Route exact path="/" component={Landing} />
            <PrivateRoute to="/setting" component={Setting} isLogged={true} />
          </UserProvider>
        </Switch>
      </Router>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));