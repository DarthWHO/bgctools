import DeckCard from "./DeckCard";

const DeckCardsArea = (deck, isOathsworn, executeFunction) => {
  // const activeCards = executeFunction("getActiveCards", deck, isOathsworn).sort(
  //   (a, b) => a.drawOrder - b.drawOrder
  // );

  return (
    <>
      {/* {activeCards.map((card) => (
        <DeckCard
          key={card.cardID}
          card={card}
          colour={deck.toLowerCase()}
          executeFunction={executeFunction}
        />
      ))} */}
    </>
  );
};

export default DeckCardsArea;
