var $egg = $('#egg-all');
var $eggy = $('#egg');
var $chicken = $('#chicken');
var $top = $('#top_part');
var $bottom = $('#bottom_part');
var $break = $('#break');
var $hint = $('.hint');
var $message = $('.message');

var SPACE_LIMIT = 100;

// Track if mouse or space is hit
var isAction = false;

// Track touch
var isTouching = false;

// Track crack progress when hiting the enter
var crackProgress = 0;

// Hide the crack
// TweenLite.set($break, {drawSVG:"0"})

// Detect space press
$(window).keydown(function (e) {
    
  e.preventDefault()

  if (e.key ==='a'||e.keyCode === 0 || e.keyCode === 32 && !isAction && crackProgress < 100) {
     breakEgg();
   }
}).keyup(function (e) {
    if (e.keyCode === 0 || e.keyCode === 32) {
      isAction = false;
    }
});

function shakeEgg(){
    breakEgg();
}

$egg.on('click', shakeEgg);


window.addEventListener('touchstart', function onFirstTouch() {
  breakEgg();
}, false);

function breakEgg() {

    if($break.css("visibility") === 'hidden'){
        shake($egg);
        $break.css("visibility", "visible");
        return;
    }

  

    
    dashAnimation($break, 100);
    shake($egg);
    isAction = true;
    animateChickenIntro();
    

}

// Function name -> ¯\_(ツ)_/¯
function animateChickenIntro() {
   
  $hint.fadeOut('slow');
  
  const t1 = new TimelineLite();
  var $nav = $('.navigation');
  
    t1.to($break, 0.1, { alpha: 0}, '-=0.3');
    t1.to($top, 0.4, { y: '-=60', rotationX: 15, ease: Back.easeOut.config(1.7)});
    t1.to($bottom, 0.4, {y: '+=60', rotationX: -15, ease: Back.easeOut.config(1.7)}, '-=0.4');
    t1.to($chicken, 0.3, { y: '-50', yoyo: true}, '-=0.4');
    t1.to($message, 0.4, { opacity: 1});
    t1.to($bottom, 0.6, {alpha: 0, delay: 0.5});
    t1.to($top, 0.6, { alpha: 0, delay: 0.5}, '-=0.8');
    t1.to($nav, 0.6, {scale: 1}, '-=1' );

    setTimeout(function(){
        $nav.css("z-index", "100");
    },700);


  t1.play();
}

// Shake path
function shake(path) {
  TweenMax.to(path, 0.1, {rotationX: 10, x: '1%', yoyo:true, repeat:5});
  TweenMax.to(path, 0.1, {rotationX: -10, x: '-1%', yoyo:true, repeat:5});
}

/*
* Animate path to provided value
* @param {number} offset
*/
function dashAnimation(path, value) {
  return 0;
}

/*
* Generate random number in range.
* @param {number} Min value
* @param {number} Max value
* @returns {number} 
*/
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

/*
* Hide hint
*/
function hideHint() {
  $hint.css({visibility: 'hidden'});
}


var checkbox = document.getElementById('menu-open');

var handler = document.getElementById('menu-open-handler');

// var toggleInterval = setInterval(function(){
//   checkbox.checked = !checkbox.checked;
// }, 2000);

// handler.onclick = function(){
//   clearInterval(toggleInterval);
// };





var egg_shaker_intro = setInterval(function(){
    shake($egg);
}, 1500);

setTimeout(function(){
    clearInterval(egg_shaker_intro);
}, 5000);