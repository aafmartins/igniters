import "./App.css";
import { Route, Switch } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./components/stars.css";
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

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

function App(props) {
  const [showLoading, setShowLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [error, setError] = useState(null);

  const handleGoogleSuccess = (data) => {
    console.log("success with login, this is the data object we get: ", data)
    setShowLoading(true);
    const {givenName, familyName, email, imageUrl, googleId} = data.profileObj
    // const requestBody = {
    //   firstName: givenName,
    //   lastName: familyName,
    //   email, 
    //   image: imageUrl, 
    //   googleId
    // }
    const requestBody = {
      email,
      name: givenName,
      country: "Germany",
      password: "GoogleUser1234"
    }
    axios
      .post(`${API_URL}/auth/signup`, requestBody , {withCredentials: true})
        .then((response) => {
          console.log("successful google signup ", response)
          setLoggedInUser(response.data.data)
          setError(null)
          setShowLoading(false)
          props.history.push("/orgs")
        //   setShowLoading({
        //     loggedInUser: response.data.data,
        //     error: null,
        //     showLoading: false
        //   }, () => {
        //     data.history.push('/')
        //   });   
        })
        .catch((error) => {
          console.log("error during axios request", error)
          // const errorDescription = error.response.data.message;
          setError(error);
        });
  } 

  const handleGoogleFailure = (err) => {
    //TODO: Handle these errors yourself the way you want. Currently the state is not in use
    console.log("this is an error", err) 
    setError(err)
  }



  return (
    <div className="App">
      <header className="App-header">
        <Navbar
          onGoogleSuccess={handleGoogleSuccess}
          onGoogleFailure={handleGoogleFailure}
         />
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

          <AnonRoute exact path="/signup" component={SignupPage} />
          <AnonRoute exact path="/login" component={LoginPage} />

          <Route exact path="/search" component={SearchPage} />
          <Route exact path="/orgs" component={OrganizationListPage} />
          <Route exact path="/" component={HomePage} />
          <Route component={ErrorPage} />
        </Switch>
      </header>
    </div>
  );
}

export default App;
