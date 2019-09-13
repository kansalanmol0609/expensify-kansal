//Expenses Reducer
const expensesReducerDefaultState = [];

//Reducers take two arguments: prevState and Action and return next state
//The reducer is a pure function that takes the previous state and an action, and returns the next state.
export default (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ];
        // return state.concat(action.expense);
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => id !== action.id);
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    };
                } else {
                    return expense;
                };
            })
        default:
            return state;
    }
};