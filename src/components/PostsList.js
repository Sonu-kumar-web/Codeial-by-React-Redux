import React from 'react';
import faker from 'faker';
import PropTypes from 'prop-types';

class PostsList extends React.Component {
  render() {
    const { posts } = this.props;
    return (
      <div className="posts-list">
        {posts.map((post) => (
          <div className="post-wrapper" key={post._id}>
            <div className="post-header">
              <div className="post-avatar">
                <img src={faker.image.avatar()} alt="user-pic" />

                <div>
                  <span className="post-author">{post.user.name}</span>
                  <span className="post-time">a minutes ago</span>
                </div>
              </div>
              <div className="post-content">{post.content}</div>
              <div className="post-actions">
                <div className="post-like">
                  <img
                    src="https://image.flaticon.com/icons/svg/1077/1077035.svg"
                    alt="likes-icon"
                  />
                  <span>{post.likes.length}</span>
                </div>
                <div className="post-comments-icon">
                  <img
                    src="https://image.flaticon.com/icons/svg/1380/1380338.svg"
                    alt="comments-icon"
                  />
                  <span>{post.comments.length}</span>
                </div>
              </div>
              <div className="post-comment-box">
                <input placeholder="Start typing a comment" />
              </div>
              <div className="post-comments-list">
                <div className="post-comments-item">
                  <div className="post-comment-header">
                    <span className="post-comment-author">Bill</span>
                    <span className="post-comment-time">a minutes ago</span>
                    <span className="post-comment-likes">
                      {faker.random.number() % 100}
                    </span>
                  </div>
                  <div className="post-comment-content">
                    {faker.lorem.sentence()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

// To check the type of props is correct or not
PostsList.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default PostsList;
