const canvasSketch = require('canvas-sketch');

// Sketch parameters
const settings = {
  dimensions: 'a4',
  pixelsPerInch: 300,
  units: 'in'
};

function randint(max) {
  return Math.floor(Math.random() * Math.floor(max));
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
    context.fillStyle = '#eff3f4';
    context.fillRect(0, 0, width, height);

    // Make circles expand to edge of smallest trim (card) edge,
    // but with a 1/4" padding.
    const maxRadius = (Math.min(trimWidth, trimHeight) / 2) - (1 / 4);

    // Draw points
    const points = 200;
    for (let i = 1; i <= Math.floor(points/2); i++) {
      for (let j = 1; j <= Math.floor(points/2); j++) {
        const t = i / points;

        const cx = (i / width) + Math.random()/100;
        const cy = (j / height) + Math.random()/25;

        // Use a random foreground color for the points
        const strength = 25;
        const shift = 2;
        const r = 135 + (randint(strength) - Math.floor(strength/shift));
        const g = 206 + (randint(strength) - Math.floor(strength/shift));
        const b = 235 + (randint(strength) - Math.floor(strength/shift));

        const color = '#' + Number(r).toString(16) + Number(g).toString(16) + Number(b).toString(16)
        //console.log(Math.random()/2)
        context.fillStyle = color;

        const radius = 0.05 * Math.pow(t, 0.1);
        context.beginPath();
        context.arc(cx, cy, radius, 0, Math.PI * 2, false);
        context.fill();
      };
    };
  };
};

canvasSketch(sketch, settings);
