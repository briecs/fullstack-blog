import { BrowserRouter, Route, Switch } from 'react-router-dom';
import BlogNotFound from './BlogNotFound';
import BlogPage from './BlogPage';
import Create from './Create';
import Home from './Home';
import Login from './Login';
import Navbar from './Navbar';
import Register from './Register';
import { UserProvider } from './UserContext';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <div className="App">
          <Navbar />
          <div className="content">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/create">
                <Create />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/register">
                <Register />
              </Route>
              <Route exact path="/blogs/:id">
                <BlogPage />
              </Route>
              <Route path="*">
                <BlogNotFound />
              </Route>
            </Switch>
          </div>
        </div>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
