var $photoUrl = document.querySelector('.photo-url');
$photoUrl.addEventListener('input', doStuff);
function doStuff(e) {
  var image = document.querySelector('.image');
  image.src = e.target.value;
  // console.log(e.target.value);
}

// the next step is to get the url and set the src attribute to that photo.  how to do that?
// you need a method or something to get it
// then you the same to set it
// what is the method/methods for that?

// var $image = document.querySelector('.image');
// $image.HTMLImageElement.src = e.target.value

// var $photoUrl = document.querySelector('.photo-url');
// $photoUrl.addEventListener('input', doStuff);
// function doStuff(e) {
//   console.log(e.target);
//   console.log('one input stroke');

// }

// document.querySelector('button').addEventListener('click', logIt);
// function logIt(e) {
//   console.log('clicked');
// }
