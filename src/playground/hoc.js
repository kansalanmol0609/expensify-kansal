// Higher Order Component (HOC) - A component (HOC) that renders another component
// Reuse code
// Render hijacking

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
);

//This is HOC
const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            <p>This is private info. Please don't share!</p>
            {/* to pass parent's props, use spread operator */}
            <WrappedComponent {...props}/>
        </div>
    );
};

// requireAuthentication

const AdminInfo = withAdminWarning(Info);


ReactDOM.render(<AdminInfo info="These are the details" />, document.getElementById('app'));