import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Deck from "./Deck";
import GameSummary from "./GameSummary";
import Title from "./Title";
import { useState, useEffect } from "react";

function MightDeckMain({ DECKS }) {
  const deckInitialize = DECKS;
  const deckHistoryInitialize = [{"turn": 0, "deck": deckInitialize}];
  const [turnCount, setTurnCount] = useState(0);
  const [deckHistory, setDeckHistory] = useState(deckHistoryInitialize);
  const [decks, setDecks] = useState(deckInitialize);

  const undoLast = () => {
    const previousDeck = deckHistory[turnCount - 1];
    setDecks(...previousDeck);
  };

  const getRandomCard = (deckID) => {
    const newDeckHistory = deckHistory.push({ turn: turnCount + 1, deck: decks });    
    setTurnCount(turnCount + 1);
    setDeckHistory(newDeckHistory);
    const currentDeck = decks.find((deck) => deck.deckID === deckID).deck;
    const currentColor = decks.find((deck) => deck.deckID === deckID).deckColour;
    const currentType = decks.find((deck) => deck.deckID === deckID).deckType;
    const notDealtCards = currentDeck.filter((card) => !card.isDealt);
    if (notDealtCards.length === 0) {
      return null;
    }
    const randomIndex = Math.floor(Math.random() * notDealtCards.length);
    const returnedCard = notDealtCards[randomIndex];
    setDecks(
      [...decks],
      (returnedCard.isDealt = true),
      (returnedCard.isActive = true)
    );

    console.log(
      `${turnCount + 1}: ${currentType} ${currentColor} - ${
        returnedCard.description
      } for ${returnedCard.value}`
    );

    // console.log(decks)
    // console.log(deckHistory)
    return returnedCard;
  };

  return (
    <Box sx={{ flexGrow: 1, p: 1 }}>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 12 }}>
          <Title />
        </Grid>
        <Grid size={{ xs: 12, md: 12 }}>
          <GameSummary />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <Deck deck="White" dealCard={getRandomCard} />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <Deck deck="Yellow" dealCard={getRandomCard} />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <Deck deck="Red" dealCard={getRandomCard} />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <Deck deck="Black" dealCard={getRandomCard} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default MightDeckMain;
