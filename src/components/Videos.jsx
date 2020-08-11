import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setPlayerId, addVideoToStorage, removeVideoFromStorage } from '../redux/actions';
import IconStar from './IconStar';
import IconStarEmpty from './IconStarEmpty';

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
    const { videos, favourites } = this.props;
    return (
      <ul className="videos">
        {videos.map(video => {
          const videoContent = video.snippet;
          const id = video.id.videoId || video.id;
  
          return (
            <li className="video" key={id} onClick={()=>this.handlePressVideo(id)}>
              <img src={videoContent.thumbnails.high.url} alt="" className="video__img" />
              <div className="video__text">
                <h2 className="video__title">{videoContent.title}</h2>
              </div>
              <button
                onClick={(e) => this.handlePressSave(e, id)}
                className="video__save"
              >
                {favourites.indexOf(id) > -1 ? (<IconStar/>) : (<IconStarEmpty/>)}
              </button>
            </li>
          );
        })}
      </ul>
    );
  }
}

const mapStateToProps = (state) => ({
  videos: state.videos,
  favourites: state.videoIds.favourites
});

const mapDispatchToProps = {
  setPlayerId,
  addVideoToStorage,
  removeVideoFromStorage,
}

export default connect(mapStateToProps, mapDispatchToProps)(Videos);