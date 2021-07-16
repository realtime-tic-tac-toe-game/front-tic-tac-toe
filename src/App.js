import React from 'react';
import Header from './components/Header';
import Home from './components/Home';
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
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
