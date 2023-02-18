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
// PUTS SUBMITTED OBJECT AT BEGINNING OF ENTRIES ARRAY
// SETS IMAGE SRC BACK TO PLACEHOLDER IMAGE
// RESETS THE FORM
// ATTACHES/APPENDS THE RENDERED ENTRY (DOM) TO THE HTML
// SWAPS BACK TO ENTRIES VIEW
// DISPLAYS "ENTRIES"
// DONE
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
  $locationToAttachDom.prepend(renderEntry($newObj));
  $viewSwap('entries');
  $toggleNoEntries();
  if (data.editing === null) {
    // console.log('data editing is null');
  } else {
    $newObj.entryId = data.editing.entryId;
    // console.log('neew obj entry id:', $newObj.entryId, 'neew obj:',$newObj);
    $newObj.title = document.forms[0].elements.title.value;
    $newObj.url = document.forms[0].elements.photo.value;
    $newObj.notes = document.forms[0].elements.notes.value;
    // console.log('first data entry:', data.entries[1]);
    // console.log('new obj:', $newObj);


    // for (var i = 0; i < data.entries.length; i++) {
    //   if (data.entries[i] === $newObj.entryId) {
    //     data.entries[i] = $newObj;
    //   }
    // }

  }
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
// console.log(renderEntry(data.entries[0]));

// WHEN DOM FINISHES LOADING (OR REFRESHED), POPULATE TREES WITH ENTRIES IN STORAGE & ATTACH EACH TO DOM SO PAGE CAN RENDER
// this connects your actual entry to the web page using renderEntry and putting a data.entries[i] in it, then it connects it to the dom
// switch to view of data.view by grabbing the view from data.view
// renders "no entries submitted"
var $locationToAttachDom = document.querySelector('.ul-no-bullets');
document.addEventListener('DOMContentLoaded', $loopEntriesAndCreateDom);
function $loopEntriesAndCreateDom(e) {
  for (var i = 0; i < data.entries.length; i++) {
    var singleEntryTree = renderEntry(data.entries[i]);
    $locationToAttachDom.appendChild(singleEntryTree);
  }
  $viewSwap(data.view);
  $toggleNoEntries();
}

// HIDE "NO ENTRIES SUBMITTED" WHEN ITEM SUBMITTED
$save.addEventListener('submit', $toggleNoEntries);
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
    data.view = 'entries';
  } if (viewName === 'entry-form') {
    document.querySelector('.entries').className = 'entries hide';
    document.querySelector('.entry-form').className = 'entry-form';
    data.view = 'entry-form';
  }
}

// SWAP THE VIEW WHEN "ENTIRES" BUTTON PRESSED, USING VIEWSWAP
var $entriesButton = document.querySelector('.nav-entries');
$entriesButton.addEventListener('click', $showEntries);
function $showEntries(e) {
  if (e.target === $entriesButton) {
    $viewSwap('entries');
  }
}

// SWAP THE VIEW WHEN "NEW(ENTRY)" IS PRESSED, USING VIEWSWAP
var $newButton = document.querySelector('.new-button');
$newButton.addEventListener('click', $showForm);
function $showForm(e) {
  if (e.target === $newButton) {
    $viewSwap('entry-form');
  }
}

// 6:57 AM 2/17/2023

var $ul = document.querySelector('.ul-no-bullets');
$ul.addEventListener('click', $penButtonFunction);
function $penButtonFunction(e) {

  // when pen clicked, swap to form fiew
  if (e.target.tagName === 'I') {
    $viewSwap('entry-form');
  }

  // after swapping to form view, locate the data of that entry in entries array
  // after locating it, pop the whole object into data.editing
  var $pensClosestEntryId = e.target.closest('li').getAttribute('data-entry-id');
  for (var i = 0; i < data.entries.length; i++) {
    if ($pensClosestEntryId == data.entries[i].entryId) {
      data.editing = data.entries[i];
      // console.log(data.editing.title);
    }
  }
  var $titleInputField = document.querySelector('#title-id');
  $titleInputField.setAttribute('value', data.editing.title);

  var $urlInputField = document.querySelector('#photo-url-id');
  $urlInputField.setAttribute('value', data.editing.url);

  var $notesInputField = document.querySelector('.notes');
  $notesInputField.value = data.editing.notes;

  var $newEntryTitle = document.querySelector('#new-entry-edit-entry');
  $newEntryTitle.textContent = 'Edit Entry';
}

// var $titleInputField = document.querySelector('#title-id');
// console.log($titleInputField);
// $titleInputField.setAttribute('value', data.editing.title);
// //////////////// OLD FILE BELOW
// saved function with console logs
// var $ul = document.querySelector('.ul-no-bullets');
// $ul.addEventListener('click', $penButtonFunction);
// function $penButtonFunction(e) {
//   // console.log('event target:', e.target);
//   // console.log('event tagname:', e.target.tagName);
//   if (e.target.tagName === 'I') {
//     $viewSwap('entry-form');
//     // console.log('view was swapped');
//     // console.log('targets closest LI data-entry-id:', e.target.closest('li').getAttribute('data-entry-id'));
//   }
//   // console.log('data-entry-id value:', e.target.closest('li').getAttribute('data-entry-id'));
//   // console.log('event tagname:', e.target.closest('li'));
//   // console.log('event tagname:', e.target.object);
//   // console.log(data.entries[0].entryId);
//   // console.log(data.entries[0].entryId);

//   var $pensClosestEntryId = e.target.closest('li').getAttribute('data-entry-id');
//   // console.log('pens closest entryid:', $pensClosestEntryId);
//   // console.log('entry at 0 index:', data.entries[0].entryId);

//   // if ($pensClosestEntryId == data.entries[0].entryId) {
//   //   console.log('found a match!');
//   // } else console.log('nope');

//   for (var i = 0; i < data.entries.length; i++) {
//     if ($pensClosestEntryId == data.entries[i].entryId) {
//       // console.log('found a match!');
//       data.editing = data.entries[i];
//       // console.log(data.entries[i]);
//       // console.log(data.editing);
//     } else return;

//   }
//   // document.forms[0].elements.title.value = "HI";
//   // document.querySelector('#title-id').setAttribute('value') = data.editing.title;
//   // document.forms[0].elements.photo.value = data.editing.url;
//   // document.forms[0].elements.notes.value = data.editing.notes;

// }
// var $titleInputField = document.querySelector('#title-id');
// console.log($titleInputField);
// $titleInputField.setAttribute('value', data.editing.title);

// // entryId
// // var $titleInputField = document.querySelector('#title-id');
// // console.log($titleInputField);
// // $titleInputField.setAttribute('value', data.editing.title);

// // renderEntry(data.editing[0]);
