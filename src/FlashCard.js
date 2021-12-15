import React, { useState, useEffect } from "react";
import { CardActionArea, Card, Typography } from "@mui/material";

const FlashCard = ({ currentCard }) => {
  const [cardSide, setCardSide] = useState("front");
  console.log(cardSide);

  // everytime current card changes
  // front side of the card gets displayed
  useEffect(() => {
    setCardSide("front");
  }, [currentCard]);

  /**
   * Toogle card side
   */
  function toogleCard() {
    cardSide === "front" ? setCardSide("back") : setCardSide("front");
  }
  return (
    <CardActionArea
      onClick={toogleCard}
      sx={{ width: "fit-content", height: "fit-content", margin: "20px auto" }}
    >
      <Card
        sx={{
          width: "300px",
          height: "100px",
          padding: "20px",
          background:
            cardSide === "front" ? "rgb(210, 227, 252, 0.5)" : "white",
        }}
      >
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
