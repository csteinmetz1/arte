const canvasSketch = require('canvas-sketch');

// Sketch parameters
const settings = {
  dimensions: [11, 6],
  pixelsPerInch: 300,
  units: 'in'
};

function randint(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function RGBToHex(r,g,b) {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
  
    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
  
    return "#" + r + g + b;
  }

function addNoise(context, points, x1, y1, x2, y2, colour){
  for (let i = 0; i < points; i++) {

    x1 += gaussianRand(mu=0, sigma=1);
    y2 += gaussianRand(mu=0, sigma=1);

    // core grain
    context.fillStyle = colour;
    context.beginPath();
    context.arc(x1, y2, Math.abs(gaussianRand(mu=0, sigma=0.01)), Math.PI * 1 * gaussianRand(), false);
    context.fill();
  };
}

function gaussianRand(mu=0.0, sigma=1.0) {
    // Box–Muller transform
    let u1 = Math.random();
    let u2 = Math.random();
	z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
	z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2 * Math.PI * u2);
	return z0 * sigma + mu;
}

const sketch = ({ context }) => {
  return props => {
    const {
      context, exporting, bleed,
      width, height,
      trimWidth, trimHeight
    } = props;

    // Clear canvas and fill with a color
    // All units are inches including 'width' and 'height'
    context.clearRect(0, 0, width, height);
    context.fillStyle = '#d9d9d9';
    context.fillRect(0, 0, width, height);

    console.log(width, height);

    // rgb(234,127,139)
    // rgb(35,46,141)

    var colours = [[35, 46, 141], [234, 127, 139]];
    var angles = [1.2, 0.8];

    const points = 2;
    for (let j = 0; j < colours.length; j++){
      for (let i = 0; i < points; i++) {

      x = ((i/points) * width) + (gaussianRand(mu=0, sigma=2)) 
      y = ((i/points) * height) + (gaussianRand(mu=0, sigma=2))

      if (x < 0.5) {
          x = 0.5 + Math.abs(gaussianRand(mu=1, sigma=2))
      }
      if (y < 0.5){
          y = 0.5 + Math.abs(gaussianRand(mu=1, sigma=2))
      }

      if (x > 10.5){
          x = 10.5 - Math.abs(gaussianRand(mu=1, sigma=2))
      }

      if (y > 5.5){
          y = 5.5 - Math.abs(gaussianRand(mu=1, sigma=2))
      }

      let colour = colours[j].slice();
      //console.log(colour)
      for (let c = 0;  c < colour.length; c++){
          if (Math.random() > 0.8) {
              rand = randint(10);
              if (Math.random() > 0.5){
                  rand *= -1
              }
              colour[c] += rand
          }
      }
      //console.log(colour)

      addNoise(context, 1000, x, x, y, y, colour);

      context.fillStyle = RGBToHex.apply(null, colour);
      context.beginPath()
      context.fillRect(x, x, y, y);
      };
    };
  };
};

canvasSketch(sketch, settings);
