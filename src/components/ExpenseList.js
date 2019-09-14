import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses'

const ExpenseList = (props) => (
    <div className="content-container">
        <div className="list-header">
            <div className="show-for-mobile">Expenses</div>
            <div className="show-for-desktop">Expense</div>
            <div className="show-for-desktop">Amount</div>
        </div>
        <div className="list-body">
        {
            props.expenses.length ===  0 ? (
                <div className="list-item list-item__message">
                    <span>No expenses</span>
                </div>
            ): (
                props.expenses.map( (expense) => {
                    return <ExpenseListItem key={expense.id} {...expense} />
                })
            )
        }
        </div>
    </div>
);

const mapStateToProps = state => {
    //All returned attributes will be added as props to the component
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    };
}

//connect() returns a function and argument is function to determine what you want
//basically connect requires a function as an argument that return the props that we want from state
//It returns a function which requires a component as an argument that you want to render
const ConnectedExpenseList = connect(mapStateToProps)(ExpenseList);

export default ConnectedExpenseList;