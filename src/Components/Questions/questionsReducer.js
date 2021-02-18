const initialState = {
    questionNumber: 0,
    score: 0,
    question_ID: 0,
    answer_ID: 0,
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

        case "SET_QUESTION_ID":
            return {
                ...state,
                question_ID: action.payload.question_ID,
            };

        case "SET_ANSWER_ID":
            return {
                ...state,
                answer_ID: action.payload.answer_ID,
            };

        default:
            return state;
    }
}
