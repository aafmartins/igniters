import "./App.css";
import "./components/stars.css";

import { Route, Switch } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";

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
import MyOrganizationsPage from "./pages/MyOrganizationsPage";
import MySavedOrganizations from "./components/MySavedOrganizations";
import MyCreatedOrganizations from "./components/MyCreatedOrganizations";
import SearchPage from "./pages/SearchPage";
import OrganizationsNearUserPage from "./pages/OrganizationsNearUserPage";
import AboutUsPage from "./pages/AboutUsPage";
import Footer from "./components/Footer";

import { AuthContext } from "./contexts/auth.context";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

function App(props) {
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { logInUser } = useContext(AuthContext);

  const handleGoogleSuccess = (data) => {
    const { givenName, email } = data.profileObj;

    const requestBody = {
      email,
      name: givenName,
      password: "GoogleUser1234",
    };

    axios
      .post(`${API_URL}/auth/google`, requestBody)
      .then((response) => {
        const token = response.data.authToken;
        logInUser(token);
        props.history.push("/");
      })
      .catch((error) => {
        const errorDescription = error;
        setErrorMessage(errorDescription);
      });
  };

  const handleGoogleFailure = (err) => {
    console.log("Error with google singup", err);
    setErrorMessage(err);
  };

  return (
    <div className="App">
      <Navbar
        onGoogleSuccess={handleGoogleSuccess}
        onGoogleFailure={handleGoogleFailure}
      />
      <div className="mainContainer">
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
          <PrivateRoute
            exact
            path="/profile/edit/:id"
            component={EditProfilePage}
          />
          <PrivateRoute exact path="/profile" component={ProfilePage} />
          <PrivateRoute exact path="/my-orgs" component={MyOrganizationsPage} />
          <PrivateRoute
            exact
            path="/saved-orgs"
            component={MySavedOrganizations}
          />
          <PrivateRoute
            exact
            path="/created-orgs"
            component={MyCreatedOrganizations}
          />
          <PrivateRoute
            exact
            path="/orgs-near-you"
            component={OrganizationsNearUserPage}
          />
          <AnonRoute exact path="/signup" component={SignupPage} />
          <AnonRoute exact path="/login" component={LoginPage} />
          <Route exact path="/about" component={AboutUsPage} />
          <Route exact path="/search" component={SearchPage} />
          <Route exact path="/orgs" component={OrganizationListPage} />
          <Route exact path="/" component={HomePage} />
          <Route component={ErrorPage} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
