import { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

//Components import
import Landing from './Components/Landing/Landing';
import PageNotFound from './Components/PageNotFound/PageNotFound';
import ShowUsers from './Components/ShowUsers/ShowUsers';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/404" component={PageNotFound} />
            <Route exact path="/users" component={ShowUsers} />
            <Route>
              <Redirect to="/404" />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
