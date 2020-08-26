import React, { Component } from 'react';
import { fetchUserProfile } from '../actions/profile';
import { connect } from 'react-redux';

class UserProfile extends Component {
  componentDidMount() {
    const { match } = this.props;

    if (match.params.userId) {
      // dispatch an action
      this.props.dispatch(fetchUserProfile(match.params.userId));
    }
  }

  render() {
    console.log('this.props-1', this.props);
    const {
      match: { params },
      profile,
    } = this.props;
    console.log('this.props-2', params);
    // const user = this.props.profile;
    const user = profile.user;
    // console.log('this.user.name', user);

    if (profile.inProgress) {
      return (
        <div className="ui">
          <div className="ui active inverted dimmer">
            <div className="ui large text loader">Loading</div>
          </div>
        </div>
      );
    }

    return (
      <div className="settings">
        <div className="img-container">
          <img
            src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
            alt="user-dp"
          />
        </div>

        <div className="field">
          <div className="field-label">Name</div>
          <div className="field-value">{user.name}</div>
        </div>

        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">{user.email}</div>
        </div>

        <div className="btn-grp">
          <button className="button save-btn">Add Friend</button>
        </div>
      </div>
    );
  }
}

const mapStateFromProps = ({ profile }) => {
  return {
    profile,
  };
};

export default connect(mapStateFromProps)(UserProfile);
