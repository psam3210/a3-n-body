import { distance, force } from './utils.js';

const config = {
  scale: 2.50e+11,
  bodies: [
    {x: 1.4960e+11, y: 0.0000e+00, vx: 0.0000e+00, vy: 2.9800e+04, m: 5.9740e+24, image: 'earth.gif'},
    {x: 2.2790e+11, y: 0.0000e+00, vx: 0.0000e+00, vy: 2.4100e+04, m: 6.4190e+23, image: 'mars.gif'},
    {x: 5.7900e+10, y: 0.0000e+00, vx: 0.0000e+00, vy: 4.7900e+04, m: 3.3020e+23, image: 'mercury.gif'},
    {x: 0.0000e+00, y: 0.0000e+00, vx: 0.0000e+00, vy: 0.0000e+00, m: 1.9890e+30, image: 'sun.gif'}, 
    {x: 1.0820e+11, y: 0.0000e+00, vx: 0.0000e+00, vy: 3.5000e+04, m: 4.8690e+24, image: 'venus.gif'}
  ]
}

// Your code here
const step = (contextWrapper, deltaT) => {
  
};

// End your code

export { step, config };