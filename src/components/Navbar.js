import React from 'react';
import faker from 'faker';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/auth';

class Navbar extends React.Component {
  logOut = () => {
    localStorage.removeItem('token');
    this.props.dispatch(logoutUser());
  };
  render() {
    const { auth } = this.props;
    return (
      <nav className="nav">
        <div className="left-div">
          <Link to="/">
            <img
              src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
              alt="logo"
            />
          </Link>
        </div>
        <div className="search-container">
          <img
            className="search-icon"
            src="https://image.flaticon.com/icons/svg/483/483356.svg"
            alt="search-icon"
          />
          <input placeholder="Search" />
          <div className="search-results">
            <ul>
              <li className="search-results-row">
                <img src={faker.image.avatar()} alt="user-dp" />
                <span>{`${faker.name.findName()} ${faker.name.lastName()}`}</span>
              </li>
              <li className="search-results-row">
                <img src={faker.image.avatar()} alt="user-dp" />
                <span>{`${faker.name.findName()} ${faker.name.lastName()}`}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="right-nav">
          {/* If user is Loggedin  then show this*/}
          {auth.isLoggedin && (
            <div className="user">
              <Link to="/settings">
                <img
                  src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                  alt="user-dp"
                  id="user-dp"
                />
              </Link>
              <span>{auth.user.name}</span>
            </div>
          )}

          <div className="nav-links">
            <ul>
              {!auth.isLoggedin && (
                <li>
                  <Link to="/login">Login</Link>
                </li>
              )}
              {auth.isLoggedin && <li onClick={this.logOut}>Logout</li>}
              {!auth.isLoggedin && (
                <li>
                  <Link to="/signup">Register</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Navbar);
