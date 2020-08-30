import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';

import '../chat.css';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [], //{content: 'some message', self: true/false}
      typedMessage: '',
    };

    // Create connection with socket.io
    this.socket = io.connect('http://54.237.158.65:5000');
    this.userEmail = props.user.email;
    console.log('PROPS', props);

    // Setup connection with server
    if (this.userEmail) {
      this.setupConnections();
    }
  }

  setupConnections = () => {
    const socketConnection = this.socket;
    const self = this;

    // use this method to define an actions
    this.socket.on('connect', function () {
      console.log('Connection Established!');

      // Send the action by "emit()" to server with some data
      socketConnection.emit('join_room', {
        user_email: this.userEmail,
        chatroom: 'codeial',
      });

      //   Listen for the user join us
      socketConnection.on('user_joined', function (data) {
        console.log('New User Joined', data);
      });
    });

    // Setup listener for receive messages
    this.socket.on('receive_message', function (data) {
      // Add message to state
      const { messages } = self.state;
      const messageObject = {};
      messageObject.content = data.message;

      if (data.user_email === self.userEmail) {
        messageObject.self = true;
      }

      self.setState({
        messages: [...messages, messageObject],
        typedMessage: '',
      });
    });
  };

  handleSubmit = () => {
    const { typedMessage, messages } = this.state;

    console.log('Messages', messages);

    if (typedMessage && this.userEmail) {
      //   Send an Action
      this.socket.emit('send_message', {
        message: typedMessage,
        user_email: this.userEmail,
        chatroom: 'codeial',
      });
    }
  };

  render() {
    const { typedMessage, messages } = this.state;
    // console.log('Messages', messages);
    return (
      <div className="chat-container">
        <div className="chat-header">
          Chat
          <img
            src="https://www.iconsdb.com/icons/preview/white/minus-5-xxl.png"
            alt=""
            height={17}
          />
        </div>
        <div className="chat-messages">
          {messages.map((message) => (
            <div
              key={message}
              className={
                message.self
                  ? 'chat-bubble self-chat'
                  : 'chat-bubble other-chat'
              }
            >
              {message.content}
            </div>
          ))}
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={typedMessage}
            onChange={(e) => this.setState({ typedMessage: e.target.value })}
          />
          <button onClick={this.handleSubmit}>Send</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    user: auth.user,
  };
}

export default connect(mapStateToProps)(Chat);
