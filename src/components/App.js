import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import { fetchPosts } from '../actions/posts';
import { PostsList, Navbar } from './';

const Login = () => <div>Login</div>;
const Sign_up = () => <div>Sign_up</div>;
const Home = () => <div>Home</div>;

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

          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/sign_up">Sign_up</Link>
            </li>
          </ul>

          <Route exact={true} path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/Sign_up" component={Sign_up} />
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
