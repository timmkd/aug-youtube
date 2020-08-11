import React from 'react';
import { connect } from 'react-redux';
import classNames from 'class-names';

const Header = (props) => {
  const { playerId, videos } = props;
  return (
    <h1
      className={classNames('header',
        { 'header--player-visible': playerId },
        { 'header--show-results': videos.length },
      )}
    >
      Youtube Player
    </h1>
  );
}

const mapStateToProps = (state) => ({
  playerId: state.playerId,
  videos: state.videos
});

export default connect(mapStateToProps)(Header);
