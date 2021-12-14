import React, { useState } from "react";
import "./Card.css";
import { Grid, CardActionArea, Card, Typography } from "@mui/material";

const FlashCard = ({ card }) => {
  const [cardSide, setCardSide] = useState("front");

  /**
   * Toogle the card
   */
  function toogleCard() {
    cardSide === "front" ? setCardSide("back") : setCardSide("front");
  }
  return (
    <CardActionArea onClick={toogleCard} sx={{width:"fit-content", height: "fit-content", margin:'auto'}}>
      <Card sx={{ maxWidth: "300px", padding: "20px" }}>
        {cardSide === "front" ? (
          <Typography variant="body1">{card.deu}</Typography>
        ) : (
          <Typography variant="body1">{card.eng}</Typography>
        )}
      </Card>
    </CardActionArea>
  );
};

export default FlashCard;
