import React from 'react';
import Header from './components/Header';
import Home from './components/Home';
// import Join from './components/Join';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            {/* <Route exact path="/joinGame">
              <Join />
            </Route> */}
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
