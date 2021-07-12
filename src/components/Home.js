import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Game from './Game';
import io from 'socket.io-client';
const SERVER_URL = process.env.SERVER_URL;
const socket = io(SERVER_URL, { transports: ['websocket'] });

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: ' ',
      hideForm: true,
      showName: false,
      showGame: false,
    };
  }
  componentDidMount() {
    socket.on('connect', () => {
      console.log('hello connect');

      socket.on('calimed', function (payload) {
        alert(`some one joined youre game `);
      });
    });
  }

  updateData = (event) => {
    event.preventDefault();
    this.setState({
      playerName: event.target.name.value,
      hideForm: false,
      showName: true,
    });
  };

  createGameHandler = () => {
    const payload = {
      created_at: new Date().toLocaleString(),
      name: this.state.playerName,
    };
    console.log('hello from create', payload);
    socket.emit('createGame', payload);
    this.setState({
      showGame: true,
    });
  };

  render() {
    return (
      <div>
        {this.state.hideForm && (
          <form onSubmit={(event) => this.updateData(event)}>
            <label for="name">what is your name</label>
            <input type="text" name="name" />
            <input type="submit" />
          </form>
        )}
        {this.state.showName && <h2>Hello {this.state.playerName}</h2>}
        <h2>How to play</h2>
        <p>create a room , wait for a friend , enjoy</p>

        <Button variant="primary" onClick={this.createGameHandler}>
          Create Game
        </Button>

        <Button variant="primary" href="/joinGame">
          Join Game
        </Button>
        {this.state.showGame && <Game />}
      </div>
    );
  }
}

export default Main;
