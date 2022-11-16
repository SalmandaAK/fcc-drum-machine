import React, { forwardRef } from 'react';

const DrumPads = forwardRef(({ isDrumPadActive, selectedId, isPowerOn, drumPads, onClick }, ref) => {
  // Get audio ref map or create one if there were none.
  function getMap() {
    if (!ref.current) {
      ref.current = new Map();
    }
    return ref.current;
  }

  return (
    <div className="drum-pad-container">
      {drumPads.map(({ id, name, src }) => {
        let className = "drum-pad bg-gradient";
        if (!isPowerOn) {
          className += " bg-secondary"
        } else if (isDrumPadActive && selectedId === id) {
          className += " text-bg-warning"
        } else {
          className += " text-bg-light"
        }
        return (
          <button
            disabled={!isPowerOn}
            key={name}
            className={
              className
            }
            id={name}
            onClick={() => {
              onClick(id);
            }}
          >
            <audio
              className="clip"
              src={src}
              id={id}
              ref={(node) => {
                const map = getMap();
                if (node) {
                  map.set(id, node);
                } else {
                  map.delete(id);
                }
              }}
            >
            </audio>
            {id}
          </button>
        )
      })}
    </div>
  )
})

export default DrumPads;