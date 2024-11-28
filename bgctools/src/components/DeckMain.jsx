import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Deck from "./Deck";
import GameSummary from "./GameSummary";
import Title from "./Title";
import { useState } from "react";

function MightDeckMain({ DECKS }) {
  const deckInitialize = DECKS;
  const cardsToDealIntialize = { White: 0, Yellow: 0, Red: 0, Black: 0 };
  console.log(cardsToDealIntialize["White"]);
  const [turnCount, setTurnCount] = useState(0);
  const [decks, setDecks] = useState(deckInitialize);
  const [historyMessages, setHistoryMessages] = useState([]);
  const [isOathsworn, setIsOathsworn] = useState(true);
  const [cardsToDeal, setCardsToDeal] = useState(cardsToDealIntialize);

  const handleDeal = (deck) => {
    for (let index = 0; index < cardsToDeal[deck]; index++) {
      getRandomCard(deck, isOathsworn);
      

    }
    updateCardsToDeal(deck, 0);
  };

  const updateCardsToDeal = (deck, value) => {
    setCardsToDeal((prevState) => ({
      ...prevState,
      [deck]: value,
    }));
  };

  const handleSwitchDeck = () => {
    setIsOathsworn(!isOathsworn);
  };

  const handleEndDraw = () => {
    setDecks(
      decks.map((deckDetail) => {
        return {
          ...deckDetail,
          deck: deckDetail.deck.map((card) => {
            if (
              card.isActive === true &&
              deckDetail.isOathsworn === isOathsworn
            ) {
              // console.log(`Setting ${card.cardID} to inactive`);
              return { ...card, isActive: false };
            }
            return card;
          }),
        };
      })
    );
    setHistoryMessages((prevMessages) => [
      ...prevMessages,
      `${isOathsworn ? "Oathsworn" : "Enemy"} draw ended`,
    ]);
  };

  const handleShuffle = (deck) => {
    setDecks(
      decks.map((deckDetail) => {
        return {
          ...deckDetail,
          deck: deckDetail.deck.map((card) => {
            if (
              card.isActive === false &&
              card.isDealt === true &&
              deckDetail.deckColour === deck &&
              deckDetail.isOathsworn === isOathsworn
            ) {
              // console.log(`Setting ${card.cardID} to not dealt`);
              return { ...card, isDealt: false };
            }
            return card;
          }),
        };
      })
    );
    setHistoryMessages((prevMessages) => [
      ...prevMessages,
      `${deck} deck has been shuffled`,
    ]);
  };

  const getRandomCard = (deckColour, isOathsworn) => {
    // Update turn count using functional state update
    setTurnCount((prevTurnCount) => prevTurnCount + 1);

    const currentDeck = decks.find(
      (deck) =>
        deck.deckColour === deckColour && deck.isOathsworn === isOathsworn
    ).deck;

    const currentColor = decks.find(
      (deck) =>
        deck.deckColour === deckColour && deck.isOathsworn === isOathsworn
    ).deckColour;

    const isOath = decks.find(
      (deck) =>
        deck.deckColour === deckColour && deck.isOathsworn === isOathsworn
    ).isOathsworn;

    const notDealtCards = currentDeck.filter((card) => !card.isDealt);
    if (notDealtCards.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * notDealtCards.length);
    const returnedCard = notDealtCards[randomIndex];

    setHistoryMessages((prevMessages) => [
      ...prevMessages,
      `${isOath ? "Oathsworn" : "Enemy"} ${currentColor} -${
        returnedCard.isCrit ? " critical" : ""
      } ${returnedCard.description} for ${returnedCard.value}`,
    ]);

    setDecks((prevDecks) =>
      prevDecks.map((deck) => {
        if (
          deck.deckColour === deckColour &&
          deck.isOathsworn === isOathsworn
        ) {
          return {
            ...deck,
            deck: deck.deck.map((card) =>
              card === returnedCard
                ? {
                    ...card,
                    isDealt: true,
                    isActive: true,
                    drawOrder: turnCount + 1,
                  }
                : card
            ),
          };
        }
        return deck;
      })
    );

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
          <Title history={historyMessages} isOathsworn={isOathsworn} />
        </Grid>
        <Grid size={{ xs: 12, md: 12 }}>
          <GameSummary
            handleSwitchDeck={handleSwitchDeck}
            handleEndDraw={handleEndDraw}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <Deck
            deck="White"
            getActiveCards={getActiveCards}
            isOathsworn={isOathsworn}
            handleShuffle={handleShuffle}
            cardsToDeal={cardsToDeal}
            updateCardsToDeal={updateCardsToDeal}
            handleDeal={handleDeal}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <Deck
            deck="Yellow"
            getActiveCards={getActiveCards}
            isOathsworn={isOathsworn}
            handleShuffle={handleShuffle}
            cardsToDeal={cardsToDeal}
            updateCardsToDeal={updateCardsToDeal}
            handleDeal={handleDeal}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <Deck
            deck="Red"
            getActiveCards={getActiveCards}
            isOathsworn={isOathsworn}
            handleShuffle={handleShuffle}
            cardsToDeal={cardsToDeal}
            updateCardsToDeal={updateCardsToDeal}
            handleDeal={handleDeal}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <Deck
            deck="Black"
            getActiveCards={getActiveCards}
            isOathsworn={isOathsworn}
            handleShuffle={handleShuffle}
            cardsToDeal={cardsToDeal}
            updateCardsToDeal={updateCardsToDeal}
            handleDeal={handleDeal}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default MightDeckMain;
