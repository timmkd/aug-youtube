import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'class-names';
import { setPlayerId, addVideoToStorage, removeVideoFromStorage } from '../redux/actions';
import IconStar from './IconStar';
import IconStarEmpty from './IconStarEmpty';
import Loader from './Loader';

class Videos extends Component {
  // handlers
  handlePressVideo(id) {
    const { setPlayerId, addVideoToStorage } = this.props;
    setPlayerId(id);
    addVideoToStorage(id);
  }

  handlePressSave(e, id) {
    const { favourites, addVideoToStorage, removeVideoFromStorage } = this.props;

    e.stopPropagation();

    if (favourites.indexOf(id) > -1) {
      removeVideoFromStorage(id, 'favourites');
    } else {
      addVideoToStorage(id, 'favourites');
    }
  }

  // functions
  addVideoToStorage(id, storageLocation = 'history') {
    const storageString = window.localStorage.getItem(storageLocation) || '';
    let storageAsArray = storageString.split(',');
    let newStorage = null;
    if (storageAsArray.indexOf(id) > -1) {
      newStorage = [id, storageAsArray.filter(item=>item !== id)];
    } else {
      newStorage = [id, ...storageAsArray];
    }
    window.localStorage.setItem(storageLocation, newStorage);
    this.setState({[storageLocation]: newStorage});
    console.log(window.localStorage.getItem(storageLocation));
  }

  // functions
  removeVideoFromStorage(id, storageLocation = 'history') {
    const storageString = window.localStorage.getItem(storageLocation) || '';
    let storageAsArray = storageString.split(',');
    const  newStorage = storageAsArray.filter(item=>item !== id);
    window.localStorage.setItem(storageLocation, newStorage);
    this.setState({[storageLocation]: newStorage});
    console.log(window.localStorage.getItem(storageLocation));
  }

  render() {
    const { videos, favourites, isLoading, activeSection } = this.props;

    const emptyMessage = activeSection === 'favourites'
      ? 'You have not saved any videos. Search for some videos and click on the star icon.'
      : 'You have not yet viewed any videos. First search for and view some videos.';
  
    if (videos.length) {
      return (
        <ul className={classNames('videos', { 'videos__loading': isLoading })}>
          {videos.map((video, index) => {
            const videoContent = video.snippet;
            const id = video.id.videoId || video.id;
    
            return (
              <li className={`video animate-fade-in-up animate-half-second animate-delay-${index}`} key={id + index} onClick={() => this.handlePressVideo(id)}>
                <img src={videoContent.thumbnails.high.url} alt="" className="video__img" />
                <div className="video__text">
                  <h2 className="video__title">{videoContent.title}</h2>
                </div>
                <button
                  onClick={(e) => this.handlePressSave(e, id)}
                  className="video__save"
                >
                  {favourites.indexOf(id) > -1 ? (<IconStar />) : (<IconStarEmpty />)}
                </button>
              </li>
            );
          })}
          {isLoading && <Loader />}
        </ul>
      );
    }
    return (
      <p className="videos__empty animate-fade-in animate-half-second animate-delay-5" key={Math.random()}>
        {activeSection !== 'search' && emptyMessage}
      </p>
    );
  }

}

const mapStateToProps = (state) => ({
  videos: state.videos,
  favourites: state.videoIds.favourites,
  isLoading: state.isLoading,
  activeSection: state.activeSection
});

const mapDispatchToProps = {
  setPlayerId,
  addVideoToStorage,
  removeVideoFromStorage,
}

export default connect(mapStateToProps, mapDispatchToProps)(Videos);