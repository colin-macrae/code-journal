// GET PASTED URL AND RENDER IT IMMEDIATELY
// this sets the image input into the url field as the image on the page by
// listening to its input
// grabbing the element by class name, and then
// setting the "src" (using .src) of that element to the inputted link
var $photoUrl = document.querySelector('.photo-url');
$photoUrl.addEventListener('input', renderUrl);
function renderUrl(e) {
  var $image = document.querySelector('.image');
  $image.src = e.target.value;
}

// TAKE ALL DATA SUBMITTED IN FORM AND MAKE AN OBJECT
// INCREMENT ENTRY ID
// PUT SUBMITTED OBJECT AT BEGINNING OF ENTRIES ARRAY
// SET IMAGE SRC BACK TO PLACEHOLDER IMAGE
// RESET THE FORM
// ATTACH/APPEND THE TREE TO THE DOM
// SWAP BACK TO ENTRIES VIEW
// DISPLAY "ENTRIES"
var $save = document.querySelector('form');
$save.addEventListener('submit', $submitInput);
function $submitInput(e) {
  e.preventDefault();
  var $newObj = {};
  if (data.editing === null) {
    $newObj.title = document.forms[0].elements.title.value;
    $newObj.url = document.forms[0].elements.photo.value;
    $newObj.notes = document.forms[0].elements.notes.value;
    $newObj.entryId = data.nextEntryId;
    data.nextEntryId += 1;
    data.entries.unshift($newObj);
    var $image = document.querySelector('.image');
    $image.src = 'images/placeholder-image-square.jpg';
    $save.reset();
    $locationToAttachDom.prepend(renderEntry($newObj));
  } else {
    $newObj.entryId = data.editing.entryId;
    $newObj.title = document.forms[0].elements.title.value;
    $newObj.url = document.forms[0].elements.photo.value;
    $newObj.notes = document.forms[0].elements.notes.value;
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === $newObj.entryId) {
        data.entries[i] = $newObj;
      }
    }
    var $allLiElmnts = document.querySelectorAll('li');
    for (var j = 0; j < $allLiElmnts.length; j++) {
      if (Number($allLiElmnts[j].getAttribute('data-entry-id')) === data.editing.entryId) {
        $allLiElmnts[j].replaceWith(renderEntry($newObj));
      }
    }
    var $newEntryTitle = document.querySelector('#new-entry-edit-entry');
    $newEntryTitle.textContent = 'New Entry';
    data.editing = null;
    $save.reset();
  }
  $viewSwap('entries');
  $toggleNoEntries();
}

// CREATE THE EMPTY TREE (WITH A PARAMETER) WITH ATTRIBURES & THEIR VALUE SOURCES
// create each element and put in a var
// set attributes of the var
// set value sources for images/text (the argument will provide values)
// append all elements to each other
// return the full, assembled, empty tree, ready to be filled (called)
function renderEntry(entry) {
  var $entryDomTree = document.createElement('li');
  $entryDomTree.setAttribute('class', 'entries');
  $entryDomTree.setAttribute('data-entry-id', entry.entryId);

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

// WHEN DOM FINISHES LOADING (OR REFRESHED), POPULATE TREES WITH ENTRIES IN STORAGE & ATTACH EACH TO DOM SO PAGE CAN RENDER
// this connects your actual entry to the web page using renderEntry and putting a data.entries[i] in it, then it connects it to the dom
// switch to view of data.view by grabbing the view from data.view
// renders "no entries submitted"

// select where u want to append the tree
var $locationToAttachDom = document.querySelector('.ul-no-bullets');
// listen for dom to finish loading
document.addEventListener('DOMContentLoaded', $loopEntriesAndCreateDom);
// after dom loads loop thru data.entries.  on each one, render it, then append it, then go to the next one
function $loopEntriesAndCreateDom(e) {
  for (var i = 0; i < data.entries.length; i++) {
    var singleEntryTree = renderEntry(data.entries[i]);
    $locationToAttachDom.appendChild(singleEntryTree);
  }
  $viewSwap(data.view);
  $toggleNoEntries();
}

// HIDE "NO ENTRIES SUBMITTED" WHEN ITEM SUBMITTED
function $toggleNoEntries() {
  if (data.entries.length > 0) {
    document.querySelector('.no-entries').className =
      'hide no-entries';
  } else {
    document.querySelector('.no-entries').className =
      'no-entries';
  }
}

// SWAP THE VIEW FROM ENTRIES TO ENTRY FORM (FUNCTION)
// this function is used in other places to switch the view according to certain conditions and tells data.view where we are (so other areas can know where we are by using data.view)
function $viewSwap(viewName) {
  if (viewName === 'entries') {
    document.querySelector('.entries').className = 'entries';
    document.querySelector('.entry-form').className = 'entry-form hide';
    document.querySelector('.entries-new-hide').className = 'entries-new';
    data.view = 'entries';
  } if (viewName === 'entry-form') {
    document.querySelector('.entries').className = 'entries hide';
    document.querySelector('.entry-form').className = 'entry-form';
    document.querySelector('.entries-new').className = 'entries-new-hide';
    data.view = 'entry-form';
  }
  $save.reset();
}

// SWAP THE VIEW WHEN "ENTIRES" BUTTON PRESSED, USING VIEWSWAP
var $entriesButton = document.querySelector('.nav-entries');
$entriesButton.addEventListener('click', $showEntries);
function $showEntries(e) {
  if (e.target === $entriesButton) {
    $viewSwap('entries');
    $save.reset();
    var $deleteButton = document.querySelector('.delete-button');
    $deleteButton.className = 'delete-button hide';
  }
}

// SWAP THE VIEW WHEN "NEW(ENTRY)" IS PRESSED, USING VIEWSWAP
var $newButton = document.querySelector('.new-button');
$newButton.addEventListener('click', $showForm);
function $showForm(e) {
  $save.reset();
  $viewSwap('entry-form');
  var $deleteButton = document.querySelector('.delete-button');
  $deleteButton.className = 'delete-button hide';
}

var $ul = document.querySelector('.ul-no-bullets');
$ul.addEventListener('click', $penButtonFunction);
function $penButtonFunction(e) {

  // when pen clicked, swap to form view
  if (e.target.tagName === 'I') {
    $viewSwap('entry-form');
    var $deleteButton = document.querySelector('.delete-button');
    $deleteButton.className = 'delete-button';
  }

  // after swapping to form view, locate the data of that entry in entries array
  // after locating it, pop the whole object into data.editing
  var $pensClosestEntryId = e.target.closest('li').getAttribute('data-entry-id');
  for (var i = 0; i < data.entries.length; i++) {
    if (Number($pensClosestEntryId) === data.entries[i].entryId) {
      data.editing = data.entries[i];
    }
  }
  var $titleInputField = document.querySelector('#title-id');
  $titleInputField.value = data.editing.title;

  var $urlInputField = document.querySelector('#photo-url-id');
  $urlInputField.value = data.editing.url;

  var $notesInputField = document.querySelector('.notes');
  $notesInputField.value = data.editing.notes;

  var $newEntryTitle = document.querySelector('#new-entry-edit-entry');
  $newEntryTitle.textContent = 'Edit Entry';

  // var $deleteEntryButton = document.querySelector('.delete-entry');
}

var $deleteBtn = document.querySelector('.delete-button');
var $popupModal = document.querySelector('.delete-entry-background');
$deleteBtn.addEventListener('click', $deleteEntryPopup);
function $deleteEntryPopup() {
  $popupModal.className = 'delete-entry-background';
}

var $cancelBtn = document.querySelector('.dlt-btn-cancel');
// var $popupModal = document.querySelector('.delete-entry-background');
$cancelBtn.addEventListener('click', $cancelDelete);
function $cancelDelete() {
  $popupModal.className = 'delete-entry-background hide';
}
