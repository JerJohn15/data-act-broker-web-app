/**
* EmailValidation.jsx
* Created by Kyle Fox 12/23/15
**/

import React, { PropTypes } from 'react';

const propTypes = {
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    regex: PropTypes.object.isRequired,
    buttonDisabled: PropTypes.func.isRequired
};

const defaultProps = {
    id: '',
    placeholder: ''
};

// An email input field that does basic validation for .mil and .gov emails
export default class EmailValidation extends React.Component {

    handleChange(e) {
        var inputText = e.target.value;
        var newButtonDisabled;

        // Activate submit button if input matches provided regex
        if (inputText.match(this.props.regex)) {
            newButtonDisabled = false;
        } else {
            newButtonDisabled = true;
        }

        this.props.buttonDisabled(newButtonDisabled);
    }

    render() {
        return (
            <input
                id={this.props.id}
                name={this.props.id}
                placeholder={this.props.placeholder}
                type="text"
                onChange={this.handleChange.bind(this)}
            />
        );
    }
}

EmailValidation.propTypes = propTypes;
EmailValidation.defaultProps = defaultProps;