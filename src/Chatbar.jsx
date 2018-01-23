import React, {Component} from 'react';

class Chatbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.username,
      message: this.props.value,
    }
    this.msgHandler = this.msgHandler.bind(this);
    this.contentHandler = this.contentHandler.bind(this);
    this.nameHandler = this.nameHandler.bind(this);
  }

  contentHandler(event) {
   this.setState({ message: event.target.value });
  }

  msgHandler(event) {
    console.log("msg -->", this.state.message);
    if (event.key == 'Enter') {
      this.props.onMessage(this.state.message);
      this.setState({ message: '' });
    }
  }

  nameHandler(event){
    console.log("Name -->", this.state.name);
    // let user = "";
    if(event.key == 'Enter'){
      this.props.onNameChange(this.state.name);
    }
    this.setState({
      name: event.target.value
    });
  }

  render(){
    return(
      <div>
        <footer className="chatbar">
          <input
            className="chatbar-username"
            placeholder="Your Name (Optional)"
            onKeyUp={this.nameHandler}
            defaultValue={this.props.user.name}
          />
          <input
            className="chatbar-message"
            placeholder="Type message"
            value={this.state.message}
            onChange={this.contentHandler}
            onKeyPress={this.msgHandler}
          />
        </footer>
      </div>
    );
  }
}

export default Chatbar;