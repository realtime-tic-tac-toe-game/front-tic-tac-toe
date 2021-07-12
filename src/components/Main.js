import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import io from 'socket.io-client';
const SERVER_URL = process.env.SERVER_URL;
const socket = io(SERVER_URL, { transports: ['websocket'] });

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playerName: ' ',
      hideForm: true,
      showName:false,
    };
  }
  componentDidMount() {
    socket.on('connect', () => {

    })

  }
  
  updateData =(event) => {
    event.preventDefault();
     this.setState({
      playerName: event.target.name.value,
      hideForm: false,
      showName:true,
    });

  };
 

  render() {
    return (
      <div>
        {this.state.hideForm &&
          <form
            onSubmit={(event) => this.updateData(event)}
          >
            <label for="name">what is your name</label>
            <input type="text" name="name" />
            <input type="submit" />
          </form>

        }
        { this.state.showName &&
          <h2>Hello {this.state.playerName}</h2>

        }
        <h2>How to play</h2>
        <p>create a room , wait for a friend , enjoy</p>

        <Button variant="primary" href="/createGame">
          Create Game
        </Button>

        <Button variant="primary" href="/joinGame" >
         Join Game
        </Button>

      </div>
    );
  }
}

export default Main;
