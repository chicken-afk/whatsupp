"use client";

import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClick, children, type = 'button', disabled = false, className }) => {
    return (
        <button type={type} onClick={onClick} disabled={disabled}
            className={`focus:outline-none text-white bg-grey-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ${className}`}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    disabled: PropTypes.bool,
};

export default Button;