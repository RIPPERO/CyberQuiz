import thunk from "redux-thunk";
import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "./storeReducer";
import { composeWithDevTools } from "redux-devtools-extension";

export default function configureStore() {
    const initialState = {};
    const middleware = [thunk];
    let store;

    if (window.navigator.userAgent.includes("Chrome")) {
        store = createStore(
            rootReducer,
            initialState,
            compose(
                applyMiddleware(...middleware),
                composeWithDevTools()
            )
        );
    } else {
        store = createStore(
            rootReducer,
            initialState,
            compose(applyMiddleware(...middleware))
        );
    }
    return store;
}
