const initialState = {
    quiz_ID: 0,
}

export default function quizReducer (state = initialState, action) {
    switch (action.type) {
        case "SET_QUIZ_ID":
            return {
                ...state,
                quiz_ID: action.payload.quiz_ID,
            };

        default:
            return state;
    }
}
