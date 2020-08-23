import React from 'react';

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

  // Form is handled by Controlled component
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
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
  };

  render() {
    return (
      <form className="login-form">
        <span className="login-signup-header">Log In</span>
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
          <button onClick={this.handleFormSubmit}>Log In</button>
        </div>
      </form>
    );
  }
}

export default Login;
