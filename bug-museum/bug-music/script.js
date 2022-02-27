//this is legacy code from the original sequencer creator since he was using a Babel preprocessor https://codepen.io/markmurray/pen/NbdpMJ {
  "use strict";
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); }
  }
//}

var canvas = document.getElementById('canvas');
var pctx = canvas.getContext('2d'); //picture context
window.AudioContext = window.AudioContext || window.webkitAudioContext; 
var actx = new window.AudioContext();//audio context
var img = new Image();
var pixels = [];

//hue value to note bindings interpreted from pictures
var nextdrum = {
  23:"A4",56:"A#",84:"B4",111:"C5",175:"C#",211:"D5",241:"D#",258:"E#",273:"F5",304:"F4"
};
var chakra = {//max values for red,orange,yellow,green,blue,indigo,purple
  17:"C",42:"D",75:"E",145:"F",185:"G",265:"A",325:"B"
};
var scriabin = {//max values for red,orange,yellow,green,cyan,blue,purple,
  17:"C",42:"G",75:"D",145:"A",185:"E",200:"B",275:"F#",290:"C#"
};

photo.addEventListener('change',  onChange, false);

//when a picture is uploaded it trigers these functions
function onChange(event){
  var reader = new FileReader();
  reader.onload = function(event){
     draw(event.target.result);
  };
  reader.readAsDataURL(event.target.files[0]);     
}
function draw (imgURL) {
  img.crossOrigin="anonymous";
  img.src = imgURL;
  img.onload = function() {
      canvas.height = img.height/4;
      canvas.width = img.width/4;
      pixelate();
  };
}
function pixelate() //this is what initiates the rendering of sequencer
{
  canvas.height = 400;
  canvas.width = 400;
  var size = 0.02,
      w = canvas.width * size,
      h = canvas.height * size;
  pctx.save();
  pctx.scale(1, -1);
  pctx.drawImage(img, 0,h*-1, w, h);
  pctx.restore();
  pctx.mozImageSmoothingEnabled = false;
  pctx.imageSmoothingEnabled = false;
  pctx.drawImage(canvas, 0,0, w, h, 0, 0, canvas.width, canvas.height);
  var imageData = pctx.getImageData(0, 0, canvas.width, canvas.height);
  pixels = imageData.data;
  ReactDOM.render(React.createElement(Sequencer, null), document.getElementById('sequencer'));
  $(".trig").css("display", "block");
}

//this is legacy code from the original sequencer creator https://codepen.io/markmurray/pen/NbdpMJ
var NOTES = {

  "C0": 16.35, "C#0": 17.32, "D0": 18.35, "D#0": 19.45, "E0": 20.6, "F0": 21.83, "F#0": 23.12, "G0": 24.5, "G#0": 25.96, "A0": 27.5, "A#0": 29.14, "B0": 30.87, "C1": 32.7, "C#1": 34.65, "D1": 36.71, "D#1": 38.89, "E1": 41.2, "F1": 43.65, "F#1": 46.25, "G1": 49, "G#1": 51.91, "A1": 55, "A#1": 58.27, "B1": 61.74, "C2": 65.41, "C#2": 69.3, "D2": 73.42, "D#2": 77.78, "E2": 82.41, "F2": 87.31, "F#2": 92.5, "G2": 98, "G#2": 103.83, "A2": 110, "A#2": 116.54, "B2": 123.47, "C3": 130.81, "C#3": 138.59, "D3": 146.83, "D#3": 155.56, "E3": 164.81, "F3": 174.61, "F#3": 185, "G3": 196, "G#3": 207.65, "A3": 220, "A#3": 233.08, "B3": 246.94, "C4": 261.63, "C#4": 277.18, "D4": 293.66, "D#4": 311.13, "E4": 329.63, "F4": 349.23, "F#4": 369.99, "G4": 392, "G#4": 415.3, "A4": 440, "A#4": 466.16, "B4": 493.88, "C5": 523.25, "C#5": 554.37, "D5": 587.33, "D#5": 622.25, "E5": 659.26, "F5": 698.46, "F#5": 739.99, "G5": 783.99, "G#5": 830.61, "A5": 880, "A#5": 932.33, "B5": 987.77, "C6": 1046.5, "C#6": 1108.73, "D6": 1174.66, "D#6": 1244.51, "E6": 1318.51, "F6": 1396.91, "F#6": 1479.98, "G6": 1567.98, "G#6": 1661.22, "A6": 1760, "A#6": 1864.66, "B6": 1975.53, "C7": 2093, "C#7": 2217.46, "D7": 2349.32, "D#7": 2489.02, "E7": 2637.02, "F7": 2793.83, "F#7": 2959.96, "G7": 3135.96, "G#7": 3322.44, "A7": 3520, "A#7": 3729.31, "B7": 3951.07, "C8": 4186.01, "C#8": 4434.92, "D8": 4698.64, "D#8": 4978.03 
};

//this is legacy code as well but we changed it a bit to suit our needs
var Synth = function () {
  function Synth() {
    _classCallCheck(this, Synth);
    this.oscillators = [];
   }

  //determines which note to play and plays it
  Synth.prototype.playNotes = function playNotes() {
    var _this = this;

    var notes = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
    var wave = arguments.length <= 1 || arguments[1] === undefined ? 'sine' : arguments[1];//defaults to sine
    
    /* VCA */
    var vca = actx.createGain();
    vca.gain.value = 1;
    vca.connect(actx.destination);
    
    for(let i = 0; i < notes.length; i++) {
      var vco = actx.createOscillator();
      vco.type = wave;
      vco.frequency.value = notes[i];
      vco.connect(vca);
      vco.start(0);
      _this.oscillators.push(vco);
        setTimeout(function () {
        vca.gain.setTargetAtTime(0, actx.currentTime , 0.015);vco.stop(0);
      }, 50);
   }
  };

  return Synth;
}();

var synth = new Synth();

//this is legacy code as well but I've changed it a lot to suit our needs
var Sequencer = function (_React$Component) {
  _inherits(Sequencer, _React$Component);

  //initialiser, also contains the event triggers for when the value changes in the radio buttons
  function Sequencer(props) {
    _classCallCheck(this, Sequencer);

    var _this2 = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this2.state = {
      type: 'sine',
      pads: [],
      bpm: 200,
      step: 0,
      steps: 8,
      playing: false,
      style: 1
    };
    
    const styleChoice = document.querySelector('.radio-group');
    const changeStyle = (e) => {
      if (e.target && e.target.nodeName === "INPUT") {
        _this2.changeStyle(e.target.value);
      }
    }
    styleChoice.addEventListener('click', changeStyle);
    
    const waveChoice = document.querySelector('.radio-group2');
    const changeWave = (e) => {
      if (e.target && e.target.nodeName === "INPUT") {
        _this2.changeWaveType(e.target.value)
      }
    }
    waveChoice.addEventListener('click', changeWave);
    
    var speedSlider = $('.slider1 .range-slider__range'),
        speedValue = $('.slider1 .range-slider__value');
    speedSlider.on('input', function(){
      $(this).next(speedValue).html(this.value);
      _this2.changeSpeed(this.value);
    });
    
    return _this2;
  }

  Sequencer.prototype.componentWillMount = function componentWillMount() {
    var pads = [];
    for (var i = 0; i < this.state.steps; i++) {
      pads.push([1, 1, 1, 1, 1, 1, 1, 1]);
    }
    this.setState({
      pads: pads,
      notes: NOTES
    });
  };

  Sequencer.prototype.changeWaveType = function changeWaveType(type) {
    var _this3 = this;

    this.setState({
      type: type
    }, function () {
      _this3.pause();

      if (_this3.state.playing) _this3.play();
    });
  };

  Sequencer.prototype.changeStyle = function changeStyle(style) {
    var _this4 = this;
    
    this.setState({
      style: style
    }, function () {
      _this4.pause();

      if (_this4.state.playing) _this4.play();
    });
  };
  
  Sequencer.prototype.changeSpeed = function changeSpeed(bpm) {
    var _this4 = this;
    
    this.setState({
      bpm: bpm
    }, function () {
      _this4.pause();

      if (_this4.state.playing) _this4.play();
    });
  };
  
  Sequencer.prototype.play = function play() {
    var _this5 = this;

    var _state = this.state;
    var bpm = _state.bpm;
    var notes = _state.notes;
    var type = _state.type;
    var _style= _state.style;

    this.setState({
      playing: true
    });

    this.interval = setInterval(function () {

      if(_this5.state.step >= _this5.state.steps - 1){//fixes a bug where the audio context used more and more CPU
        actx.close();
        actx = new window.AudioContext();
      }

      _this5.setState({
        step: _this5.state.step < _this5.state.steps - 1 ? _this5.state.step + 1 : 0
      }, function () {

        var next = _this5.state.pads[_this5.state.step].map(function (pad, i) {
           if(pad === 1){
            var r =pixels[204*(8*50*i)+204*_this5.state.step],
                 g =pixels[204*(8*50*i)+204*_this5.state.step+1],
                 b =pixels[204*(8*50*i)+204*_this5.state.step+2],
                 a = pixels[204*(8*50*i)+204*_this5.state.step+3];
            return  hslToNote(rgbToHsl(r, g, b,a),_style);
           }
          return null;
        }).filter(function (x) {
          return x;
        });

        synth.playNotes(next, type.toLowerCase());
      });
    }, bpm);
  };

  Sequencer.prototype.pause = function pause() {
    this.setState({
      playing: false,
      step: 0
    });
    
    clearInterval(this.interval);
    actx.close();//fixes a bug where the audio context used more and more CPU
    actx = new window.AudioContext();
    
  };

  Sequencer.prototype.togglePad = function togglePad(group, pad) {

    var clonedPads = this.state.pads.slice(0);
    var padState = clonedPads[group][pad];

    clonedPads[group][pad] = padState === 1 ? 0 : 1;

    this.setState({
      pads: clonedPads
    });
  };

  Sequencer.prototype.render = function render() {
    var _this6 = this;
    var c =204;
    var _style= this.state.style;
    var _state2 = this.state;
    var pads = _state2.pads;
    var step = _state2.step;
    var notes = _state2.notes;

    return React.createElement(
      "div",
      { className: "container" },
      React.createElement(
        "div",
        { className: "Sequencer" },
        React.createElement(
          "div",
          { className: "Title" },
          "Buggy Art music"
          ),
        React.createElement(
          "div",
          { className: "flex" },
          pads.map(function (group, groupIndex) {
            return React.createElement(
              "div",
              { className: "pads" },
              group.map(function (pad, i) {
                var r =pixels[c*(8*50*i)+c*groupIndex],
                    g =pixels[c*(8*50*i)+c*groupIndex+1],
                    b =pixels[c*(8*50*i)+c*groupIndex+2],
                    a = pixels[c*(8*50*i)+c*groupIndex+3];
                return React.createElement("div", {
                  "data-note": hslToNote(rgbToHsl(r, g, b,a),_style),
                  note: hslToNote(rgbToHsl(r, g, b,a),_style),
                  style: { backgroundColor: "rgba("+r+","+g+","+b+","+a+")"},
                  onClick: function onClick() {
                    _this6.togglePad(groupIndex, i);
                  },
                  className: i+","+groupIndex+" pad " + (groupIndex === step ? 'active' : '') + " " + (pad === 0 ? 'off' : '')
                });
              })
            );
          })
        ),
        React.createElement(
          "div",
          { className: "buttons" },
          React.createElement(
            "button",
            {
              className: this.state.playing ? 'active' : '',
              onClick: function onClick() {
                if (_this6.state.playing) _this6.pause();else _this6.play();
              } },
            React.createElement(
              "i",
              {className: this.state.playing ? 'fa fa-stop' : 'fa fa-play'}
            ),
            this.state.playing ?" Stop":" Play"
          )
        )
      )
    );
  };

  return Sequencer;
}(React.Component);

//gets rgba values converts them to hsl because we need the hue for color binding notes
function rgbToHsl(r,g,b,a){
  if(a === 0) return [0,0,0];

  var r1 = r / 255;
  var g1 = g / 255;
  var b1 = b / 255;

  var maxColor = Math.max(r1,g1,b1);
  var minColor = Math.min(r1,g1,b1);
  //Calculate L:
  var L = (maxColor + minColor) / 2 ;
  var S = 0;
  var H = 0;
  if(maxColor != minColor){//Calculate S:
    if(L < 0.5){
      S = (maxColor - minColor) / (maxColor + minColor);
    }else{
      S = (maxColor - minColor) / (2.0 - maxColor - minColor);
    }
    //Calculate H:
    if(r1 == maxColor){
      H = (g1-b1) / (maxColor - minColor);
    }else if(g1 == maxColor){
      H = 2.0 + (b1 - r1) / (maxColor - minColor);
    }else{
      H = 4.0 + (r1 - g1) / (maxColor - minColor);
    }
  }
 
  L = L * 100;
  S = S * 100;
  H = H * 60;
  if(H<0){
    H += 360;
  }
  var result = [H, S, L];
  return result;
}

//this is where the magic happens; hsl values get turned to note frequency
function hslToNote (hsv,style) {//hsl = hue saturation lightness
  var black = [0,0,0];
  if( hsv.every(function(v,i) { return v === black[i]}))//if black return null we don't play a note if the pixel is black
  {return null;}
  
  var octave = "";// octave based on brightness
  hsv[2] = 100-hsv[2];//inverting; lower values are bright therefore high pitched
  switch(true) {
    case (hsv[2]<12):
      octave = "0";
      break;
    case (hsv[2]<24):
      octave = "1";
      break;
    case (hsv[2]<36):
      octave = "2";
      break;
    case (hsv[2]<48):
      octave = "3";
      break;
    case (hsv[2]<60):
      octave = "4";
      break;
    case (hsv[2]<72):
      octave = "5";
      break;
    case (hsv[2]<84):
      octave = "6";
      break;
    case (hsv[2]<101):
      octave = "7";
      break;
  }
  
  var note = "";//note based on hue
  var binding=[] ;
  switch(+style) {//determine which note to color binding will be used
    case 1:
      binding = chakra;
      break;
    case 2:
      binding = nextdrum;
      break;
    case 3:
      binding = scriabin;
      break;
  }
  for(var i = 0; i< Object.keys(binding).length;i++){
    if(hsv[0] < Object.keys(binding)[i]){
      note = binding[Object.keys(binding)[i]];
      break;
    }
  }

  //Nextdrum binding has octaves within it, the other 2 don't so we add them from the lightness value
  if(+style !== 2) note = note+octave; 
  
  return NOTES[note];//returns wave frequency of the note
}

//this is legacy code from the original sequencer creator since he was using Babel preprocessor https://codepen.io/markmurray/pen/NbdpMJ {
  function _possibleConstructorReturn(self, call) { 
    if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; 
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; 
  }
//}

