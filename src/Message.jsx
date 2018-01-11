import React, {Component} from 'react';


class Message extends Component {
  render() {
    console.log("Render <Message />");
    console.log("user -->", this.props.currentUser);
    console.log("content -->", this.props.content);
    return (
      <li className="message">
        <span className="message-username">{this.props.user}</span>
        <span className="message-content">{this.props.content}</span>
      </li>
    );
  }
}

export default Message;