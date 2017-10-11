const dbName = 'editor-pages';

var objectStore, db;

var request = window.indexedDB.open(dbName, 3);

request.onerror = function (event) {
  alert("You must be using a browser which supports IndexedDB or allow access to IndexedDB to save pages.");
};
request.onsuccess = function (event) {
  db = event.target.result;
  console.log(event.target.result);
};

// This event is only implemented in recent browsers
request.onupgradeneeded = function (event) {
  db = event.target.result;

  // Create an objectStore for this database (destructive)
  // TODO: Implement a way to store the saved page data before upgrade.
  objectStore = db.createObjectStore("pageName", { keyPath: "pageData" });
};

function savePage(name, data) {
  this.pageName = name;
  this.pageData = data;

  var transaction = db.transaction(["pageName"], "readwrite");

  // Do something when all the data is added to the database.
  transaction.oncomplete = function (event) {
    console.log('Page Saved.');
  };

  transaction.onerror = function (event) {
    // Don't forget to handle errors!
    console.log('Aaaaw snap, page not saved.');
  };

  var pageData = [
    { pageName: this.pageName, pageData: this.pageData }
  ];

  console.log(pageData);

  var request = objectStore.add(pageData);

  request.onsuccess = function (event) {
    event.target.result == pageName;
  };
}
