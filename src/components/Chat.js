import React, { Component } from 'react';
import './home.css';

class Chat extends Component {
  render() {
    return (
      <div>
        <h3>Massages</h3>

        {this.props.showChat && (
          <div className="cahts">
            {this.props.chat.map((item, idx) => {
              return (
                <p className="mass" key={idx}>
                  <strong>{item.name}</strong> : {item.massage}
                </p>
              );
            })}
          </div>
        )}

        <div>
          <form onSubmit={(event) => this.props.chatUpdate(event)}>
            <input
              className="myinput"
              type="text"
              name="chat"
              placeholder="type your message here"
              required
            />
            <input type="submit" value="&#10004;" />
          </form>
        </div>
      </div>
    );
  }
}

export default Chat;
