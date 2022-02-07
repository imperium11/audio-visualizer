import React, { useState } from 'react';
import Sketch from 'react-p5';
import 'p5/lib/addons/p5.sound';
import Beat from '../../instrumental.mp3';

const App = () => {

  let width = 900;
  let height = 600;
  let song;
  let fft;

  const preload = (p) => {
    p.soundFormats('mp3');
    song = p.loadSound(Beat);
  }

  const setup = (p, canvasParentRef) => {
    // react-p5 conveniently initializes window.p5 thats why all the other p5's
    // have been changed to p in order to create an FFT object
    fft = new p5.FFT();
    // console.log(p.point)
    // use parent to render the canvas in this ref
		// without it p5 will render the canvas outside of this component
    const canvas = p.createCanvas(width, height).parent(canvasParentRef);
  }

  const playStop = () => {
    if (song.isPlaying()) {
      song.pause();
      //p.noLoop();
    } else {
      song.play();
      //p.loop();
    }
  }

  const draw = p => {
    p.background(0);
    // by default the stroke color is black
    // we need to change this in order to see the wave
    p.stroke(255, 204, 0);

    // no fill in between waves
    p.noFill();
    // returns an array with 1024 elements
    let wave = fft.waveform();

    p.beginShape();
    // By looping through the waveform data, we are able
    // to draw the waveform across the canvas
    for (let i = 0; i < width; i++) {
      // create an index that maps the for loop variable
      // to the index of the wave we want
      // value must be integer thats we we use floor
      let index = p.floor(p.map(i, 0, width, 0, wave.length));

      let x = i;
      let y = wave[index] * 100 + height / 2;
      p.vertex(x, y);
    }
    p.endShape();
  }

  return (
    <div className='outerbox'>
      <h1>Audio Visualizer</h1>
      <Sketch preload={preload} setup={setup} draw={draw}/>
      <button onClick={playStop}>Play/Stop</button>
    </div>
  );
}

export default App;