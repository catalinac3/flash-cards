import { getFirestore } from "firebase/firestore";
import * as data from "./data/data.json";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

// creation of the firestore database object
const db = getFirestore();

/**
 * ADDS data, from the data.json file
 * to the firebase Database.
 * If the document does not exist, it will be created.
 * If the document does exist, its contents will be overwritten
 * with the newly provided data,
 */
export function addToDB() {
  data.verbs.forEach(async (elem) => {
    try {
      await setDoc(doc(db, "verbs", elem.verb), {
        deu: elem.deu,
        eng: elem.eng,
        id: elem.id,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
    }
  });
}

/**
 * ADDS extra info to a specific document in the database
 */
export function addToDoc() {
  const verbRef = doc(db, "verbs", "anspringen");
  setDoc(verbRef, { fr: "le moteur démarre" }, { merge: true });
}

/**
 * READS data from DB at on-mounting
 * updates on data, only possible by refreshing the page
 * awaits starts the request
 * the asynchronous function is paused until the request completes
 * this function return a promise!!
 */
export async function getCards() {
  try {
    let cardsFromDB = [];
    const verbRef = collection(db, "verbs");
    console.log("verbRef", verbRef);
    const querySnapshot = await getDocs(verbRef);
    querySnapshot.forEach((doc) => {
      cardsFromDB.push(doc.data());
    });
    return cardsFromDB;
  } catch (e) {
    console.log("Error getting document:", e);
  }
}

/**
 * DELETES doc
 */
export async function deletesDocu() {
  await deleteDoc(doc(db, "verbs", "delete"));
}

/**
 * Perform a query
 */
export async function queryTrial() {
  let results = [];
  const verbRef = collection(db, "verbs");
  const q = query(verbRef, where("contains", "array-contains", "eng"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    results.push(doc.data());
    
  });
  console.log("result of the QUERY");
  console.log(results);
}

// HELPFULL RESOURCES
// About async and await:
//https://dmitripavlutin.com/javascript-fetch-async-await/
