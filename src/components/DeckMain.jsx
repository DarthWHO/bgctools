import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Deck from "./Deck";
import GameSummary from "./GameSummary";
import Title from "./Title";
import { useState } from "react";

function MightDeckMain({ DECKS }) {
  const deckInitialize = DECKS;
  const cardsToDealIntialize = { White: 0, Yellow: 0, Red: 0, Black: 0 };
  const [turnCount, setTurnCount] = useState(0);
  const [decks, setDecks] = useState(deckInitialize);
  const [historyMessages, setHistoryMessages] = useState([]);
  const [isOathsworn, setIsOathsworn] = useState(true);
  const [cardsToDeal, setCardsToDeal] = useState(cardsToDealIntialize);
  let currentReturnedCard;

  const updateTurnCount = () => {
    setTurnCount((prevTurnCount) => prevTurnCount + 1);
  };

  const updateStatusMessage = (message) => {
    setHistoryMessages((prevMessages) => [...prevMessages, message]);
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
              return { ...card, isActive: false };
            }
            return card;
          }),
        };
      })
    );
    updateStatusMessage(`${isOathsworn ? "Oathsworn" : "Enemy"} draw ended`);
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
              return {
                ...card,
                isDealt: false,
                isRedrawn: false,
                isCritMissNegated: false,
                isCritAlreadyDrawn: false,
              };
            }
            return card;
          }),
        };
      })
    );
    updateStatusMessage(
      `${isOathsworn ? "Oathsworn" : "Enemy"} ${deck} deck has been shuffled`
    );
  };

  const handleSelected = (cardID) => {
    setDecks((prevDecks) =>
      prevDecks.map((deck) => {
        return {
          ...deck,
          deck: deck.deck.map((card) => {
            if (card.cardID === cardID) {
              return { ...card, isSelected: !card.isSelected };
            }
            return card;
          }),
        };
      })
    );
  };

  const handleSwitchDeck = () => {
    setIsOathsworn(!isOathsworn);
  };

  const countUndealtCards = (deckColour) => {
    const filteredDeck = decks.find(
      (deck) =>
        deck.deckColour === deckColour && deck.isOathsworn === isOathsworn
    );
    if (!filteredDeck) {
      return 0;
    }
    const filteredCards = filteredDeck.deck.filter(
      (card) => card.isDealt === false
    );
    return filteredCards.length;
  };

  const updateCardsToDeal = (deck, value) => {
    setCardsToDeal((prevState) => ({
      ...prevState,
      [deck]: value,
    }));
  };

  const handleDeal = (deck, redrawn = false, critMissNegated = false) => {
    let localTurnCount = turnCount;

    let colours = [deck];
    if (deck === "all") {
      colours = ["White", "Yellow", "Red", "Black"];
    }

    for (const colour of colours) {
      const dealtCards = new Set();
      let remainingToBeDealt = countUndealtCards(deck);
      for (let index = 0; index < cardsToDeal[colour]; index++) {
        if (remainingToBeDealt === cardsToDeal[colour]) {
          handleShuffle(deck);
          remainingToBeDealt = 18;
        }

        localTurnCount += 1;
        updateTurnCount();
        currentReturnedCard = getRandomCard(
          colour,
          isOathsworn,
          dealtCards,
          redrawn,
          critMissNegated
        );

        updateStatusMessage(
          `${localTurnCount}: ${
            isOathsworn ? "Oathsworn" : "Enemy"
          } ${colour} -${currentReturnedCard.isCrit ? " critical" : ""} ${
            currentReturnedCard.description
          } for ${currentReturnedCard.value}`
        );
        remainingToBeDealt -= 1;
      }
      updateCardsToDeal(colour, 0);
    }
  };

  const getRandomCard = (
    deckColour,
    isOathsworn,
    dealtCards,
    redrawn,
    critMissNegated
  ) => {
    const currentDeck = decks.find(
      (deck) =>
        deck.deckColour === deckColour && deck.isOathsworn === isOathsworn
    ).deck;

    let notDealtCards = currentDeck.filter(
      (card) => !card.isDealt && !dealtCards.has(card)
    );

    if (notDealtCards.length === 0) {
      return;
    } else {
      const randomIndex = Math.floor(Math.random() * notDealtCards.length);
      const returnedCard = notDealtCards[randomIndex];

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
                      isRedrawn: redrawn,
                      isCritMissNegated: critMissNegated,
                      drawOrder: turnCount + 1,
                    }
                  : card
              ),
            };
          }
          return deck;
        })
      );
      dealtCards.add(returnedCard);
      return returnedCard;
    }
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

  // REFACTOR BELOW TO MINIMIZE CODE

  return (
    <Box sx={{ flexGrow: 1, p: 1 }}>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 12 }}>
          <Title history={historyMessages} isOathsworn={isOathsworn} />
        </Grid>
        <Grid size={{ xs: 12, md: 12 }}>
          <GameSummary
            decks={decks}
            handleSwitchDeck={handleSwitchDeck}
            handleEndDraw={handleEndDraw}
            handleDeal={handleDeal}
            cardsToDeal={cardsToDeal}
            isOathsworn={isOathsworn}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <Deck
            deck="White"
            decks={decks}
            deckCards={[
              decks.find(
                (deck) =>
                  deck.deckColour === "White" &&
                  deck.isOathsworn === isOathsworn
              ),
            ]}
            getActiveCards={getActiveCards}
            isOathsworn={isOathsworn}
            handleShuffle={handleShuffle}
            cardsToDeal={cardsToDeal}
            updateCardsToDeal={updateCardsToDeal}
            handleDeal={handleDeal}
            handleSelected={handleSelected}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <Deck
            deck="Yellow"
            decks={decks}
            deckCards={[
              decks.find(
                (deck) =>
                  deck.deckColour === "Yellow" &&
                  deck.isOathsworn === isOathsworn
              ),
            ]}
            getActiveCards={getActiveCards}
            isOathsworn={isOathsworn}
            handleShuffle={handleShuffle}
            cardsToDeal={cardsToDeal}
            updateCardsToDeal={updateCardsToDeal}
            handleDeal={handleDeal}
            handleSelected={handleSelected}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <Deck
            deck="Red"
            decks={decks}
            deckCards={[
              decks.find(
                (deck) =>
                  deck.deckColour === "Red" && deck.isOathsworn === isOathsworn
              ),
            ]}
            getActiveCards={getActiveCards}
            isOathsworn={isOathsworn}
            handleShuffle={handleShuffle}
            cardsToDeal={cardsToDeal}
            updateCardsToDeal={updateCardsToDeal}
            handleDeal={handleDeal}
            handleSelected={handleSelected}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <Deck
            deck="Black"
            decks={decks}
            deckCards={[
              decks.find(
                (deck) =>
                  deck.deckColour === "Black" &&
                  deck.isOathsworn === isOathsworn
              ),
            ]}
            getActiveCards={getActiveCards}
            isOathsworn={isOathsworn}
            handleShuffle={handleShuffle}
            cardsToDeal={cardsToDeal}
            updateCardsToDeal={updateCardsToDeal}
            handleDeal={handleDeal}
            handleSelected={handleSelected}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default MightDeckMain;
