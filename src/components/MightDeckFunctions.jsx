import { useState } from "react";
import MightDeckMain from "./MightDeckMain";
import { Button } from "@mui/material";

function MightDeckFunctions({ DECKS }) {
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

  function handleSwitchDeck() {
    setIsOathsworn(!isOathsworn);
  }

  const updateStatusMessage = (message) => {
    setHistoryMessages((prevMessages) => [...prevMessages, message]);
  };

  const getActiveCards = (deckColour, isOathsworn) => {
    console.log("here")
    return decks
      .filter(
        (deck) =>
          deck.deckColour === deckColour && deck.isOathsworn === isOathsworn
      )
      .flatMap((deck) => deck.deck)
      .filter((card) => card.isActive);
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
  const updateCardsToDeal = (colour, value) => {
    setCardsToDeal((prevState) => ({
      ...prevState,
      [colour]: value,
    }));
  };

  const functionRegistry = {
    updateCardsToDeal,
    handleDeal,
    getActiveCards,
    handleEndDraw,
    handleSelected,
    handleShuffle,
    handleSwitchDeck,
    countUndealtCards,
    updateStatusMessage,
    getRandomCard,
  };

  const handleDebug = (deckColour, cardID) => {
    const selectedDeck = decks.find((deck) => deck.deckColour === deckColour);
    const selectedCard = selectedDeck.deck.find(
      (card) => card.cardID === cardID
    );
    console.log(selectedCard.isSelected);
  };

  return (
    <>
      <Button onClick={() => handleDebug("White", "owhite1")}>Debug</Button>
      <MightDeckMain
        historyMessages={historyMessages}
        decks={decks}
        isOathsworn={isOathsworn}
        executeFunction={(name, ...args) => functionRegistry[name](...args)}
        cardsToDeal={cardsToDeal}
      />
    </>
  );
}

export default MightDeckFunctions;
