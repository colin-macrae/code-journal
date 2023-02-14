var $photoUrl = document.querySelector('.photo-url');
$photoUrl.addEventListener('input', renderUrl);
function renderUrl(e) {
  var $image = document.querySelector('.image');
  $image.src = e.target.value;
}

var $save = document.querySelector('form');
$save.addEventListener('submit', storeInput);

function storeInput(e) {
  e.preventDefault();
  // console.log(e.object);
  // console.log('submitted');
  // var $newObj = [
  //   {
  //     title: '',
  //     url: '',
  //     notes: '',
  //     entryId: 0
  //   }
  // ];
  // $newObj.url = $photoUrl.value;
}

// if the submit button is hit, at that moment take the values in the three input areas and save them to the object
// how do you get those values? it seems i need to querySelect all of them,

// if (e.target === save) {
//   var title = document.querySelector('.title');
//   title.addEventListener('submit', storeTitle);
// }
// function storeTitle(e) {
//   newObj.title += e.target.value;
// }

// save.addEventListener('click', function(e) {console.log('clicked')});

// var title = document.querySelector('.title');
// title.addEventListener('submit', storeTitle);
// function storeTitle(e) {
//   console.log('title submitted');
// }
// // newObj.title = e.target.value;

// the next step is to get the url and set the src attribute to that photo.  how to do that?
// you need a method or something to get it
// then you the same to set it
// what is the method/methods for that?

// var save = document.querySelector('.save-button');
// // save.addEventListener('click', function(e) {console.log('clicked')});
// save.addEventListener('submit', storeInput);
// function storeInput(e) {
//   e.preventDefault();
//   var title = document.querySelector('.title');
//   title.addEventListener('submit', storeTitle);
//   function storeTitle(e) {
//     console.log('title submitted');
//     // newObj.title += e.target.value;
//     // console.log(newObj);
//   }
//   // newObj.title = e.target.value;
// }

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
