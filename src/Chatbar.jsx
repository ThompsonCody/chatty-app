import React, {Component} from 'react';

class Chatbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.username,
      message: '',
    }
  }

  msgHandler(event){
    this.setState({message: event.target.value});
    console.log("msg -->", this.state.message);
    if (event.key == 'Enter') {
      this.props.addMsg(event.target.value, this.state.name);
    }
  }

  nameHandler(event){
    this.setState({name: event.target.value});
    console.log("Name -->", this.state.name);
  }

  render(){
    return(
      <div>
        <footer className="chatbar">
          <input
            className="chatbar-username"
            placeholder="Your Name (Optional)"
            onChange={this.nameHandler.bind(this)}
            defaultValue={this.props.username}
          />
          <input
            className="chatbar-message"
            placeholder="Type a message and hit ENTER"
            onKeyPress={this.msgHandler.bind(this)}
          />
        </footer>
      </div>
    );
  }
}

export default Chatbar;