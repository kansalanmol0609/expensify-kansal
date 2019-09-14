import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

const EditExpensePage = (props) => (
    <div>
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">Edit Expense</h1>
            </div>
        </div>
        {/* Editing the expense with id of {props.match.params.id} */}
        <div className="content-container">
            <ExpenseForm
                expense={props.expense}
                onSubmit={(expense) => {
                    props.dispatch(startEditExpense(props.expense.id, expense));
                    props.history.push('/');
                }}
            />
            <button 
                className="button button-secondary"
                onClick={() => {
                //dispatch attribute gets attached to props
                props.dispatch(startRemoveExpense({ id: props.expense.id }));
                props.history.push('/');
            }}>Remove Expense</button>
        </div>
    </div>
);

const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => expense.id === props.match.params.id)
    };
};

export default connect(mapStateToProps)(EditExpensePage);