import { Suspense } from "react";
import { Route, Switch } from "react-router-dom";

import { routes } from "./RoutesList";
import LoadingIndicator from "../components/Loader";

const App = () => (
  <Suspense fallback={<LoadingIndicator />}>
    <Switch>
      {routes.map((route: any) => (
        <Route
          path={route.path}
          component={route.component}
          exact={route.exact}
          key={route.key}
        />
      ))}
    </Switch>
  </Suspense>
);

export default App;
