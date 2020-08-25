import React from 'react';
import { connect } from 'react-redux';

import { login, clearAuthState } from '../actions/auth';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
  /*
  ***** form is handled by Uncontrolled component
  constructor(props) {
    super(props);
    this.emailInputRef = React.createRef();
    this.passwordInputRef = React.createRef();
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('emailInputRef', this.emailInputRef);
    console.log('passwordInputRef', this.passwordInputRef.current.value);
  };*/

  // Form is handled by Controlled component (or navigate from Login page)
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  // Called when login page will be destroyed
  componentWillMount() {
    this.props.dispatch(clearAuthState());
  }

  handleEmailSubmit = (e) => {
    // console.log(e.target.value);
    this.setState({ email: e.target.value });
  };

  handlePasswordSubmit = (e) => {
    // console.log(e.target.value);
    this.setState({ password: e.target.value });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('State:', this.state);
    const { email, password } = this.state;
    if (email && password) {
      // dispatch the action
      this.props.dispatch(login(email, password));
    }
  };

  render() {
    const { error, inProgress, isLoggedin } = this.props.auth;

    // if "this.props.location.state " is present then "from = this.props.location.state "
    // else "from = "/" "
    const { from } = this.props.location.state || { from: { pathname: '/' } }; // Props pass from private route

    // If user is loggedin then goto home page
    if (isLoggedin) {
      // return <Redirect to="/" />;
      return <Redirect to={from} />;
    }
    return (
      <form className="login-form">
        <span className="login-signup-header">Log In</span>
        {error && <div className="alert error-dailog">{error}</div>}
        <div className="field">
          <input
            type="email"
            placeholder="Email"
            required
            // ref={this.emailInputRef}    // Ref for UnControlled component
            // event handler for Controlled component
            onChange={this.handleEmailSubmit}
            value={this.state.email}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Password"
            required
            // ref={this.passwordInputRef}      // Ref for UnControlled component
            // event handler for Controlled component
            onChange={this.handlePasswordSubmit}
            value={this.state.password}
          />
        </div>
        <div className="field">
          {inProgress ? (
            <button onClick={this.handleFormSubmit} disabled={inProgress}>
              Logging in...
            </button>
          ) : (
            <button onClick={this.handleFormSubmit} disabled={inProgress}>
              Log In
            </button>
          )}
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Login);
