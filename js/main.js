var $photoUrl = document.querySelector('.photo-url');
$photoUrl.addEventListener('input', renderUrl);
function renderUrl(e) {
  var $image = document.querySelector('.image');
  $image.src = e.target.value;
}

var $save = document.querySelector('form');
$save.addEventListener('submit', $submitInput);

function $submitInput(e) {
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
  $attachEntryDomTree.prepend(renderEntry($newObj));
  $viewSwap('entries');
  $toggleNoEntries();
}

function renderEntry(entry) {
  var $entryDomTree = document.createElement('li');
  $entryDomTree.setAttribute('class', 'entries');
  $entryDomTree.setAttribute('data-entry-id', '#');

  var $entryImage = document.createElement('img');
  $entryImage.setAttribute('src', entry.url);
  $entryImage.setAttribute('class', 'column-half');

  var $entryTitleAndNotesDiv = document.createElement('div');
  $entryTitleAndNotesDiv.setAttribute('class', 'title-and-notes');

  var $entryTitleDiv = document.createElement('div');

  var $entryTitle = document.createElement('h2');
  $entryTitle.setAttribute('class', 'entry-title');
  $entryTitle.textContent = entry.title;

  var $penIcon = document.createElement('i');
  $penIcon.setAttribute('class', 'fa-solid fa-pen');

  var $entryNotes = document.createElement('p');
  $entryNotes.setAttribute('class', 'entry-notes');
  $entryNotes.textContent = entry.notes;

  $entryDomTree.appendChild($entryImage);
  $entryDomTree.appendChild($entryTitleAndNotesDiv);
  $entryTitleAndNotesDiv.appendChild($entryTitleDiv);
  $entryTitleDiv.appendChild($entryTitle);
  $entryTitleDiv.appendChild($penIcon);
  $entryTitleAndNotesDiv.appendChild($entryNotes);

  return $entryDomTree;
}
// console.log(renderEntry(data.entries[0]));

var $attachEntryDomTree = document.querySelector('.ul-no-bullets');

document.addEventListener('DOMContentLoaded', $loopEntriesAndCreateDom);
function $loopEntriesAndCreateDom(e) {
  for (var i = 0; i < data.entries.length; i++) {
    var singleEntryTree = renderEntry(data.entries[i]);
    $attachEntryDomTree.appendChild(singleEntryTree);
  }
  $viewSwap(data.view);
  $toggleNoEntries();
}

$save.addEventListener('submit', $toggleNoEntries);
function $toggleNoEntries() {
  if (data.entries.length > 0) {
    document.querySelector('.no-entries').className =
      'hide no-entries';
  } else {
    document.querySelector('.no-entries').className =
      'show no-entries';
  }
}

function $viewSwap(viewName) {
  if (viewName === 'entries') {
    document.querySelector('.entries').className = 'entries';
    document.querySelector('.entry-form').className = 'entry-form hide';
    data.view = 'entries';
  } if (viewName === 'entry-form') {
    document.querySelector('.entries').className = 'entries hide';
    document.querySelector('.entry-form').className = 'entry-form';
    data.view = 'entry-form';
  }
}

var $entriesButton = document.querySelector('.nav-entries');
$entriesButton.addEventListener('click', $showEntries);
function $showEntries(e) {
  if (e.target === $entriesButton) {
    $viewSwap('entries');
  }
}

var $newButton = document.querySelector('.new-button');
$newButton.addEventListener('click', $showForm);
function $showForm(e) {
  if (e.target === $newButton) {
    $viewSwap('entry-form');
  }
}
