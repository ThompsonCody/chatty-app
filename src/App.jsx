import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
// import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
// import Nav from './nav.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"},  // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      onlineUsers: 1
    }

    this.addMsg = this.addMsg.bind(this);
    // this.notification = this.notification.bind(this);
    this.nameChangeHandler = this.nameChangeHandler.bind(this);
    this.socket = null;
    console.log(this.props);
  }


  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    this.setState({server: this.socket});

    this.socket.onopen = (event) => {
      console.log('Connected to server');
      // console.log("Event should be number of users:  ", event);
      // const onlineCount = JSON.parse(event);
      // this.state.counter = onlineCount.count;
    }

    this.socket.onmessage = (event) => {
      let data = JSON.parse(event.data);
      console.log(event.data);
      let message = this.state.messages.concat(data);

      console.log("messages: ", this.state.messages.length);

      this.setState({ messages: message});

    }
  }

  // Add Message handler
  addMsg(content) {
    let message = {
       type: 'chat',
       content,//: content.message,
       username: this.state.currentUser.name
    };

    //WS connection - send msg to server
    this.socket.send(JSON.stringify(message));

  }

  // //notication handler
  // notification(newUser){

  //   this.setState({
  //     currentUser: {name: newUser}
  //   })

  // }

  //nameChangeHandler
  nameChangeHandler(newName){
    const notif = {
      content: `${this.state.currentUser.name} changed their name to ${newName}`,
      type: 'notication'
    }
    this.setState({
      currentUser: {name: newName}
    });
    console.log('notification --> ', notif);
    this.socket.send(JSON.stringify(notif));
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <div className="user-counter">{this.props.onlineUsers} users are online</div>
        </nav>
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