import React from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Game from './components/Game';
import Join from './components/Join';

// import FavoriteDigimons from './components/FavoriteDigimons';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <Route exact path="/createGame">
              <Game />
            </Route>
            <Route exact path="/joinGame">
              <Join />
            </Route>
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
