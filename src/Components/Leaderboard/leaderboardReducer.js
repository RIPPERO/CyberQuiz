const initialState = {
    quiz_ID_for_leaderboard: 0,
}

export default function leaderboardReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_QUIZ_ID_FOR_LEADERBOARD":
            return {
                ...state,
                quiz_ID_for_leaderboard: action.payload.quiz_ID_for_leaderboard,
            };

        default:
            return state;
    }
}
