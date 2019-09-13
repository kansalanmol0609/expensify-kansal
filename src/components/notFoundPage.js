import React from 'react';
import {Link} from 'react-router-dom';

const notFoundPage = () => (
    <div>
        404 - <Link to="/">Go Home</Link>
    </div>
);

export default notFoundPage;