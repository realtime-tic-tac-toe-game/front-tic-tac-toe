import React, { Component } from 'react';

class Chat extends Component {
  render() {
    return (
      <div>
        <div>massages</div>

        {this.props.showChat && (
          <div>
            {this.props.chat.map((item, idx) => {
              return (
                <p key={idx}>
                  {item.name} : {item.massage}
                </p>
              );
            })}
          </div>
        )}

        <div>
          <form onSubmit={(event) => this.props.chatUpdate(event)}>
            <input
              type="text"
              name="chat"
              placeholder="type your message here"
              required
            />
            <input type="submit" value="send" />
          </form>
        </div>
      </div>
    );
  }
}

export default Chat;
