import { ReactNode } from "react";
import { Navigate, Route } from "react-router-dom";

interface Props {
  children: ReactNode;
}

export default function PrivateRoute({ children, ...rest }: Props) {
  const auth = localStorage.getItem("access_token");
  return (
    <Route {...rest}>{auth ? children : <Navigate to="/sign-in" />}</Route>
  );
}
