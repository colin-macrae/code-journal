/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

// CONVERT "DATA" TO STRING, PUT IN LOCAL STORAGE
// at beforeunload, this converts the data var to string, puts it in a var, and sends it to local storage and it will be there until it is cleared at some point
window.addEventListener('beforeunload', toJSON);
function toJSON(e) {
  var formEntriesToJson = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', formEntriesToJson);
}

// TAKE FROM LOCAL STORAGE, PARSE & REDECLARE "DATA"
// this then takes the stringified object from local storage and parses it and redeclares the data variable with the string in local storage (creating an object from the string)
if (localStorage.getItem('javascript-local-storage')) {
  var jsonFromStorage = localStorage.getItem('javascript-local-storage');
  data = JSON.parse(jsonFromStorage);
}

// 6:57AM 2/17/2023
