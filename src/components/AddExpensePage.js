import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from "./ExpenseForm";
import { startAddExpense } from "../actions/expenses";

//Components should be unaware from where data is coming from and where it is going to
const AddExpensePage = (props) => (
    <div>
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">Add Expense</h1>
            </div>
        </div>
        <div className="content-container">
            <ExpenseForm
                onSubmit={(expense) => {
                    props.dispatch(startAddExpense(expense))
                    props.history.push('/');
                }}
            />
        </div>
    </div>
);

export default connect()(AddExpensePage);