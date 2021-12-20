import React, { useState, useEffect } from "react";
import FlashCard from "./FlashCard";
import "./Home.css";
// cloud Firestore
import { app } from "./configFirebase";
import { getFirestore } from "firebase/firestore";

import { collection, onSnapshot } from "firebase/firestore";
import { Button, CircularProgress } from "@mui/material";


const db = getFirestore();
function Home() {
 
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentCard, setCurrentCard] = useState(undefined);

  /**
   * Cards content are retrieved from DB and set on cards state.
   * Once this function is called (when the page is loaded -- useEffect),
   * it listens to updates made on the retrieved documents. That means if the content
   * of a document is changed on the database, it will get that content,
   * making it available to the user on the website
   */
  function getCardsLisener() {
    // cards content is collected in cardsFromDB
    let cardsFromDB = [];
    const verbRef = collection(db, "verbs");
    // onSnapshot method listens to a document
    const unsubscribe = onSnapshot(verbRef, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        cardsFromDB.push(doc.data());
      });
      console.log("cards: ", cardsFromDB);
      setCards(cardsFromDB);
      setLoading(false);
    });
  }

  // Runs everytime that the webpage gets load.
  useEffect(() => {
    getCardsLisener();
  }, []);

  // Runs everytime cards is changed.
  // When the cards are uploaded, update card runs:
  // picking a card to diplay
  useEffect(() => {
    if (cards.length > 0) {
      updateCard();
    }
  }, [cards]);

  /**
   * Picks a random card to display
   */
  function getRandomCard() {
    // return a number between 0 - array length
    const randomId = Math.floor(Math.random() * cards.length);
    return cards[randomId];
  }

  /**
   * sets current card to be displayed.
   * updates the card, making sure that the last card
   * is diferent to the new one.
   */
  function updateCard() {
    let update;
    do {
      update = getRandomCard();
    } while (update.deu === currentCard?.deu);
    setCurrentCard(update);
  }

  if (loading || !currentCard) {
    return (
      <div className="App">
        <CircularProgress value={25} sx={{ marginTop: "70px" }} />
      </div>
    );
  }

  return (
    <div className="App">
      <h2>Flash cards</h2>
      <FlashCard currentCard={currentCard} show="front" />
      <Button
        variant="contained"
        onClick={updateCard}
        sx={{ textTransform: "none" }}
      >
        New Card
      </Button>
    </div>
  );
}
export default Home;

// import {
//   addToDB,
//   getCards,
//   addToDoc,
//   deletesDocu,
//   queryTrial,
// } from "./Utility";

//------- to use, when data needs to be added to the app ----
// useEffect(() => {
//   addToDB();
// }, []);
//------- end to use, when data needs to be added to the app ----

//------- to use, when data needs to be read it just at mounting the app ----
// useEffect(() => {
//   getCards().then((cardsFromDB) => {
//     setCards(cardsFromDB);
//     setLoading(false);
//   });
// }, []);
//------- end to use, when data needs to be read it just at mounting the app----

// function addExtraInfo() {
//   addToDoc();
// }

// function deleteDoc() {
//   deletesDocu();
// }

// function searchDocs() {
//   queryTrial();
// }

/* <div>
<Button click={addExtraInfo}> AddExtraInfo </Button>
</div> 
<div>
<Button click={deleteDoc}> Delete doc </Button>
</div> 
<div>
<Button click={searchDocs}> Search docs </Button>
</div> */
