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
  var $newObj = {};
  $newObj.title = document.forms[0].elements.title.value;
  $newObj.url = document.forms[0].elements.photo.value;
  $newObj.notes = document.forms[0].elements.notes.value;
  $newObj.entryId = data.nextEntryId;
  data.nextEntryId += 1;
  data.entries.unshift($newObj);
  var $image = document.querySelector('.image');
  $image.src = 'images/placeholder-image-square.jpg';
  $save.reset();
}
