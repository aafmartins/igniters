import { Link } from "react-router-dom";
import { useContext } from "react"; // <== IMPORT
import { AuthContext } from "./../contexts/auth.context"; // <== IMPORT
import GoogleButton from './GoogleButton'

function Navbar(props) {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, userToken, logOutUser } = useContext(AuthContext);

  const { 
    onGoogleSuccess,
    onGoogleFailure
  } = props  

  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>

      {isLoggedIn ? (
        <>
          <Link to="/orgs">
            <button>Organizations</button>
          </Link>
          <Link to={`/my-orgs`}>
            <button>My Organizations</button>
          </Link>
          <Link to="/orgs/create">
            <button>Create an organization</button>
          </Link>
          <Link to="/profile">
            <button>Profile</button>
          </Link>
          <button onClick={logOutUser}>Logout, {userToken.name}</button>
        </>
      ) : (
        <>
          <Link to="/orgs">
            <button>All Organizations</button>
          </Link>
          <Link to="/signup">
            <button>Signup</button>
          </Link>
          <Link to="/login">
            <button>Login</button>
          </Link>
          
           <GoogleButton  onSuccess={onGoogleSuccess} onFailure={onGoogleFailure} />
          
        </>
      )}
    </nav>
  );
}

export default Navbar;
