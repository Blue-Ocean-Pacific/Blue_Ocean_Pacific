import React from 'react';

const LPPlayButtons = ({
  playNext,
  playPrevious,
  pointer,
  audiosLength,
  repeat,
  replayScript,
}) => {
  const disable = {
    next: (pointer === audiosLength - 1),
    previous: (pointer <= 0),
    repeat: (pointer === -1),
    replay: (pointer === -1)
  }
  return (
    <>
      {
      audiosLength !== 0 && (
      <div className="playButtons">
          <button type="button" className={disable.previous ? "disabledButton" : "button"} disabled={disable.previous} onClick={playPrevious}>
            <img src="./images/icons/play_previous.png" alt="playButton" />
          </button>
          <button type="button" className={disable.repeat ? "disabledButton" : "button"} disabled={disable.repeat} onClick={repeat}>
            <img src="./images/icons/repeat.png" alt="playButton"  />
          </button>
          <button type="button" className={disable.replay ? "disabledButton" : "button"} disabled={disable.replay} onClick={replayScript}>
            <img src="./images/icons/replay.png"  />
          </button>
          <button type="button" className={disable.next ? "disabledButton" : "button"} disabled={disable.next} onClick={playNext}>
            <img src="./images/icons/play_next.png" alt="playButton"  />
          </button>
      </div>
      )}
    </>
  );
}

export default LPPlayButtons;
