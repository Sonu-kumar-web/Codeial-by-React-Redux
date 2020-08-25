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
import { Home, Navbar, Page404, Login, Signup, Settings } from './';
import { authenticateUser } from '../actions/auth';

// const Home = (props) => {
//   console.log(props);
//   return <div>Home</div>;
// };
// const Login = () => <div>Login</div>;
// const Signup = () => <div>Signup</div>;
// const Logout = () => <div>Logout</div>;

// const Settings = () => <div>Setting</div>;

// If user is Loggedin then goto the setting page else goto the login page
const PrivateRoute = (PrivateRouteProps) => {
  const { isLoggedin, path, component: Component } = PrivateRouteProps; // component: Component => Rename the component from "c" to "C"
  return (
    <Route
      path={path}
      render={(props) => {
        // return isLoggedin ? <Component {...props} /> : <Redirect to="/login" />;
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
    const token = localStorage.getItem('token');

    // if user is loggedin
    if (token) {
      const user = jwtDecode(token);
      console.log('user', user);
      this.props.dispatch(
        authenticateUser({
          email: user.email,
          _id: user._id,
          name: user.name,
        })
      );
    }
  }

  render() {
    // console.log(this.props);
    const { posts, auth } = this.props;
    return (
      <Router>
        <div>
          <Navbar />
          {/* <PostsList posts={posts} /> */}

          {/* <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/sign_up">Sign_up</Link>
            </li>
          </ul> */}

          <Switch>
            {/* <Route exact={true} path="/" component={Home} /> */}
            <Route
              exact={true}
              path="/"
              render={(props) => {
                return <Home {...props} posts={posts} />;
              }}
            />

            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/logout" component={Login} />
            <PrivateRoute
              path="/settings"
              component={Settings}
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
  };
}

// To check the type of props is correct or not
App.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(App);
