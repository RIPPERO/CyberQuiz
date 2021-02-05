const initialState = {
    headerText: "Header",
}

export default function headerReducer (state = initialState, action) {
    switch (action.type) {
        case "SET_HEADER":
            return {
                ...state,
                headerText: action.payload.headerText,
            };

        default:
            return state;
    }
}
