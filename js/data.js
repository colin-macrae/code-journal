/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', toJSON);
function toJSON(e) {
  var formEntriesToJson = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', formEntriesToJson);
}

if (localStorage.getItem('javascript-local-storage')) {
  var jsonFromStorage = localStorage.getItem('javascript-local-storage');
  data = JSON.parse(jsonFromStorage);
}
// console.log(data.entries);
