import React, { Component, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Game from './Game';
import io from 'socket.io-client';
import Join from './Join';
const SERVER_URL = `localhost:5000/`;
const socket = io(SERVER_URL, { transports: ['websocket'] });

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: '',
      hideForm: true,
      showName: false,
      showGame: false,
      showJoin: false,
      winner: null,
      player: {},
      game: {},
      notes: [],
      gamesArr: [],
      onlineGamers: [],
      showSomeJoind: false,
      updatedValue:null,
      checkIndex :null,
    };
  }
  componentDidMount() {
    socket.on('connect', () => {
      console.log('hello connect');

      socket.on('claimed', (payload) => {
        // alert(`${payload.name} joined youre game`);
        this.setState({ showSomeJoind: true });
        console.log('hello from claimed');
      });

      socket.on('notes', (data) => {
        const { message = '' } = data;
        // notes.push(message);
        // this.setState({
        //   notes
        // })
        this.setState({ notes: [...this.state.notes, message] });
      });

      socket.on('creatPlayer', (data) => {
        this.setState({ player: { ...this.state.player, data } });

        console.log('createplayer', data);
      });

      socket.on('updatedGame', (data) => {
        this.setState({ game: { ...this.state.game, data } });
        console.log('updatedGame', data);
      });

      socket.emit('join', { name: this.props.playerName });

      socket.emit('getAll');

      socket.on('newGame', (payload) => {
        console.log('Before', payload, socket.id);
        this.setState({ gamesArr: [...this.state.gamesArr, payload] });
        console.log('after', payload);
      });
      socket.on('onlineGamers', (payload) => {
        this.setState({ onlineGamers: [...this.state.onlineGamers, payload] });
      });
      socket.on('offlineGamers', (payload) => {
        this.setState({
          onlineGamers: this.state.onlineGamers.filter(
            (gamers) => gamers.id !== payload.id
          ),
        });
      });
      socket.on('endGame', (data) => {
        const { finalWinner } = data;
        this.determineWinner(finalWinner);
        console.log(this.state.winner);
      });
      
    });
  }
  
  determineWinner = (finalWinner)=>{
    if (finalWinner.player.data.player1){
      this.setState({
        winner: finalWinner.player.data.player1.name,
      });
    } else {
      this.setState({
        winner: finalWinner.player.data.player2.name,
      });
    }
  }

  /// back to this
  createName = (length = 8) => {
    return Math.random().toString(36).substr(2, length);
  };

  updateData = (event) => {
    event.preventDefault();
    this.setState({
      playerName: event.target.name.value,
      hideForm: false,
      showName: true,
    });
  };

  createGameHandler = async () => {
    const payload = {
      created_at: new Date().toLocaleString(),
      name: this.state.playerName,
    };
    console.log('hello from create', payload);

    await socket.emit('createGame', payload);
    this.setState({
      showGame: true,
    });
  };

  joinGameHandler = () => {
    this.setState({
      showJoin: true,
      // showGame:false,
    });
  };

  handleJoin = () => {
    let userId = prompt('enter the game id');
    // this.setState({ gameId: userId });
    console.log('hello handle join', userId);

    let claimPayload = {
      name: this.state.playerName,
      gameId: userId,
    };

    console.log();

    socket.emit('claim', claimPayload);
  };

  handleClick =  (value) => {
    console.log('clicked');
    // console.log(this.state.game.data.game.id);

    socket.emit('playing', {
      player: this.state.player,
      squareValue: value,
      gameId: this.state.game.data.game.id,
    });
    console.log(this.state.player);
    if(this.state.player.data.player2 ){
      this.setState ({
        updatedValue : 'O',
        checkIndex:value,
      })
    }else {
      this.setState ({
        updatedValue : 'X',
        checkIndex: value,
      })
    }
    console.log('updated Value',this.state.updatedValue);
    // socket.on('takeValue', (data) =>{
    //   console.log('data',data);
    //   this.setState ({
    //     updatedValue  : data,
    //   })
    // });
    // console.log('updatedValue',this.state.updatedValue); 
  };

  getWinner = () => {
    return this.state.winner.player.id === this.state.player.id
      ? 'You Win The Game'
      : 'Try Again !';
  };

  showJoinGame = () => {
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

        {!this.state.showGame && (
          <>
            <h2>How to play</h2>
            <h5>create a room , wait for a friend , enjoy</h5>

            <Button variant="primary" onClick={this.createGameHandler}>
              Create Game
            </Button>

            <Button variant="primary" onClick={this.joinGameHandler}>
              Join Game
            </Button>
          </>
        )}
        <Join
          playerName={this.state.playerName}
          showJoin={this.state.showJoin}
          handleJoin={this.handleJoin}
          gamesArr={this.state.gamesArr}
          onlineGamers={this.state.onlineGamers}
          showJoinGame={this.showJoinGame}
        />

        {this.state.showGame && (
          <>
            {/* <p>{this.state.game.data.game.id}</p> */}
            <Game
              // gameId={this.state.game.data.game.id}
              playerName={this.state.playerName}
              game={this.state.game}
              handleClick={this.handleClick}
              winner={this.state.winner}
              player={this.state.player}
              updatedValue={this.state.updatedValue}
              checkIndex={this.state.checkIndex}

            />
            {this.state.showSomeJoind && <p>your friend joined youre game </p>}
          </>
        )}
      </div>
    );
  }
}

export default Main;
