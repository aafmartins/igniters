import { useContext } from "react";
import { AuthContext } from "./../contexts/auth.context";
import NavBarPrivate from "./NavBarPrivate";
import NavBarAnon from "./NavBarAnon";

function Navbar(props) {

  const { isLoggedIn } = useContext(AuthContext);

  return (<nav>{isLoggedIn ? <NavBarPrivate /> : <div> <NavBarAnon />  </div> }
    </nav>);
}

export default Navbar;
