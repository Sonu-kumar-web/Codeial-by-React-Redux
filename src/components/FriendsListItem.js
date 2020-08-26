import React from 'react';
import { Link } from 'react-router-dom';
import faker from 'faker';

function FriendsListItem(props) {
  return (
    <div>
      <Link className="friends-item" to={`user/${props.friend._id}`}>
        <div className="friends-img">
          <img src={faker.image.avatar()} alt="user-pic" />
        </div>
        <div className="friends-name">{props.friend.name}</div>
      </Link>
    </div>
  );
}

export default FriendsListItem;
