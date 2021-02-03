import {combineReducers} from "redux";

//reducers import
import usernameReducer from "../Components/CreateUser/usernameReducer";
import apiRecuder from "../Components/Api/apiReducer";
import quizReducer from "../Components/Quiz/quizReducer";
import questionsReducer from "../Components/Questions/questionsReducer"

export default combineReducers({
   security: usernameReducer,
   quiz: quizReducer, 
   questionNumber: questionsReducer,
   api: apiRecuder,
});
