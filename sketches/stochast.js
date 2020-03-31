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

    const points = 30000;
    for (let i = 0; i < points; i++) {

      x = (gaussianRand() * 22) 
      y = (gaussianRand() * 7) 

      if (x > 10.5) {
          x = 10.5;
      }
      if (y > 5.0) {
        y = 5.0;
      }
      if (y < 1.0) {
        y = 1.0;
      }

      if (y > 2.5  && y < 3.5 && x > 1.8 && x < 9.2){
        if (Math.random() > 0.1){
          y = 0;
          x = 0;
        }
      }

      // core grain
      context.fillStyle = '#FFFFFF';
      context.beginPath();
      context.arc(x, y, 0.01 * gaussianRand(), Math.PI * 1 * gaussianRand(), false);
      context.fill();
    };

    for (let i = 0; i < points; i++) {

      x = (gaussianRand() * 22) - 10
      y = (gaussianRand() * 7) - 0.5

      if (x < 0.5) {
          x = 0.5;
      }
      if (y > 5.0) {
        y = 5.0;
      }
      if (y < 1.0) {
        y = 1.0;
      }

      if (y > 2.5  && y < 3.5 && x > 1.8 && x < 9.2){
        if (Math.random() > 0.1){
          y = 0;
          x = 0;
        }
      }

      // core grain
      context.fillStyle = '#FFFFFF';
      context.beginPath();
      context.arc(x, y, 0.01 * gaussianRand(), Math.PI * 1 * gaussianRand(), false);
      context.fill();
    };

    //context.beginPath();
    //context.lineTo(10.5, 0.5);
    //context.lineTo(10.5, 5.5);
    //context.lineWidth = 0.01;
    //context.strokeStyle = '#FFFFFF'
    //context.stroke();


    //context.beginPath();
    //context.lineTo(0.5, 0.5);
    //context.lineTo(0.5, 5.5);
    //context.lineWidth = 0.01;
    //context.strokeStyle = '#FFFFFF'
    //context.stroke();

  };
  
};

canvasSketch(sketch, settings);
