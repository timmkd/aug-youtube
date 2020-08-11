/* global gapi */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Videos from './components/Videos';
import Player from './components/Player';
import Navigation from './components/Navigation';
import Search from './components/Search';
import Header from './components/Header';
import Loader from './components/Loader';
import ScrollableContent from './components/ScrollableContent';


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
      gapi.client.setApiKey('AIzaSyApsyBjXaygVU_3TaRuaCwy1Q-nmC_AjPM');
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
          <Navigation/>
          <ScrollableContent>
            <Player />
            <Search/>
            <Videos />
            <p className="footer">Built by Tim McDonald for August Testing.</p>
          </ScrollableContent>
        </Provider>
      );
    };

    return (
      <Loader />
    )
  }
}

export default App;
