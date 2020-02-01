const canvasSketch = require('canvas-sketch');

// Sketch parameters
const settings = {
  dimensions: [8.3, 9.3],
  pixelsPerInch: 300,
  units: 'in'
};

function randint(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function gaussianRand() {
    var rand = 0;
    for (var i = 0; i < 6; i += 1) {
      rand += Math.random();
    }
    return rand / 6;
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
    context.fillStyle = '#0C0C0C'; //eff3f4
    context.fillRect(0, 0, width, height);

    const centerX = 5;
    const centerY = 5;
    const radii   = [1.8, 3.0,  5.0, 8.0];
    const base    = 3000;

    for (let i = 0; i < radii.length; i++) {
      let points = Math.pow((i+1), 2.5) * base;
      for (let p = 0; p < points; p++) {

        r = radii[i] * (Math.sqrt(gaussianRand())-0.23);
        theta =  2.555 +  Math.random() * 4.07 +  2 * Math.PI;
    
        x = centerX + r * Math.cos(theta);
        y = centerY + r * Math.sin(theta);

        if (x < 0.5) {
          x = 0.5;
        }

        if (y < 0.5) {
          y = 0.5;
        }

        if (x > 7.8) {
          x = 7.8;
        }

        if (y > 10.5) {
          y = 10.5;
        }

        // core grain
        context.fillStyle = '#FFFFFF';
        context.beginPath();
        context.arc(x, y, 0.015 * gaussianRand(), Math.PI * 2 * gaussianRand(), false);
        context.fill();
      };
    };

    context.beginPath();
    context.lineTo(5, 5);
    context.lineTo(0.5, 8);
    context.lineWidth = 0.02;
    context.strokeStyle = '#FFFFFF'
    context.stroke();

    context.beginPath();
    context.lineTo(4.99, 5.0);
    context.lineTo(7.8, 6);
    context.lineWidth = 0.02;
    context.strokeStyle = '#FFFFFF'
    context.stroke();
    context.fill();

  };
};

canvasSketch(sketch, settings);
