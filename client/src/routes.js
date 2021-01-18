import { Switch, Route, Redirect } from 'react-router-dom';

import { LinksPage } from './pages/LinksPage.jsx';
import { CreatePage } from './pages/CreatePage.jsx';
import { DetailPage } from './pages/DetailPage.jsx';
import { AuthPage } from './pages/AuthPage.jsx';

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/links" exact>
          <LinksPage />
        </Route>
        <Route path="/create" exact>
          <CreatePage />
        </Route>
        <Route path="/detail/:id">
          <DetailPage />
        </Route>
        <Redirect to="/create" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
}