import { createStore, combineReducers } from "redux";
import uuid from 'uuid';

// ADD_EXPENSE
const addExpense = (
    {
        description = '',
        note = '',
        amount = 0,
        createdAt = 0
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
})

// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
})

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

// SORT_BY_DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

// SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

// SET_START_DATE
const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
});

// SET_END_DATE
const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
});

//Expenses Reducer
const expensesReducerDefaultState = [];

//Reducers take two arguments: prevState and Action and return next state
//The reducer is a pure function that takes the previous state and an action, and returns the next state.
const expensesReducer = (state = expensesReducerDefaultState, action) => {
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

//Filters Reducer
const filterReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

const filterReducer = (state = filterReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            };
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            };
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            };
        default:
            return state;
    }
}

//Store Creation

//We use combineReducers let u combine mutiple reducers into one single store
//This lets us to break our app into multiple small reducers instead of gigantic one
const store = createStore(
    //It takes object as an argument-- key value pair
    combineReducers({
        expenses: expensesReducer,
        filters: filterReducer
    })
);
//Now the redux store is an object instead of array

//Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
        return startDateMatch && endDateMatch && textMatch;
    }).sort((a,b) => {
        if( sortBy === 'date'){
            return a.createdAt <= b.createdAt ? 1 : -1;
        } else if (sortBy === 'amount'){
            return a.amount <= b.amount ? 1 : -1;
        }
    })
};

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
    // console.log(store.getState());
});

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100, createdAt: -1000 }));
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300, createdAt: 1000 }));

// store.dispatch(removeExpense({ id:expenseOne.expense.id }));

// store.dispatch(editExpense(expenseTwo.expense.id, {
//     amount:500
// }));

// store.dispatch(setTextFilter('coffee'));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount()); // amount
store.dispatch(sortByDate());   // date

// store.dispatch(setStartDate(125));  // startDate 125
// store.dispatch(setStartDate()); // startDate undefined
// store.dispatch(setEndDate(1250));   // endDate 1250

// console.log(expenseOne);

// const demoState = {
//     expenses: [{
//         id: 'dcadcpdsvsdvs',
//         description: 'January Rent',
//         note: 'This was the final payment for that address',
//         amount: 54500,   //Respresented in pennnies
//         createdAt: 0
//     }],
//     filters: {
//         text: 'rent',
//         sortBy: 'amount', //date or amount
//         startDate: undefined,
//         endDate: undefined
//     }
// };

//Array spread operator is initially present
//but to use spread operator for object (...):=
//yarn add babel-plugin-transform-object-rest-spread

// const user = {
//     name:'Jen',
//     age: 24
// };

// console.log({
//     age:27,
//     ...user,
//     location: 'Philadelphia'
// });