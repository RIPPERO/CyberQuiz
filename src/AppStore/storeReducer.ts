import {combineReducers} from "redux";

//reducers import
import usernameReducer from "../Components/CreateUser/usernameReducer";

export default combineReducers({
   security: usernameReducer,
});
