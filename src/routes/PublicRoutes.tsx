import { Route } from "react-router-dom";

const PublicRoute = ({ component: Component, ...rest }: any) => (
  <Route {...rest} render={(props: any) => <Component {...props} />} />
);