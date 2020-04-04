const canvasSketch = require('canvas-sketch');

/**
 * Randomly shuffle an array
 * https://stackoverflow.com/a/2450976/1293256
 * @param  {Array} array The array to shuffle
 * @return {String}      The first item in the shuffled array
 */
var shuffle = function (array) {

	var currentIndex = array.length;
	var temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;

};

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

function addNoise(context, points, x, y, colour){
  for (let i = 0; i < points; i++) {

    x += gaussianRand(mu=0, sigma=1);
    y += gaussianRand(mu=0, sigma=1);

    // core grain
    context.fillStyle = colour;
    context.beginPath();
    context.arc(x, y, Math.abs(gaussianRand(mu=0.001, sigma=0.05)), Math.PI * 2, false);
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

    var points = [1.5, 2.5];
    points = shuffle(points);
    for (let i = 0; i < points.length; i++) {
      let shift = gaussianRand(mu=0.0, sigma=0.1);
      x = points[i] + shift;
      y = points[i] + shift;
      console.log(x,y);

      let colour = colours[i].slice();
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

      colour = RGBToHex.apply(null, colour);
      addNoise(context, 2000, x, y, colour);
      context.fillStyle = colour
      context.beginPath()
      context.fillRect(x, x, y, y);
    };
  };
};

canvasSketch(sketch, settings);
