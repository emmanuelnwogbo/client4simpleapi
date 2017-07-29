import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'; //step 2 in redux form setup
import { connect } from 'react-redux';
import { signinUser } from '../../actions';

class Signin extends Component {
  renderField(field) {
    const className = `form-group`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
          />
      </div>
    )
  }

  renderFieldPassword(field) {
    const className = `form-group`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="password"
          {...field.input}
          />
      </div>
    )
  }

  handleFormSubmit(values) {
    //console.log(values);
    this.props.signinUser(values, () => {
      this.props.history.push('/feature');
    })
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

  render() {
    const { handleSubmit } = this.props;

    return (
      //step 5 in redux form setup
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field
          label="email"
          name="email"
          component={this.renderField}
        />
        <Field
          label="password"
          name="password"
          component={this.renderFieldPassword}
        />
      {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signin',
})(
  connect(mapStateToProps, { signinUser })(Signin)
);//step 1 in redux form setup
