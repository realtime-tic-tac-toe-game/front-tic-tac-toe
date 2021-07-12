import React, { Component } from 'react';
import io from 'socket.io-client';
import Games from './Games';

const socket = io(process.env.SERVER_URL, { transports: ['websocket'] });

class Join extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player2Name: ' ',
      hideForm: true,
      showName: false,
      showGame: false,
      gamesArr: [],
      onlineGamers: [],
    };
  }
  componentDidMount() {
    socket.on('connect', () => {
      socket.emit('join', { name: this.state.player2Name });
      socket.on('newGame', (payload) => {
        this.setState({ games: [...this.state.gamesArr, payload] });
      });
      socket.on('onlineGamers', (payload) => {
        this.setState({ onlineGamers: [...this.state.onlineGamers, payload] });
      });
      socket.on('offlineStaff', (payload) => {
        this.setState({
          onlineGamers: [
            ...this.state.onlineGamers.filter(
              (gamers) => gamers.id !== payload.id
            ),
            payload,
          ],
        });
      });
    });
  }

  handleJoin = (id, socketId) => {
    console.log('hello handle join');
    socket.emit('claim', {
      id,
      name: this.state.player2Name,
      playerId: socketId,
    });
  };

  updateData = (event) => {
    event.preventDefault();
    this.setState({
      player2Name: event.target.name.value,
      hideForm: false,
      showName: true,
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
        {this.state.showName && <h2>Hello {this.state.player2Name}</h2>}

        <h3>Choose Your Game :</h3>
        <div>
          {this.state.gamesArr.map((game, idx) => {
            return (
              <Games
                {...game}
                handleJoin={this.handleJoin}
                idx={idx}
                key={game.id}
              />
            );
          })}
        </div>
        <aside>
          <h3>available gamers :</h3>
          {this.state.onlineGamers.map((gamer) => {
            <h2 key={gamer.id}>{gamer.name}</h2>;
          })}
        </aside>
      </div>
    );
  }
}

export default Join;
