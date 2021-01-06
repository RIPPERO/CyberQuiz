import { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

//Styles import
import './Styles/index.scss';

//Components import
import Landing from './Components/Landing/Landing';
import PageNotFound from './Components/PageNotFound/PageNotFound';
import CreateUser from './Components/CreateUser/CreateUser';
import ShowUsers from './Components/ShowUsers/ShowUsers';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/404" component={PageNotFound} />
            <Route exact path="/createuser" component={CreateUser} />
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
