const initialState = {
    usernameSet: false,
}

export default function usernameReducer (state = initialState, action) {
    switch (action.type) {
        case "SET_USERNAME":
            return {
                ...state,
                usernameSet: true,
            };

        default:
            return state;
    }
}
