import { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

//Styles import
import './Styles/index.scss';

//Components import
import Landing from './Components/Landing/Landing';
import CreateUser from './Components/CreateUser/CreateUser';
import Quiz from './Components/Quiz/Quiz';
import ShowUsers from './Components/ShowUsers/ShowUsers';
import PageNotFound from './Components/PageNotFound/PageNotFound';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/createuser" component={CreateUser} />
            <Route exact path="/quiz" component={Quiz} />
            <Route exact path="/users" component={ShowUsers} />

            <Route exact path="/404" component={PageNotFound} />
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
