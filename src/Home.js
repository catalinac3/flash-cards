import "./Home.css";
import React, { useState, useEffect } from "react";
import Card from "./Card";
import Button from "./Button";
// cloud Firestore
import { app } from "./configFirebase";
import { getFirestore } from "firebase/firestore";
import { collection, onSnapshot } from "firebase/firestore";
import { Navbar } from "./Navbar";
// creation of the firestore database object
const db = getFirestore();

function Home() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentCard, setCurrentCard] = useState(undefined);

  /**
   * reads data from DB, updates on data trigger changes on the cards
   * one time getting the data
   */
  function getCardsLisener() {
    let cardsFromDB = [];
    const verbRef = collection(db, "verbs");
    const unsub = onSnapshot(verbRef, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        cardsFromDB.push(doc.data());
      });
      setCards(cardsFromDB);
      setLoading(false);
    });
  }

  useEffect(() => {
    getCardsLisener();
  }, []);
  // useEffect is running everytime webpage gets load -- on-mount.

  useEffect(() => {
    console.log("only when setNewCard right!!!!");
    if (cards.length > 0) {
      updateCard();
    }
  }, [cards]);

  function getRandomCard() {
    // return a number between 0 - array length
    const randomId = Math.floor(Math.random() * cards.length);
    console.log("choosing a card:");
    console.log(cards[randomId]);
    return cards[randomId];
  }

  /**
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
        <img src="spinner.gif" alt="loading" width="50" />
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Flash cards</h1>
      <Card card={currentCard} />
      <Button updateCard={updateCard} />
    </div>
  );
}
export default Home;
