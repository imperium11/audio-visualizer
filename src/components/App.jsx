import React from 'react';
import Sketch from 'react-p5';
import 'p5/lib/addons/p5.sound';
import Beat from '../../Beat.mp3';

const App = () => {

  let width = 500;
  let height = 400;
  let song;

  const preload = (p5) => {
    p5.soundFormats('mp3');
    song = p5.loadSound(Beat);
  }

  const setup = (p5, canvasParentRef) => {
    const canvas = p5.createCanvas(width, height).parent(canvasParentRef);
    canvas.mousePressed(() => {
      if (song.isPlaying()) {
        song.pause();
      } else {
        song.play();
      }
    });
  }

  const draw = p5 => {
    p5.background(255, 200, 100);
  }

  return (
    <div>
      <h1>Audio Viualizer</h1>
      <Sketch preload={preload} setup={setup} draw={draw}/>
    </div>
  );
}

export default App;