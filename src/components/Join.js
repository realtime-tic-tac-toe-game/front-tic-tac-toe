import React, { Component } from 'react';
// import Games from './Games';
// import io from 'socket.io-client';
// const SERVER_URL = `localhost:5000/`;
// const socket = io(SERVER_URL, { transports: ['websocket'] });

class Join extends Component {
  render() {
    return (
      <>
        {this.props.showJoin && (
          <div>
            <h3>Choose Your Game </h3>

            <>
              <form
                onSubmit={(event) => {
                  this.props.handleJoinSec(event);
                  this.props.showJoinGame(event);
                }}
              >
                {/* <label for="name">what is your name</label> */}
                <input
                  type="text"
                  name="IdJoin"
                  placeholder="got a game code ?"
                />
                <input type="submit" value="enter" />
              </form>
            </>

            <div>
              {/* {this.props.showGameAfterCreate && */}
              {console.log(this.props.gamesArr)}
              {this.props.gamesArr.map((game, idx) => {
                return (
                  <div key={idx}>
                    {/* <Games
                      {...game}
                      handleJoin={this.props.handleJoin}
                      showJoinGame={this.props.showJoinGame}
                      idx={idx}
                      key={game.id}
                    /> */}
                    <div>
                      <p> game number : {idx}</p>

                      <button
                        onClick={() => {
                          this.props.handleJoin(idx);
                          this.props.showJoinGame();
                        }}
                      >
                        join
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <aside>
              <h3> available gamers :</h3>
              {this.props.onlineGamers.map((gamer) => {
                return <h2 key={gamer.id}>{gamer.name}</h2>;
              })}
            </aside>

            {this.props.showSomeJoind && <p> you joined your friend game </p>}
          </div>
        )}
      </>
    );
  }
}

export default Join;
