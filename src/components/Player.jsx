import React from 'react';
import { connect } from 'react-redux';
import classNames from 'class-names';

const Player = (props) => {
  const { playerId } = props;
  return (
    <div className="player__wrapper">
      <div
        className={classNames('player', {'player--visible': playerId})}
        id="player"
        type="text/html"
      >
        {playerId && <iframe
          title="player"
          src={`https://www.youtube.com/embed/${playerId}`}
          className="player__iframe animate-fade-in"
        />}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  playerId: state.playerId,
});

export default connect(mapStateToProps)(Player);
