import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';
import Header from './Header.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Anonymous'},  // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      onlineUsers: ''
    }

    this.addMsg = this.addMsg.bind(this);
    this.nameChangeHandler = this.nameChangeHandler.bind(this);
    this.socket = null;
  }


  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    this.setState({server: this.socket});

    this.socket.onopen = () => {
      console.log('Connected to server');
    }

    this.socket.onmessage = (event) => {
      let data = JSON.parse(event.data);
      let message = this.state.messages.concat(data);

      if(data.type !== 'userCount') {
        this.setState({messages: message});
      } else {
        this.setState({onlineUsers: data.content});
      }

    }
  }

  // Add Message handler
  addMsg(content) {
    let message = {
       type: 'chat',
       content,
       username: this.state.currentUser.name
    };

    //WS connection - send msg to server
    this.socket.send(JSON.stringify(message));

  }

  nameChangeHandler(newName){
    const notif = {
      username: 'God',
      content: `${this.state.currentUser.name} changed their name to ${newName}`,
      type: 'notification'
    }
    this.setState({
      currentUser: {name: newName}
    });

    //WS connection - send notification to server
    this.socket.send(JSON.stringify(notif));
  }

  render() {
    return (
      <div>
        <Header onlineUsers={this.state.onlineUsers}/>
        <MessageList messages={this.state.messages}/>
        <Chatbar
          user={this.state.currentUser}
          onMessage={this.addMsg}
          onNameChange = {this.nameChangeHandler}
        />
      </div>
    );
  }
}
export default App;