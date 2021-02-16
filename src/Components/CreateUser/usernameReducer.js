const initialState = {
    usernameSet: false,
    username: "",
    user_ID: 0,
}

export default function usernameReducer (state = initialState, action) {
    switch (action.type) {
        case "SET_USERNAME":
            return {
                ...state,
                usernameSet: true,
                username: action.payload.username,
                user_ID: action.payload.user_ID,
            };

        default:
            return state;
    }
}
