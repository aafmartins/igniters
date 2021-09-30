import "./App.css";
import { Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import AnonRoute from "./components/AnonRoute";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import AddOrganizationPage from "./pages/AddOrganizationPage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
        <Switch>
          <PrivateRoute
            exact
            path="/orgs/create"
            component={AddOrganizationPage}
          />
          <PrivateRoute exact path="/profile" component={ProfilePage} />
          <AnonRoute exact path="/signup" component={SignupPage} />
          <AnonRoute exact path="/login" component={LoginPage} />
          <AnonRoute exact path="/" component={HomePage} />
          <AnonRoute component={ErrorPage} />
        </Switch>
      </header>
    </div>
  );
}

export default App;
