import React, { Component } from 'react';
import io from 'socket.io-client';
import Games from './Games';

const socket = io(process.env.SERVER_URL, { transports: ['websocket'] });

class Join extends Component {
  
  componentDidMount() {
    socket.on('connect', () => {

    })

  }
    render() {
        return (
            <div>
               <h3>Choose Your Game :</h3>
               <Games/>
            </div>
        )
    }
}

export default Join;
