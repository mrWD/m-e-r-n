import 'materialize-css';
import { BrowserRouter } from 'react-router-dom';

import { useRoutes } from './routes';

import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/auth.context';

import { Navbar } from './components/Navbar';
import { Loader } from './components/Loader';

function App() {
  const { ready, token, userId, login, logout } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if (!ready) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider value={{ token, userId, isAuthenticated, login, logout }}>
      <BrowserRouter>
        { isAuthenticated && <Navbar /> }

        <div className="container">
          { routes }
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
