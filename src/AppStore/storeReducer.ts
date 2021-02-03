import {combineReducers} from "redux";

//reducers import
import usernameReducer from "../Components/CreateUser/usernameReducer";
import apiRecuder from "../Components/Api/apiReducer"

export default combineReducers({
   security: usernameReducer,
   api: apiRecuder,
});
