import React from 'react';
import PropTypes from 'prop-types';

import './Error.scss';

const ErrorComponent = ({ message }) => {
    return (
        <div>
            <div className="error">{message}</div>
        </div>
    );
};

ErrorComponent.propTypes = {
    message: PropTypes.string.isRequired,
};

export default ErrorComponent;
