import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import * as jwtDecode from 'jwt-decode';

import { fetchPosts } from '../actions/posts';
import {
  Home,
  Navbar,
  Page404,
  Login,
  Signup,
  Settings,
  UserProfile,
} from './';
import { authenticateUser } from '../actions/auth';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import { fetchUserFriends } from '../actions/friends';

// If user is Loggedin then goto the setting page else goto the login page
const PrivateRoute = (PrivateRouteProps) => {
  const { isLoggedin, path, component: Component } = PrivateRouteProps; // component: Component => Rename the component from "c" to "C"
  return (
    <Route
      path={path}
      render={(props) => {
        return isLoggedin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              // props pass to the login page
              pathname: '/login',
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
};

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
    // const token = localStorage.getItem('token');
    const token = getAuthTokenFromLocalStorage();

    // if user is loggedin
    if (token) {
      const user = jwtDecode(token);
      // console.log('user', user);
      this.props.dispatch(
        authenticateUser({
          email: user.email,
          _id: user._id,
          name: user.name,
        })
      );
      this.props.dispatch(fetchUserFriends());
    }
  }

  render() {
    // console.log(this.props);
    const { posts, auth, friends } = this.props;
    return (
      <Router>
        <div>
          <Navbar />

          <Switch>
            <Route
              exact
              path="/"
              render={(props) => {
                return (
                  <Home
                    {...props}
                    posts={posts}
                    friends={friends}
                    isLoggedin={auth.isLoggedin}
                  />
                );
              }}
            />

            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/logout" component={Login} />
            {/* <Route path="/user" component={UserProfile} /> */}
            <PrivateRoute
              path="/settings"
              component={Settings}
              isLoggedin={auth.isLoggedin}
            />
            <PrivateRoute
              path="/user/:userId"
              component={UserProfile}
              isLoggedin={auth.isLoggedin}
            />
            <Route component={Page404} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    auth: state.auth,
    friends: state.friends,
  };
}

// To check the type of props is correct or not
App.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(App);
