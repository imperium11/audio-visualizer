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

    p.angleMode(p.DEGREES);
    // react-p5 conveniently initializes window.p5 thats why all the other p5's
    // have been changed to p in order to create an FFT object
    fft = new p5.FFT();
    // console.log(p.point)
    // use parent to render the canvas in this ref
		// without it p5 will render the canvas outside of this component
    const canvas = p.createCanvas(width, height).parent(canvasParentRef);
  }

  const play = () => {
    if (!song.isPlaying()) {
      song.play();
    }
  }

  const stop = () => {
    song.pause();
  }

  const restart = () => {
    if (song.isPaused()) {
      song.playMode('restart');
      song.play();
    }
    song.playMode('restart');
    song.play();
  }

  const draw = p => {
    p.background(0);
    // by default the stroke color is black
    // we need to change this in order to see the wave
    p.stroke(255, 204, 0);

    // no fill in between waves
    p.noFill();

    p.translate(width / 2, height / 2);

    // returns an array with 1024 elements
    let wave = fft.waveform();

    for (let t = -1; t <= 1; t += 2) {
      p.beginShape();
      // By looping through the waveform data, we are able
      // to draw the waveform across the canvas
      for (let i = 0; i <= 180; i++) {
        // create an index that maps the for loop variable
        // to the index of the wave we want
        // value must be integer thats we we use floor
        let index = p.floor(p.map(i, 0, 180, 0, wave.length - 1));

        let r = p.map(wave[index], -1, 1, 150, 300);

        let x = r * p.sin(i) * t;
        let y = r * p.cos(i);
        p.vertex(x, y);
      }
      p.endShape();
    }


  }

  return (
    <div className='outerbox'>
      <h1>Audio Visualizer</h1>
      <Sketch preload={preload} setup={setup} draw={draw}/>
      <div className='controls'>
      <button onClick={play}>Play</button>
      <button onClick={stop}>Stop</button>
      <button onClick={restart}>Restart</button>
      </div>
    </div>
  );
}

export default App;