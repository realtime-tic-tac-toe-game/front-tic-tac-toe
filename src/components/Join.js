import React, { Component } from 'react';
import Games from './Games';

import io from 'socket.io-client';
const SERVER_URL = `localhost:5000/`;
const socket = io(SERVER_URL, { transports: ['websocket'] });

class Join extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // hideForm: true,
      // showName: false,
      // showGame: false,
      // gamesArr: [],
      // onlineGamers: [],
      // gameId: '',
    };
  }
  // componentDidMount() {
  //   socket.on('connect', () => {
  //     console.log('Hello from connect join');
  //     // socket.emit('join', { name: this.props.playerName });

  //     // socket.emit('getAll');

  //     // socket.on('newGame', (payload) => {
  //     //   console.log('Before', payload, socket.id);
  //     //   this.setState({ gamesArr: [...this.state.gamesArr, payload] });
  //     //   console.log('after', payload);
  //     // });
  //     // socket.on('onlineGamers', (payload) => {
  //     //   this.setState({ onlineGamers: [...this.state.onlineGamers, payload] });
  //     // });
  //     // socket.on('offlineGamers', (payload) => {
  //     //   this.setState({
  //     //     onlineGamers: this.state.onlineGamers.filter(
  //     //       (gamers) => gamers.id !== payload.id
  //     //     ),
  //     //   });
  //     // });
  //   });
  // }

  // handleJoin = (playerName, gameId) => {
  //   let userId = prompt('enter the game id');
  //   // this.setState({ gameId: userId });
  //   console.log('hello handle join', userId);

  //   let claimPayload = {
  //     name: this.props.playerName,
  //     gameId: this.state.userId,
  //   };

  //   socket.emit('claim', claimPayload);
  // };

  // updateData = (event) => {
  //   event.preventDefault();
  //   this.setState({
  //     player2Name: event.target.name.value,
  //     hideForm: false,
  //     showName: true,
  //   });
  // };

  render() {
    return (
      <>
        {this.props.showJoin && (
          <div>
            <h3>Choose Your Game :</h3>
            <div>
              {this.props.gamesArr.map((game, idx) => {
                return (
                  <Games
                    {...game}
                    handleJoin={this.props.handleJoin}
                    idx={idx}
                    key={game.id}
                  />
                );
              })}
            </div>
            <aside>
              <h3>available gamers :</h3>
              {this.props.onlineGamers.map((gamer) => {
                return <h2 key={gamer.id}>{gamer.name}</h2>;
              })}
            </aside>
          </div>
        )}
      </>
    );
  }
}

export default Join;
