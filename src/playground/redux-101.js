import { createStore } from 'redux';

// Action generators - functions that return action objects
const incrementCount = ({ incrementBy = 1 } = {}) => ({
    type: 'INCREMENT',
    incrementBy
});

const decrementCount = ({decrementBy = 1} = {}) => ({
    type: 'DECREMENT',
    decrementBy
});

const setCount = ({ count }) => ({
    type: 'SET',
    count
});

const resetCount = () => ({
    type: 'RESET'
});

const store = createStore((state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            };
        case 'DECREMENT':
            const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;
            return {
                count: state.count - decrementBy
            }
        case 'SET' :
            return {
                count: action.count
            }
        case 'RESET':
            return {
                count: 0
            }
        default:
            return state;
    }
})


// const store = createStore( (state= { count:0 }, action) => {
//     if (action.type === 'INCREMENT'){
//         return {
//             count: state.count+1
//         }
//     } else{
//         return state;
//     }
// })


//subscribe method has a function as an argument which gets called every single time the state is changed
//subscribe method returns a method which when called will terminate subscribe method
const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});

//Actions- that an object gets sent to store
//dispatch method is used to trigger an action
//type is an essential attribute, i.e. name of Action
// store.dispatch({
//     type: 'INCREMENT',
//     incrementBy: 5
// });
store.dispatch(incrementCount({incrementBy: 5}))

// store.dispatch({
//     type: 'RESET'
// });
store.dispatch(resetCount())

//Stops consoling
// unsubscribe();

// store.dispatch({
//     type: 'DECREMENT',
//     decrementBy: 10
// })
store.dispatch(decrementCount({decrementBy:10}))

// store.dispatch({
//     type: 'SET',
//     count: 101
// })
store.dispatch(setCount({count:120}))