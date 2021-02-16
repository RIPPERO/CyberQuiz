const initialState = {
    user_ID: 0,
    quiz_ID_ID: 0,
    quiz_user_ID: 0,
}

export default function quizUserReducer(state = initialState, action) {
    switch (action.type) {
        case "CHOOSE_QUIZ_USER":
            return {
                ...state,
                user_ID: action.payload.user_ID,
                quiz_ID_ID: action.payload.quiz_ID_ID,
                quiz_user_ID: action.payload.quiz_user_ID,
            };

        default:
            return state;
    }
}
