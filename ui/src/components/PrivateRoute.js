import { Route, useHistory, useLocation } from "react-router-dom";
import { useContext } from "react";
import { store } from "../store";

const PrivateRoute = (props) => {
  const globalStore = useContext(store);
  const { state } = globalStore;
  const history = useHistory();
  const location = useLocation();

  if (!state.auth.access) {
    history.push("/");
  } else {
    if (location.pathname.includes("/admin") && state.auth.type !== "admin") {
      history.push("/profile/account");
    } else if (
      location.pathname.includes("/profile") &&
      state.auth.type !== "client"
    ) {
      history.push("/admin/users");
    }
  }

  return <Route {...props}>{props.children}</Route>;
};

export default PrivateRoute;
