import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    const messages = this.props.messages.map((message) => {
      if(message.type === 'notification') {
        return (
          <Notification
            key={message.id}
            content={message.content}
          />
        )
      } else {
        return(
          <Message
            key={message.id}
            username={message.username}
            content={message.content}
          />
        )
      }
    });
    return (
      <main className="messages">
        { messages }
      </main>
    );
  }
}

export default MessageList;