const initialState = {
    questionNumber: 0,
    score: 0,
}

export default function questionsReducer(state = initialState, action) {
    switch (action.type) {
        case "INCREASE_QUESTION_NUMBER":
            return {
                ...state,
                questionNumber: action.payload.questionNumber,
            };

        case "UPDATE_SCORE":
            return {
                ...state,
                score: action.payload.score,
            };

        default:
            return state;
    }
}
