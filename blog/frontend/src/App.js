import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Create from './Create';
import Home from './Home';
import Navbar from './Navbar';
import BlogPage from './BlogPage';
import BlogNotFound from './BlogNotFound';

function App() {
  return (
    <BrowserRouter>
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
            <Route exact path="/blogs/:id">
              <BlogPage />
            </Route>
            <Route path="*">
              <BlogNotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
