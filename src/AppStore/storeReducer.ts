import {combineReducers} from "redux";

//reducers import
import usernameReducer from "../Components/CreateUser/usernameReducer";
import apiRecuder from "../Components/Api/apiReducer";
import quizReducer from "../Components/Quiz/quizReducer";
import questionsReducer from "../Components/Questions/questionsReducer"
import headerReducer from "../Components/Header/headerRecuder";
import quizUserRedcuder from '../Components/QuizUser/quizUserReducer';
import leaderboardReducer from '../Components/Leaderboard/leaderboardReducer';

export default combineReducers({
   user: usernameReducer,
   quiz: quizReducer, 
   quiz_user: quizUserRedcuder,
   question: questionsReducer,
   api: apiRecuder,
   header: headerReducer,
   leaderboard: leaderboardReducer,
});
