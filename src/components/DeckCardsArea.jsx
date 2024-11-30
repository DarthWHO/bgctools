import DeckCard from "./DeckCard";

const DeckCardsArea = ({
  colour,
  decks,
  isOathsworn,
  executeFunction,
}) => {

  const getActiveCards = () => {
    return decks
      .filter(
        (deck) =>
          deck.deckColour === colour && deck.isOathsworn === isOathsworn
      )
      .flatMap((deck) => deck.deck)
      .filter((card) => card.isActive);
  };

  const activeCards = getActiveCards().sort(
    (a, b) => a.drawOrder - b.drawOrder
  );

  return (
    <>
      {activeCards.map((card) => (
        <DeckCard
          key={card.cardID}
          card={card}
          colour={colour.toLowerCase()}
          executeFunction={executeFunction}
        />
      ))}
    </>
  );
};

export default DeckCardsArea;
