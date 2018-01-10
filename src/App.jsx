import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {

  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
    this.state = {
      currentUser: {
        name: "Bob"
      },  // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?"
        }, {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    }
  }

  // Add Message func
  addMessage(content) {
      const newMsg = {
       id: Math.random(),
       content: content
      };

      const newList = this.state.messages.concat(newMsg);
      this.setState({
        messages: newList
      });
    }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {

      // Adds new message to message list in data store
      const newMsg = {
        id: 3,
        username: "Michelle",
        content: "Hello there!"
      };
      const messages = this.state.messages.concat(newMsg)

      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  handler(event) {
    console.log("Handler");
    const newID = Math.random();
    const newMsg = {
      username: event.name,
      content: event.message
    }
  }
  render() {
    return (
      <div>
        <MessageList messages={this.state.messages}/>
        <Chatbar
          username={this.state.currentUser.name}
          addMessage={this.addMessage.bind(this)}
        />
      </div>
    );
  }
}
export default App;