import React, { useState, useRef, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';

import Display from './Display';
import DrumPads from './DrumPads';
import PowerController from './PowerController';
import VolumeController from './VolumeController';

import './App.scss';

const drumPads = [
  { id: "Q", name: "Heater 1", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" },
  { id: "W", name: "Heater 2", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" },
  { id: "E", name: "Heater 3", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" },
  { id: "A", name: "Heater 4", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" },
  { id: "S", name: "Clap", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" },
  { id: "D", name: "Open-HH", src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" },
  { id: "Z", name: "Kick-n'-Hat", src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" },
  { id: "X", name: "Kick", src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" },
  { id: "C", name: "Closed-HH", src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" }
];

function App() {
  const [isPowerOn, setIsPowerOn] = useState(true);
  const [isAdjustingVolume, setIsAdjustingVolume] = useState(false)
  const [isDrumPadActive, setIsDrumPadActive] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [volume, setVolume] = useState(0.5);
  const audiosRef = useRef(null);

  // Add Keydown Event Handler when app has been rendered.
  useEffect(() => {
    if (!isPowerOn) {
      return
    }

    function handleKeyDown(e) {
      let keyDown = e.key.toUpperCase()
      if (drumPads.find(drumPad => drumPad.id === keyDown)) {
        setSelectedId(keyDown);
        setIsAdjustingVolume(false);
        setIsDrumPadActive(true);
        const audio = audiosRef.current.get(keyDown)
        audio.currentTime = 0;
        audio.play();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isPowerOn]);

  // Adjust volume whenever the volume is changed.
  useEffect(() => {
    audiosRef.current.forEach(node => node.volume = volume)
  }, [volume])

  // Add delay before the displayed volume change is cleared from #display
  useEffect(() => {
    if (!isAdjustingVolume) {
      return
    }

    const timeoutId = setTimeout(() => setIsAdjustingVolume(false), 500);
    return () => clearTimeout(timeoutId);
  }, [volume, isAdjustingVolume]);

  //Revert drum pad background color
  useEffect(() => {
    const timeoutId = setTimeout(() => setIsDrumPadActive(false), 200);
    return () => clearTimeout(timeoutId);
  }, [isDrumPadActive]);

  function handleDrumPadClick(id) {
    setSelectedId(id);
    setIsAdjustingVolume(false);
    setIsDrumPadActive(true);
    const audio = audiosRef.current.get(id)
    audio.currentTime = 0;
    audio.play();
  }

  function handleVolumeChange(e) {
    setVolume(e.target.value);
    setIsAdjustingVolume(true);
    setSelectedId("");
  }

  function handlePowerOnSwitch(e) {
    setIsPowerOn(e.target.checked);
    setSelectedId("");
  }

  return (
    <Container className="background">
      <Container id="drum-machine" className="text-bg-dark bg-gradient">
        <Row className="g-4 justify-content-center align-items-center">
          <Col md={6}>
            <DrumPads isDrumPadActive={isDrumPadActive} isPowerOn={isPowerOn} drumPads={drumPads} selectedId={selectedId} onClick={handleDrumPadClick} ref={audiosRef} />
          </Col>
          <Col md={6} className="d-flex justify-content-center">
            <Stack gap={4} className="controller-container">
              <PowerController isPowerOn={isPowerOn} onChange={handlePowerOnSwitch} />
              <Display isPowerOn={isPowerOn} drumPads={drumPads} selectedId={selectedId} volume={volume} isAdjustingVolume={isAdjustingVolume} />
              <VolumeController isPowerOn={isPowerOn} volume={volume} onChange={handleVolumeChange} />
            </Stack>
          </Col>
        </Row>
        <footer className="text-center text-light mt-3">Created by <a className="link-light" href="https://github.com/SalmandaAK/fcc-drum-machine">SalmandaAK</a></footer>
      </Container>
    </Container>
  )
};

export default App;
