import React, { useState } from "react";
import "./Card.css";
import { CardActionArea, Card, Typography } from "@mui/material";

const FlashCard = ({ currentCard, show }) => {
  console.log("render flashcard");
  const [cardSide, setCardSide] = useState(show);
  console.log(cardSide);

  /**
   * Toogle the card
   */
  function toogleCard() {
    cardSide === "front" ? setCardSide("back") : setCardSide("front");
  }
  return (
    <CardActionArea
      onClick={toogleCard}
      sx={{ width: "fit-content", height: "fit-content", margin: "20px auto" }}
    >
      <Card sx={{ maxWidth: "300px", maxHeight: "200px", padding: "20px" }}>
        {cardSide === "front" ? (
          <Typography variant="body1">{currentCard.deu}</Typography>
        ) : (
          <Typography variant="body1">{currentCard.eng}</Typography>
        )}
      </Card>
    </CardActionArea>
  );
};

export default FlashCard;
