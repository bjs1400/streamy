import React from 'react';
import { Field, reduxForm } from 'redux-form'; // field is a React component & reduxForm is similar to connect

class StreamForm extends React.Component {
    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

    renderInput = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;

        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} />
                <div>{this.renderError(meta)}</div>
            </div>
        );
    }

    onSubmit = formValues => {
        this.props.onSubmit(formValues); // this function was sent to us by our parent component; we call it with our new formValues
    }

    render() {
        return (
            <form className="error" onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form">
                <Field name="title" component={this.renderInput} label="Enter Title" />
                <Field name="description" component={this.renderInput} label="Enter Descriptions" />
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

const validate = (formValues) => {
    const errors = {};

    if (!formValues.title) {
        errors.title = 'You must enter a title';
    }

    if (!formValues.description) {
        errors.description = 'You must enter a description';
    }

    return errors; // IF AN ERROR MATCHES THE NAME OF AN INPUT, IT GETS SENT TO THE renderInput function of that field! 
}

export default reduxForm({ // passes a ton of props to our streamCreate component
    form: 'streamForm',
    validate
})(StreamForm);