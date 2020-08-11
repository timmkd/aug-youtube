import React from 'react';
import { connect } from 'react-redux';

const Player = (props) => {
  const { playerId } = props;
  if (playerId) {
    return (
      <div className="player__wrapper">
        <div
          className="player"
          id="player"
          type="text/html"
        >
          <iframe
            title="player"
            src={`https://www.youtube.com/embed/${playerId}`}
            className="player__iframe"
          />
        </div>
      </div>
    );
  }
  return null;
}

const mapStateToProps = (state) => ({
  playerId: state.playerId,
});

export default connect(mapStateToProps)(Player);
