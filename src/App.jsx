import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {

  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);

    this.state = {
      server: null,
      currentUser: {
        name: "Anonymous"
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


  componentDidMount() {
    // console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://localhost:3001");
    this.setState({server: this.socket});
      console.log('SOCKET', this.socket);

    this.socket.onopen = (event) => {
      console.log('Connected to server');
      // console.log("Event should be number of users:  ", event);
      // const onlineCount = JSON.parse(event);
      // this.state.counter = onlineCount.count;
    }

    this.socket.onmessage = function(event){
      console.log(event.data);
    }

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

  // Add Message func
  addMsg(content, username) {
    let message = {
       id: Math.random(),
       type: 'chat',
       content: content.message,
       username: username
    };

      // let newList = this.state.messages.concat(newMsg);

      // this.setState({
      //   messages: newList
      // });

    //WS connection - send msg to server
    this.socket.send(JSON.stringify(message));
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
          addMsg={this.addMsg.bind(this)}
        />
      </div>
    );
  }
}
export default App;