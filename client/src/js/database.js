import { openDB } from 'idb';

//Create the db
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

//Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) =>  {
  const jateDB = await openDB('jate', 1);
  const transaction = jateDB.transaction('jate', 'readwrite');
  const store = transaction.objectStore('jate');
  const request = store.put({id: 1, value: content });
  const result = await request;

  //Log the result to the console
  console.log("Data saved", result);
}

//Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const jateDB = await openDB('jate', 1);
  const transaction = jateDB.transaction('jate', 'readonly');
  const store = transaction.objectStore('jate');
  const request = store.get(1);
  const result = await request;

  result
    ? console.log('Data found', result.value)
    : console.log('No data in db');

};

initdb();
