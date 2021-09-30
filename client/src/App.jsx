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
import OrganizationListPage from "./pages/OrganizationListPage";
import OrganizationDetailsPage from "./pages/OrganizationDetailsPage";
import EditOrganizationPage from "./pages/EditOrganizationPage";
import EditProfilePage from "./pages/EditProfilePage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
        <Switch>

          <PrivateRoute
            exact
            path="/orgs/edit/:id"
            component={EditOrganizationPage}
          />
          <PrivateRoute
            exact
            path="/orgs/create"
            component={AddOrganizationPage}
          />
          <PrivateRoute
            exact
            path="/orgs/:id"
            component={OrganizationDetailsPage}
          />
          <PrivateRoute exact path="/orgs" component={OrganizationListPage} />
          <PrivateRoute exact path="/profile/edit/:id" component={EditProfilePage} />
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
