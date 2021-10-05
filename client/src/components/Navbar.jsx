import { useContext } from "react"; // <== IMPORT
import { AuthContext } from "./../contexts/auth.context"; // <== IMPORT
import NavBarPrivate from "./NavBarPrivate";
import NavBarAnon from "./NavBarAnon";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn } = useContext(AuthContext);

  return <nav>{isLoggedIn ? <NavBarPrivate /> : <NavBarAnon />}</nav>;
}

export default Navbar;
