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
  renderEntry();
}

// BEGIN ISSUE 2 user-can-view-their-entries
function renderEntry(entry) {
  var entryDomTree = document.createElement('li');
  entryDomTree.setAttribute('class', 'entries');
  // console.log(entryDomTree);

  var entryImage = document.createElement('img');
  entryImage.setAttribute('src', entry.url);
  // console.log(entryImage);

  var entryTitleAndNotesDiv = document.createElement('div');
  entryTitleAndNotesDiv.setAttribute('class', 'title-and-notes');
  // console.log(entryTitleAndNotesDiv);

  var entryTitle = document.createElement('h2');
  entryTitle.setAttribute('class', 'entry-title');
  entryTitle.textContent = entry.title;
  // console.log(entryTitle);

  var entryNotes = document.createElement('p');
  entryNotes.setAttribute('class', 'entry-notes');
  entryNotes.textContent = entry.notes;

  // console.log(entryNotes);

  entryDomTree.appendChild(entryImage);
  entryDomTree.appendChild(entryTitleAndNotesDiv);
  entryTitleAndNotesDiv.appendChild(entryTitle);
  entryTitleAndNotesDiv.appendChild(entryNotes);
  return entryDomTree;

}
// renderEntry(data.entries[0]);

var attachEntryDomTree = document.querySelector('.ul-no-bullets');

document.addEventListener('DOMContentLoaded', loopEntriesAndCreateDom);
function loopEntriesAndCreateDom(e) {
  for (var i = 0; i < data.entries.length; i++) {
    var singleEntryTree = renderEntry(data.entries[i]);
    attachEntryDomTree.appendChild(singleEntryTree);
  }
}
// console.log(renderEntry(entry));
