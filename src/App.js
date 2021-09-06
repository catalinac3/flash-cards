import "./App.css";
import React, { useState } from "react";
import Card from "./Card";
import Button from "./Button";

function App() {
  const cards = [
    { id: 1, deu: "der Motor spring an", eng: "the engine starts" },
    {
      id: 2,
      deu: "die Produktion dieses Artikels wurde um 10%, auf 60% erhöht",
      eng: "the production of this article was increased by 10% to 60%",
    },
    {
      id: 3,
      deu: "er ist durch das ganze Land getrampt",
      eng: "he hitchhiked all over the country",
    },
  ];

  const [currentCard, setNewCurrentCard] = useState(() => getRandomCard());

  function getRandomCard() {
    // return a number between 0 - array length
    const randomId = Math.floor(Math.random() * cards.length);
    return cards[randomId];
  }
  
  /**
   * updates the card, making sure that the last card is diferent to the new one.
   */
  function updateCard() {
    let update;
    do {
      update = getRandomCard();
    } while (update.deu == currentCard.deu);
    setNewCurrentCard(update);
  }

  return (
    <div className="App">
      <h1>Flash cards</h1>
      <Card deu={currentCard.deu} eng={currentCard.eng} />
      <Button updateCard={updateCard} />
    </div>
  );
}
export default App;
