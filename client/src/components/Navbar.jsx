import { useContext } from "react"; // <== IMPORT
import { AuthContext } from "./../contexts/auth.context"; // <== IMPORT
import GoogleButton from './GoogleButton'
import NavBarPrivate from "./NavBarPrivate";
import NavBarAnon from "./NavBarAnon";

function Navbar(props) {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn } = useContext(AuthContext);

  const { 
    onGoogleSuccess,
    onGoogleFailure
  } = props  

  return (<nav>{isLoggedIn ? <NavBarPrivate /> : <div> <NavBarAnon />  <GoogleButton  onSuccess={onGoogleSuccess} onFailure={onGoogleFailure} /></div> }
    </nav>);
}

export default Navbar;
