import React, { useState, useEffect } from "react";
import { CardActionArea, Card, CardMedia, Typography } from "@mui/material";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { app } from "./configFirebase";

const storage = getStorage(app);

const FlashCard = ({ currentCard }) => {
  const [cardSide, setCardSide] = useState("front");
  const [imgUrl, setImgUrl] = useState(null);

  // everytime current card changes
  // front side of the card gets displayed
  useEffect(() => {
    setCardSide("front");
    // Get the download URL of the image
    if (currentCard.img) {
      const imgRef = ref(storage, currentCard.img);
      getDownloadURL(imgRef)
        .then((url) => {
          setImgUrl(url);
        })
        .catch((error) => {
          console.log(error);
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
        });
    } else {
      setImgUrl(null);
    }
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
          <>
            <Typography variant="body1">{currentCard.deu}</Typography>
            <CardMedia
              component="img"
              height="60px"
              image={imgUrl}
              alt="visual concept despcription"
            />
          </>
        ) : (
          <Typography variant="body1">{currentCard.eng}</Typography>
        )}
      </Card>
    </CardActionArea>
  );
};

export default FlashCard;
