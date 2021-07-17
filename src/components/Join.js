import React, { Component } from 'react';
import './home.css';

class Join extends Component {
  render() {
    return (
      <div>
        {this.props.showJoin && (
          <div className="games">
            <h3 class="h3C">Choose Your Game </h3>

            <div className="games2">
              <form
                onSubmit={(event) => {
                  this.props.handleJoinSec(event);
                  this.props.showJoinGame(event);
                }}
              >
                {/* <label for="name">what is your name</label> */}
                <input
                  className="myinput2"
                  type="text"
                  name="IdJoin"
                  placeholder="got a game code ?"
                />
                <input type="submit" value="&#10004;" />
              </form>
            </div>

            <div className="games3">
              {/* {this.props.showGameAfterCreate && */}
              {console.log(this.props.gamesArr)}
              {this.props.gamesArr.map((game, idx) => {
                return (
                  <div className="mapgames" key={idx}>
                    <p> game number : {idx}</p>
                    <p>{game.status}</p>

                    <button
                      className="joinButtons"
                      onClick={() => {
                        this.props.handleJoin(idx);
                        this.props.showJoinGame();
                      }}
                    >
                      join this game
                    </button>
                  </div>
                );
              })}
            </div>
            {this.props.showSomeJoind && <p> you joined your friend game </p>}
          </div>
        )}
      </div>
    );
  }
}

export default Join;
