import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { fetchPosts } from '../actions/posts';
import { Home, Navbar, Page404 } from './';

// const Home = (props) => {
//   console.log(props);
//   return <div>Home</div>;
// };
const Login = () => <div>Login</div>;
const Signup = () => <div>Signup</div>;
const Logout = () => <div>Logout</div>;

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  render() {
    console.log(this.props);
    const { posts } = this.props;
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
            <Route path="/logout" component={Logout} />
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
  };
}

// To check the type of props is correct or not
App.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(App);
