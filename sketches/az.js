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
    for (let i = 0; i <= Math.floor(points/2); i++) {
      for (let j = 0; j <= Math.floor(points/2); j++) {
        const t = (i+5) / (points * 2);

        let cx = ((i/Math.floor(points/2)) * (width-1))  + 0.5 + (Math.random()-0.5)/25;
        let cy = ((j/Math.floor(points/2)) * (height-1)) + 0.5 + (Math.random()-0.5)/8;

        console.log(cx, cy)
        
        // Use a random foreground color for the points
        const strength = 15;
        const shift = 100;
        const r = 135 + (randint(strength) - Math.floor(strength/shift));
        const g = 206 + (randint(strength) - Math.floor(strength/shift));
        const b = 240 + (randint(strength) - Math.floor(strength/shift));

        const color = '#' + Number(r).toString(16) + Number(g).toString(16) + Number(b).toString(16)
        console.log(r, g, b)
        context.fillStyle = color;

        const radius = 0.04 * Math.pow(t, 0.35);
        context.beginPath();
        context.arc(cx, cy, radius, 0, Math.PI * 2, false);
        context.fill();

        //break;

      };
    };
  };
};

canvasSketch(sketch, settings);
