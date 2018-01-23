import React, {Component} from 'react';

class Header extends Component {
  render() {
    return (
      <header className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <div className="user-counter">{this.props.onlineUsers} users are online</div>
      </header>
    )
  }
}


export default Header;