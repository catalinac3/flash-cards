import { getFirestore } from "firebase/firestore";
import * as data from "./data/data.json";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";

// creation of the firestore database object
const db = getFirestore();

/**
 * adds data, from the data.json file
 * to the firebase Database.
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
 * reads data from DB at on-mounting
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

// HELPFULL RESOURCES
// About async and await:
// https://dmitripavlutin.com/javascript-fetch-async-await/
