/* exported data */

// /////////////this page runs before main.js (it is above it in the HTML)
var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};
// UPON PAGE UNLOAD, SEND ALL 'DATA' TO LOCAL STORAGE IN JSON FORMAT
// if this is not done, the data will be refreshed (lost!)
window.addEventListener('beforeunload', toJSON);
function toJSON(e) {
  var formEntriesToJson = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', formEntriesToJson);
}

// WHEN PAGE LOADS, IF ANYTHING IN LOCAL STORAGE, SEND IT ALL TO 'DATA'

if (localStorage.getItem('javascript-local-storage')) {
  var jsonFromStorage = localStorage.getItem('javascript-local-storage');
  data = JSON.parse(jsonFromStorage);
}
