/* global gapi */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Videos from './components/Videos';
import Player from './components/Player';
import Navigation from './components/Navigation';
import Search from './components/Search';
import Header from './components/Header';


class App extends Component {
  // lifecycle
  constructor(props) {
    super(props);
    this.state = {
      gapiReady: false
    };
  }

  componentDidMount() {
    this.loadYoutubeApi();
  }

  // functions
  loadYoutubeApi() {
    const script = document.createElement("script");

    gapi.load('client', () => {
      gapi.client.setApiKey('AIzaSyCY2j7B2h6GwmCriUYsWuhLC3-zRmEoQiM');
      gapi.client.load('youtube', 'v3', () => {
        this.setState({ gapiReady: true });
      });
    });

    document.body.appendChild(script);
  }

  render() {
    if (this.state.gapiReady) {
      return (
        <Provider store={store}>
          <Header/>
          <Player />
          <Navigation/>
          <div className="app__scrolling-content">
            <Search/>
            <Videos />
            <p class="footer">Built by Tim McDonald for August Testing.</p>
          </div>
        </Provider>
      );
    };

    return (
      <p>Gapi not yet loaded</p>
    )
  }
}

export default App;
