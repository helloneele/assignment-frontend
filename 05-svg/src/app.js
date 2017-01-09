import router from './router'
import homeTpl from './templates/home.hbs'
import simpleTpl from './templates/simple.hbs'
import styleTpl from './templates/style.hbs'
import animationTpl from './templates/animation.hbs'
import textTpl from './templates/text.hbs'
import interactionTpl from './templates/interaction.hbs'
import notFoundTpl from './templates/not-found.hbs'

const app = document.getElementById('app')

function index() {
  app.innerHTML = homeTpl()
}

function simple() {
  app.innerHTML = simpleTpl()
}

function style() {
  app.innerHTML = styleTpl()
}

function animation() {
  app.innerHTML = animationTpl()
}

function text() {
  app.innerHTML = textTpl()
}

function interaction() {
  app.innerHTML = interactionTpl()

  function SVGMenu( el, options ) {
    this.el = el;
    this.init();
  }

  SVGMenu.prototype.init = function() {
    this.trigger = this.el.querySelector('#hover');
    this.initEvents();
  };

  SVGMenu.prototype.initEvents = function() {
    this.trigger.addEventListener( 'mousedown', clicked );
    this.trigger.addEventListener( 'mouseup', clickedend );
  };

  if(document.getElementById( 'button' ) != null )
    new SVGMenu(document.getElementById( 'button' ));

    function clickedend(e) {
      this.removeEventListener('mousemove', drag )
    }

    let start;

  	function clicked(e) {
      var currentTransform = this.parentNode.getAttribute('transform');
      var regex  = /translate\(\s*([^\s,)]+)[ ,]([^\s,)]+)/.exec(currentTransform);
      var currentPositionX = regex[1];

      if(currentPositionX < 0){
        start = e.clientX;
        this.addEventListener('mousemove', drag);
      }
  	};

    function drag(e) {
      var currentTransform = this.parentNode.getAttribute('transform');
      var regex  = /translate\(\s*([^\s,)]+)[ ,]([^\s,)]+)/.exec(currentTransform);
      var currentPositionX = regex[1];

      let currentValue = parseInt(currentPositionX)
      let newValue = currentValue+(e.clientX - start)

      if(newValue > -285)
        this.parentNode.setAttribute("transform", 'translate('+newValue+',0)')

      start = e.clientX;

      if(newValue >= 0){
        this.removeEventListener('mousemove', drag )
        this.parentNode.setAttribute("transform", 'translate(0,0)')
        let commited = document.getElementById("commitedLabel");
        fadeIn(commited)
        setTimeout("alert(\"commited\")", 1000);
        setTimeout("location.reload()", 1000);
      }
    }

    function fadeIn(element) {
        var op = 0.1;  // initial opacity
        var timer = setInterval(function () {
            if (op >= 1){
                clearInterval(timer);
            }
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op += op * 0.1;
        }, 10);
    }




  }

function notFound() {
  app.innerHTML = notFoundTpl()
}
router('/', index)
router('/simple', simple)
router('/style', style)
router('/animation', animation)
router('/text', text)
router('/interaction', interaction)
router('*', notFound)
router()

console.log(document.getElementById( 'button' ));


//
// setInterval(checkCursor, 1000);
// function checkCursor(){
//     console.log("Cursor at: " + cursorX + ", " + cursorY);
// }
