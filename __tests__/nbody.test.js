/**
 * @jest-environment jsdom
 */

import {jest} from '@jest/globals';
import { ContextWrapper } from '../context-wrapper';
import { step, config } from './../nbody';

let contextWrapper;
  let initialBodies = JSON.parse(JSON.stringify(config.bodies));
  let deltaT = 25000.0

  beforeEach(() => {
    contextWrapper = new ContextWrapper(createDummyCtx());
    config.bodies = JSON.parse(JSON.stringify(initialBodies));
  });

describe('it should calculate steps properly', () => {
  it('after one step', () => { 
    step(contextWrapper, deltaT);
    expect(processBodies(config.bodies)).toEqual([
      {x: "1.4960e+11", y: "7.4500e+8", vx: "-1.4820e+2", vy: "2.9800e+4", m: "5.9740e+24", image: 'earth.gif'},
      {x: "2.2790e+11", y: "6.0250e+8", vx: "-6.3860e+1", vy: "2.4100e+4", m: "6.4190e+23", image: 'mars.gif'},
      {x: "5.7875e+10", y: "1.1975e+9", vx: "-9.8933e+2", vy: "4.7900e+4", m: "3.3020e+23", image: 'mercury.gif'},
      {x: "3.3087e+1", y: "0.0000e+0", vx: "1.3235e-3", vy: "0.0000e+0", m: "1.9890e+30", image: 'sun.gif'},
      {x: "1.0819e+11", y: "8.7500e+8", vx: "-2.8329e+2", vy: "3.5000e+4", m: "4.8690e+24", image: 'venus.gif'},
    ]);
   });

   it('after 2 steps', () => { 
    for (let i = 0 ; i < 2; i++) {
      step(contextWrapper, deltaT);
    }
    expect(processBodies(config.bodies)).toEqual([
      {x: "1.4959e+11", y: "1.4900e+9", vx: "-2.9640e+2", vy: "2.9799e+4", m: "5.9740e+24", image: "earth.gif"},
      {x: "2.2790e+11", y: "1.2050e+9", vx: "-1.2772e+2", vy: "2.4100e+4", m: "6.4190e+23", image: "mars.gif"},
      {x: "5.7826e+10", y: "2.3945e+9", vx: "-1.9789e+3", vy: "4.7880e+4", m: "3.3020e+23", image: "mercury.gif"},
      {x: "9.9262e+1", y: "2.8198e-1", vx: "2.6470e-3", vy: "1.1279e-5", m: "1.9890e+30", image: "sun.gif"},
      {x: "1.0818e+11", y: "1.7499e+9", vx: "-5.6660e+2", vy: "3.4998e+4", m: "4.8690e+24", image: "venus.gif"},
    ]);
   });

   it('after 3 steps', () => { 
    for (let i = 0 ; i < 3; i++) {
      step(contextWrapper, deltaT);
    }
    expect(processBodies(config.bodies)).toEqual([
      {x: "1.4958e+11", y: "2.2349e+9", vx: "-4.4460e+2", vy: "2.9798e+4", m: "5.9740e+24", image: "earth.gif"},
      {x: "2.2789e+11", y: "1.8075e+9", vx: "-1.9158e+2", vy: "2.4099e+4", m: "6.4190e+23", image: "mars.gif"},
      {x: "5.7752e+10", y: "3.5905e+9", vx: "-2.9682e+3", vy: "4.7839e+4", m: "3.3020e+23", image: "mercury.gif"},
      {x: "1.9852e+2", y: "1.1280e+0", vx: "3.9705e-3", vy: "3.3841e-5", m: "1.9890e+30", image: "sun.gif"},
      {x: "1.0816e+11", y: "2.6248e+9", vx: "-8.4989e+2", vy: "3.4993e+4", m: "4.8690e+24", image: "venus.gif"},
    ]);
   });
});

describe('it should call contextWrapper correctly', () => {
  it('and set the scale', () => {
    step(contextWrapper, deltaT);
    expect(contextWrapper.scale).toBe(config.scale);
  });

  it('and clear the context before drawing', () => {
    jest.spyOn(contextWrapper, 'clear');
    step(contextWrapper, deltaT);
    expect(contextWrapper.clear.mock.calls.length).toBe(1);
  });

  it('and draw each body once', () => {
    jest.spyOn(contextWrapper, 'drawImage');
    step(contextWrapper, deltaT);
    expect(contextWrapper.drawImage.mock.calls.length).toBe(5);
  });
});

const createDummyCtx = () => {
  let c = {};
  c.canvas = {
    width: 500,
    height: 500,
  }
  c.drawImage = jest.fn();
  c.translate = jest.fn();
  c.clearRect = jest.fn();
  return c;
}

const processBodies = (bodies) => {
  let bodiesCopy = JSON.parse(JSON.stringify(config.bodies));
  bodiesCopy.forEach((body) => {
    body.x = Number.parseFloat(body.x).toExponential(4);
    body.y = Number.parseFloat(body.y).toExponential(4);
    body.vx = Number.parseFloat(body.vx).toExponential(4);
    body.vy = Number.parseFloat(body.vy).toExponential(4);
    body.m = Number.parseFloat(body.m).toExponential(4);
  })
  return bodiesCopy;
}