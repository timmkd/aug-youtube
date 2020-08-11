import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'class-names';
import { getVideosById, setActiveSection, searchVideos, setPlayerId } from '../redux/actions'

class Navigation extends Component {
  handleClickSearch() {
    const { keyword, setActiveSection, searchVideos, setPlayerId } = this.props;
    searchVideos(keyword);
    setActiveSection('search');
    setPlayerId(null);
  }

  handleClickFavourites() {
    const { getVideosById, setActiveSection, favourites, setPlayerId } = this.props;
    getVideosById(favourites);
    setActiveSection('favourites');
    setPlayerId(null);
  }

  handleClickHistory() {
    const { getVideosById, setActiveSection, history, setPlayerId } = this.props;
    getVideosById(history);
    setActiveSection('history');
    setPlayerId(null);
  }
  
  render() {
    const { activeSection } = this.props;
    return (
      <nav className="nav">
        <button
          className={classNames('nav__button', {'nav__button--active': activeSection === 'search'})}
          onClick={() => this.handleClickSearch()}
        >
          Search
        </button>
        <button
          className={classNames('nav__button', {'nav__button--active': activeSection === 'favourites'})}
          onClick={() => this.handleClickFavourites()}
        >
          Favourites
        </button>
        <button
          className={classNames('nav__button', {'nav__button--active': activeSection === 'history'})}
          onClick={() => this.handleClickHistory()}
        >
          History
        </button>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  activeSection: state.activeSection,
  favourites: state.videoIds.favourites,
  history: state.videoIds.history,
  keyword: state.searchKeyword
});

const mapDispatchToProps = {
  getVideosById,
  setActiveSection,
  searchVideos,
  setPlayerId
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);