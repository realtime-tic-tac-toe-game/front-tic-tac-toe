import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';
import Game from './Game';
import Chat from './Chat';
import io from 'socket.io-client';
import Join from './Join';
// const SERVER_URL = `localhost:5000/`;
const SERVER_URL = `xogame401.herokuapp.com/`;
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
      // notes: [],
      gamesArr: [],
      onlineGamers: [],
      showSomeJoind: false,
      updatedValue: null,
      checkIndex: null,
      showGameAfterCreate: false,
      AllGamesId: [],
      newestGameId: '',
      allPlayer: [],
      // currentNameExist: false,
      // currentName: '',
      chat: [],
      showChat: false,
    };
  }
  componentDidMount() {
    socket.on('connect', () => {
      console.log('hello connect');
      socket.emit('allPlayer');

      socket.on('getAllPlayer', (payload) => {
        console.log('getallPlayer on', payload);
        this.setState({
          allPlayer: payload,
        });
        console.log('allPlayer', this.state.allPlayer);
      });

      socket.on('getChat', (data) => {
        // console.log('getChat', data);
        this.setState({
          chat: data,
          showChat: true,
        });
        // console.log('allPlayer', this.state.chat);
      });

      socket.on('claimed', (payload) => {
        // alert(`${payload.name} joined youre game`);
        this.setState({ showSomeJoind: true });
        console.log('hello from claimed');
      });

      socket.on('creatPlayer', (data) => {
        this.setState({
          player: { ...this.state.player, data },
          // currentName: data.player.name,
        });
        console.log('createplayer', this.state.player);
      });

      socket.on('updatedGame', (data) => {
        this.setState({
          game: { ...this.state.game, data },
          showGameAfterCreate: true,
          // newestGameId: data.game.id
          AllGamesId: [...this.state.AllGamesId, data.game.id],
        });
        console.log('updatedGame', data);
        console.log('AllGamesId from update', this.state.AllGamesId);
      });

      socket.emit('join', { name: this.props.playerName });

      socket.emit('getAll');

      socket.on('newGame', (payload) => {
        console.log('Before', payload, socket.id);
        this.setState({
          gamesArr: [...this.state.gamesArr, payload],
          AllGamesId: [...this.state.AllGamesId, payload.id],
        });

        console.log('after', this.state.gamesArr);
        console.log('AllGamesId', this.state.AllGamesId);
      });
      socket.on('onlineGamers', (payload) => {
        this.setState({ onlineGamers: [...this.state.onlineGamers, payload] });
      });
      // socket.on('offlineGamers', (payload) => {
      //   this.setState({
      //     onlineGamers: this.state.onlineGamers.filter(
      //       (gamers) => gamers.id !== payload.id
      //     ),
      //   });
      // });
      socket.on('endGame', (data) => {
        const { finalWinner } = data;
        // console.log('endGame',data.winner);
        console.log('endGame', finalWinner);
        if (finalWinner) {
          this.determineWinner(finalWinner);
        }
      });
    });
    // socket.on('refreshBoard', data =>{
    //   this.setState({
    //      game : data,
    //      showGameAfterCreate:true,
    //   })
    //   console.log('my new data',data);
    // })
  }

  determineWinner = (finalWinner) => {
    console.log('final', finalWinner);
    if (finalWinner.player.data.player1) {
      this.setState({
        winner: finalWinner.player.data.player1.name,
        showGameAfterCreate: false,
      });
      alert(`Winner is ${this.state.winner} `);
      socket.emit('refreshGame', {
        gameId: this.state.game.data.game.id,
        player1: this.state.game.data.game.player1,
        player2: this.state.game.data.game.player2,
      });
      let game = {
        data: {
          game: {
            id: this.state.game.data.game.id,
            player1: this.state.game.data.game.player1,
            player2: this.state.game.data.game.player2,
            playTurn: this.state.game.data.game.player1,
            playBoard: [
              'play',
              'play',
              'play',
              'play',
              'play',
              'play',
              'play',
              'play',
              'play',
            ],
            status: 'waiting',
            theWinner: null,
          },
        },
      };
      this.setState({
        game: game,
        showGameAfterCreate: true,
      });
      // console.log('after create', this.state.game.data.game.playBoard);
    } else if (finalWinner.player.data.player2) {
      this.setState({
        winner: finalWinner.player.data.player2.name,
        showGameAfterCreate: false,
      });
      alert(`Winner is ${this.state.winner} `);
      socket.emit('refreshGame', {
        gameId: this.state.game.data.game.id,
        player1: this.state.game.data.game.player1,
        player2: this.state.game.data.game.player2,
      });
      let game = {
        data: {
          game: {
            id: this.state.game.data.game.id,
            player1: this.state.game.data.game.player1,
            player2: this.state.game.data.game.player2,
            playTurn: this.state.game.data.game.player1,
            playBoard: [
              'play',
              'play',
              'play',
              'play',
              'play',
              'play',
              'play',
              'play',
              'play',
            ],
            status: 'waiting',
            theWinner: null,
          },
        },
      };
      this.setState({
        game: game,
        showGameAfterCreate: true,
      });
      // console.log('after create', this.state.game.data.game.playBoard);
    }
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
    if (!this.state.playerName) {
      let newName = Math.random().toString(36).substr(2, 6);
      this.setState({
        playerName: ` player ${newName}`,
      });
      console.log(newName, this.state.playerName);
    }
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
    if (!this.state.playerName) {
      let newName = Math.random().toString(36).substr(2, 6);
      this.setState({
        playerName: ` player${newName}`,
      });
      console.log(newName, this.state.playerName);
    }

    this.setState({
      showJoin: true,
      showGame: true,
    });
  };

  handleJoin = (idx) => {
    let userId = this.state.AllGamesId[idx];
    // this.setState({ gameId: userId });

    console.log('hello handle join', userId);

    let claimPayload = {
      name: this.state.playerName,
      gameId: userId,
    };

    socket.emit('claim', claimPayload);
  };

  handleJoinSec = (event) => {
    // let userId = prompt('enter the game id');
    // this.setState({ gameId: userId });
    // console.log('hello handle join', userId);

    event.preventDefault();

    let claimPayload = {
      name: this.state.playerName,
      gameId: event.target.IdJoin.value,
    };

    socket.emit('claim', claimPayload);
  };

  showJoinGameSec = (event) => {
    event.preventDefault();

    this.setState({
      showGame: true,
      showJoin: false,
    });
  };

  handleClick = (value) => {
    // console.log('clicked');
    // if (this.state.player.data.player2) {
    //   if (this.state.game.data.game.player2 === this.state.game.data.game.playTurn ) {
    //     socket.emit('playing', {
    //       player: this.state.player,
    //       squareValue: value,
    //       gameId: this.state.game.data.game.id,

    //     });
    //   }
    // }
    // if (this.state.player.data.player1) {
    //   if (this.state.game.data.game.player1 === this.state.game.data.game.playTurn ) {
    //     socket.emit('playing', {
    //       player: this.state.player,
    //       squareValue: value,
    //       gameId: this.state.game.data.game.id,

    //     });
    //   }
    // }
    console.log('gameTurn', this.state.game.data.game);
    console.log('gamePlayer', this.state.player.id);
    socket.emit('playing', {
      player: this.state.player,
      squareValue: value,
      gameId: this.state.game.data.game.id,
    });

    // console.log(this.state.player);
    // if (this.state.player.data.player2) {
    //   this.setState({
    //     updatedValue: 'O',
    //     checkIndex: value,
    //   });
    // } else {
    //   this.setState({
    //     updatedValue: 'X',
    //     checkIndex: value,
    //   });
    // }
    console.log('updated Value', this.state.updatedValue);
    // socket.on('takeValue', (data) =>{
    //   console.log('data',data);
    //   this.setState ({
    //     updatedValue  : data,
    //   })
    // });
    // console.log('updatedValue',this.state.updatedValue);
  };

  showJoinGame = () => {
    this.setState({
      showGame: true,
      showJoin: false,
    });
  };

  chatUpdate = (event) => {
    event.preventDefault();

    let massageObj = {
      name: this.state.playerName,
      massage: event.target.chat.value,
    };
    console.log('massageObj', massageObj);
    socket.emit('chatSend', massageObj);
  };

  render() {
    return (
      <div className="home">
        <div className="middlePart">
          {this.state.hideForm && (
            <div>
              <form onSubmit={(event) => this.updateData(event)}>
                {/* <label for="name">what is your name</label> */}
                <input
                  className="myinput2"
                  type="text"
                  name="name"
                  placeholder="what is your name?"
                />
                <input type="submit" value="&#10004;" />
              </form>
            </div>
          )}
          {this.state.playerName && <h4>Hello {this.state.playerName}!</h4>}
          {!this.state.showGame && (
            <div className="games">
              {/* <h2>How to play</h2> */}
              <h5>enter a game , wait for a friend , enjoy</h5>

              <Button
                className="bottons"
                variant="primary"
                onClick={this.createGameHandler}
              >
                Create Game
              </Button>

              <Button
                className="bottons"
                variant="primary"
                onClick={this.joinGameHandler}
              >
                Join Game
              </Button>
            </div>
          )}
          {/* {this.state.currentName && ( */}

          <Join
            playerName={this.state.playerName}
            showJoin={this.state.showJoin}
            handleJoin={this.handleJoin}
            handleJoinSec={this.handleJoinSec}
            gamesArr={this.state.gamesArr}
            onlineGamers={this.state.onlineGamers}
            showJoinGame={this.showJoinGame}
            showJoinGameSec={this.showJoinGameSec}
            showSomeJoind={this.state.showSomeJoind}
            AllGamesId={this.state.AllGamesId}
            currentName={this.state.currentName}
          />

          {this.state.showGameAfterCreate && (
            <div className="games">
              <p>{this.state.game.data.game.id}</p>
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
              {this.state.showSomeJoind && <p>your friend joined your game </p>}
            </div>
          )}
        </div>

        <div className="player">
          {/* <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Accordion Item #1</Accordion.Header>
              <Accordion.Body>
                <p>hi</p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Accordion Item #2</Accordion.Header>
              <Accordion.Body>Lorem</Accordion.Body>
            </Accordion.Item>
          </Accordion> */}

          <h3> Available Players</h3>
          <div className="online">
            {this.state.onlineGamers.map((gamer, idx) => {
              return (
                <div>
                  <p className="mass" key={idx}>
                    {gamer.name}
                  </p>
                </div>
              );
            })}
          </div>
          <h3> All Times Players </h3>
          <div className="allPayer">
            {this.state.allPlayer.map((item, index) => {
              return (
                <div>
                  <p className="mass" key={index}>
                    {item.playerName}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="chat">
          <Chat
            chatUpdate={this.chatUpdate}
            chat={this.state.chat}
            showChat={this.state.showChat}
          />
        </div>
      </div>
    );
  }
}

export default Main;
