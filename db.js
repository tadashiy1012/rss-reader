const path = require('path');
const Datastore = require('nedb');
const filepath = path.join(__dirname, 'url.db');
const db = new Datastore({filename: filepath, autoload: true});
const KEY = {key: 'key'};
const init = () => {
  db.find(KEY, (err, docs) => {
    console.log(docs);
    console.log(docs.length);
    if (docs.length === 0) {
      db.insert({key: 'key', urls: []}, (err, newDocs) => {
        console.log(newDocs);
      });
    }
  });
};
init();
const load = () => {
  return new Promise((resolve, reject) => {
    db.find(KEY, (err, docs) => {
      if (err) { reject(err); }
      else {
        console.log(docs);
        resolve(docs[0].urls); 
      }
    });
  });
};
const save = (urls) => {
  return new Promise((resolve, reject) => {
    db.update(KEY, {key: 'key', urls}, {}, (err) => {
      if (err) { reject(err); }
      else { resolve(true); }
    });
  });
};
module.exports = {
  load: load,
  save: save
};