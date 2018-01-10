import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {
  render() {
    console.log("messages", this.props.messages);
    return(
      <ul className="messages">
        {this.props.messages.map(message => {
          return(
            <Message
              key={message.id}
              content={message.content}
              user={message.username}
            />
          )
        })}
        <li className="message system">
          Anonymous1 changed their name to nomnom.
        </li>
      </ul>
    );
  }
}

export default MessageList;