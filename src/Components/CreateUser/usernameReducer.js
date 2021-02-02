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

        // case "DELTE_USER":
        //     return {
        //         ...state,
        //         usernameSet: false,
        //     };

        default:
            return state;
    }
}
