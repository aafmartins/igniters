import "./App.css";
import { Route, Switch } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import config from './config'
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

function App() {
  const [showLoading, setShowLoading] = useState(true);

  const handleGoogleSuccess = (data) => {
    
    // this.setState({
    //   showLoading: true
    // })
    const {givenName, familyName, email, imageUrl, googleId} = data.profileObj
    let newUser = {
      firstName: givenName,
      lastName: familyName,
      email, 
      image: imageUrl, 
      googleId
    }
    axios.post(`${config.API_URL}/api/google/info`, newUser , {withCredentials: true})
      .then((response) => {
        this.setState({
          loggedInUser: response.data.data,
          error: null,
          showLoading: false
        }, () => {
          this.props.history.push('/profile')
        });   
      })
  } 

  const handleGoogleFailure = (error) => {
    //TODO: Handle these errors yourself the way you want. Currently the state is not in use
    console.log(error) 
    this.setState({
      error,
    }); 
  }



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

          <Route exact path="/orgs" component={OrganizationListPage} />
          <Route exact path="/" component={HomePage} />
          <Route component={ErrorPage} />
        </Switch>
      </header>
    </div>
  );
}

export default App;
