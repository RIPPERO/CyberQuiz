import { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./AppStore/store";

//Styles import
import './Styles/index.scss';

//Components import
import Landing from './Components/Landing/Landing';
import CreateUser from './Components/CreateUser/CreateUser';
import Quiz from './Components/Quiz/Quiz';
import ShowUsers from './Components/ShowUsers/ShowUsers';
import PageNotFound from './Components/PageNotFound/PageNotFound';
import Questions from './Components/Questions/Questions';
import MiniGame from './Components/MiniGame/MiniGame';
import QuizUser from './Components/QuizUser/QuizUser';
import AnswerUser from './Components/AnswerUser/AnswerUser';
import Leaderboard from './Components/Leaderboard/Leaderboard';
import LeaderboardID from './Components/Leaderboard/LeaderboardID/LeaderboardID';
import Chart from './Components/Chart/Chart';
import ChartID from './Components/Chart/ChartID/ChartID';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/createuser" component={CreateUser} />
              <Route exact path="/quiz" component={Quiz} />
              <Route exact path="/questions" component={Questions} />
              <Route exact path="/users" component={ShowUsers} />
              <Route exact path="/minigame" component={MiniGame} />
              <Route exact path="/quiz-user" component={QuizUser} />
              <Route exact path="/answer-user" component={AnswerUser} />
              <Route exact path="/leaderboard" component={Leaderboard} />
              <Route exact path="/leaderboard/:id" component={LeaderboardID} />
              <Route exact path="/chart" component={Chart} />
              <Route exact path="/chart/:id" component={ChartID} />

              <Route exact path="/404" component={PageNotFound} />
              <Route>
                <Redirect to="/404" />
              </Route>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
