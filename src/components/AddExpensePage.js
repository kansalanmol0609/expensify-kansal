import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from "./ExpenseForm";
import { startAddExpense } from "../actions/expenses";

//Components should be unaware from where data is coming from and where it is going to
const AddExpensePage = (props) => (
    <div>
        This is from my add expense component
        <ExpenseForm 
            onSubmit={ (expense) => {
                props.dispatch(startAddExpense(expense))
                props.history.push('/');
            }}
        />
    </div>
);

export default connect()(AddExpensePage);