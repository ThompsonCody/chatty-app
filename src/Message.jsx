import React, {Component} from 'react';


class Message extends Component {
  render() {
    return (
      <li className='message'>
        <span className='message-username' key={this.props.id}>{this.props.username}</span>
        <span className='message-content'>{this.props.content}</span>
      </li>
    );
  }
}

export default Message;