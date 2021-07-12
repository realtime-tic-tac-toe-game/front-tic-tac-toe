import React, { Component } from 'react';
import { Button, Nav } from 'react-bootstrap';

class Main extends Component {
  render() {
    return (
      <div>
        <h2>how to play</h2>
        <p>create a room , wait for a friend , enjoy</p>
        <Button variant="primary" href="/game">
          Play now
        </Button>
      </div>
    );
  }
}

export default Main;
