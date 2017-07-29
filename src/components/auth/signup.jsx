import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'; //step 2 in redux form setup
import * as actions from '../../actions';
import { connect } from 'react-redux';

class Signup extends Component {

  handleSubmit(values) {
    //Call action creator to signup user
    this.props.signupUser(values, () => {
      this.props.history.push('/feature');
    });
  }

  renderAlert() {
    if(this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  renderField(field) {
    const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
          />
          <div className="text-help">
            {field.meta.touched ? field.meta.error : ''}
          </div>
      </div>
    )
  }

  renderFieldPassword(field) {
    const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="password"
          {...field.input}
          />
          <div className="text-help">
            {field.meta.touched ? field.meta.error : ''}
          </div>
      </div>
    )
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
        <Field
          label="Email"
          name="email"
          component={this.renderField}
        />
        <Field
          label="Password"
          name="password"
          component={this.renderFieldPassword}
        />
        <Field
          label="Confirm Password"
          name="passwordconfirm"
          component={this.renderFieldPassword}
        />
      {this.renderAlert()}
      <button type="submit" className="btn btn-success">Sign up!</button>
      </form>
    )
  }
}

function validate(values) {
  const errors = {};

  if(!values.email) {
    errors.email = 'Please enter an email';
  }

  if(!values.password) {
    errors.password = 'Please enter a password';
  }

  if(!values.passwordconfirm) {
    errors.passwordconfirm = 'Please enter a password confirmation';
  }

  if(values.password !== values.passwordconfirm) {
    errors.password = 'Passwords must match'
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  validate,
  form: 'SignUpForm'
})(
  connect(mapStateToProps, actions)(Signup)
);
