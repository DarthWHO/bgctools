import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Deck from "./Deck";
import GameSummary from "./GameSummary";
import Title from "./Title";
import { useState } from "react";

function MightDeckMain({ DECKS }) {
  const deckInitialize = DECKS;
  // const deckHistoryInitialize = [{"turn": 0, "deck": deckInitialize}];
  // const [deckHistory, setDeckHistory] = useState(deckHistoryInitialize);
  const [turnCount, setTurnCount] = useState(0);
  const [decks, setDecks] = useState(deckInitialize);
  const [historyMessages, setHistoryMessages] = useState([]);
  const [isOathsworn, setIsOathsworn] = useState(true);

  // const undoLast = () => {
  //   const previousDeck = deckHistory[turnCount - 1];
  //   setDecks(...previousDeck);
  // };

  const handleSwitchDeck = () => {
    setIsOathsworn(!isOathsworn);
  };

  const getRandomCard = (deckID) => {
    // const newDeckHistory = deckHistory.push({ turn: turnCount + 1, deck: decks });
    // setDeckHistory(newDeckHistory);
    setTurnCount(turnCount + 1);
    const currentDeck = decks.find((deck) => deck.deckID === deckID).deck;
    const currentColor = decks.find(
      (deck) => deck.deckID === deckID
    ).deckColour;
    const isOathsworn = decks.find(
      (deck) => deck.deckID === deckID
    ).isOathsworn;
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
    const newMessages = [
      ...historyMessages,
      `${turnCount + 1}: ${
        isOathsworn ? "Oathsworn" : "Enemy"
      } ${currentColor} -${returnedCard.isCrit ? " critical" : ""} ${
        returnedCard.description
      } for ${returnedCard.value}`,
    ];
    setHistoryMessages(newMessages);
    return returnedCard;
  };

  const getActiveCards = (deckColour, isOathsworn) => {
    return decks
      .filter(
        (deck) =>
          deck.deckColour === deckColour && deck.isOathsworn === isOathsworn
      )
      .flatMap((deck) => deck.deck)
      .filter((card) => card.isActive);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 1 }}>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 12 }}>
          <Title history={historyMessages} />
        </Grid>
        <Grid size={{ xs: 12, md: 12 }}>
          <GameSummary handleSwitchDeck={handleSwitchDeck} />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <Deck
            deck="White"
            dealCard={getRandomCard}
            getActiveCards={getActiveCards}
            isOathsworn={isOathsworn}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <Deck
            deck="Yellow"
            dealCard={getRandomCard}
            getActiveCards={getActiveCards}
            isOathsworn={isOathsworn}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <Deck
            deck="Red"
            dealCard={getRandomCard}
            getActiveCards={getActiveCards}
            isOathsworn={isOathsworn}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <Deck
            deck="Black"
            dealCard={getRandomCard}
            getActiveCards={getActiveCards}
            isOathsworn={isOathsworn}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default MightDeckMain;
