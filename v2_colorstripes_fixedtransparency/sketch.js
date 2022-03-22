const Exgfactor = 10,
  transparency = 0.2;
let mySound;
const hues = [30, 120, 90, 60, 240, 210, 150, 300, 270, 330, 0, 180];
//notes from C0 to B0
const Notes = [
  16.35, 17.32, 18.35, 19.45, 20.6, 21.83, 23.12, 24.5, 25.96, 27.5, 29.14,
  30.87,
];
function preload() {
  soundFormats("mp3");
  mySound = loadSound("HMLTD02.mp3");
}

function setup() {
  colorMode(HSB, 360, 100, 100, 1);
  background(255);
  fft = new p5.FFT(0.6, 1024);
  let cnv = createCanvas(500, 500);
  cnv.mousePressed(canvasPressed);
}

function draw() {
  text("tap the canvas to play or pause", 10, 20);

  if (mySound.isPlaying()) {
    let notesEnergy = new Array(9);
    //initialize 9 octaves with 12 notes
    for (var i = 0; i < 9; i++) {
      notesEnergy[i] = new Array(12).fill(0);
    }

    //unfortunately,since the resolution is about 20 hz a bin, we can only differenciate notes higher than E4 in p5.js
    //collect all the notes's energy
    let spectrum = fft.analyze();
    let octaveBins = new Array(9);
    for (let i = 0; i < 9; i += 1) octaveBins[i] = 0;
    let octaveAve = new Array(9);
    let octaveDeviaF = new Array(9);
    let octaveBinsExg = new Array(9);
    for (let i = 0; i < 9; i += 1) octaveBinsExg[i] = 0;
    let totalSum = 0;
    for (let octave = 0; octave < 9; octave++) {
      for (let note = 0; note < 12; note++) {
        exp = 2 ** octave;
        notesEnergy[octave][note] = fft.getEnergy(exp * Notes[note]);
        octaveBins[octave] += notesEnergy[octave][note];
        octaveBinsExg[octave] += notesEnergy[octave][note] ** Exgfactor;
      }
      octaveAve[octave] = octaveBins[octave] / 12;
      let devia = 0;
      for (let note = 0; note < 12; note++) {
        devia += (notesEnergy[octave][note] - octaveAve[octave]) ** 2;
      }
      devia = Math.sqrt(devia / 12);
      octaveDeviaF[octave] = devia / octaveAve[octave];

      if (octave === 8) {
        octaveBins[octave] = octaveBins[octave] * 5;
      }
      if (octave <= 3) {
        octaveBins[octave] = octaveBins[octave] * 0.3;
      }
      totalSum += octaveBins[octave];
    }
    console.log(octaveDeviaF);

    //draw squares acoording to notes' energy
    noStroke();
    let y = height;
    for (let octave = 0; octave < 9; octave++) {
      let Brightness = 40 * octave + 80;
      // let Brightness=340*0.6**Math.abs(octave-8)+40;
      // let Saturation=90*0.8**Math.abs(octave-4)
      // let Saturation=h/height*180+40;
      let Saturation = 40 * octaveDeviaF[octave] + 40;

      let h = Math.floor((height * octaveBins[octave]) / totalSum);

      let x = 0;
      for (let note = 0; note < 12; note++) {
        let energy = notesEnergy[octave][note];
        fill(hues[note], Saturation, Brightness, transparency);
        let w = Math.floor(
          (energy ** Exgfactor / octaveBinsExg[octave]) * width
        );
        let solid_w = Math.floor((w / 3) * 2);
        rect(x, y, solid_w + 2, -h);
        let gradient_w = w - solid_w;
        if (gradient_w >= 1 && h >= 1) {
          let img = creatGradientRect(
            gradient_w,
            h,
            hues[note],
            hues[(note + 1) % 11],
            Brightness,
            Saturation,
            transparency
          );
          image(img, x + solid_w, y - h);
        }
        x += w;
      }
      y -= h;
    }
  }
}

//play or stop music when canvas is pressed
function canvasPressed() {
  if (!mySound.isPlaying()) {
    mySound.loop();
  } else {
    mySound.pause();
  }
}
