import React, {Component} from 'react';

class Header extends Component {
  render() {
    return (
      <header className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <span className="user-counter">{this.props.onlineUsers} users are online</span>
      </header>
    )
  }
}


export default Header;