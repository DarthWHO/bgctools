import Grid from "@mui/material/Grid2";
import DeckMain from "./DeckMain";

const DecksArea = ({ decks, isOathsworn, executeFunction, cardsToDeal }) => {
  const colours = ["White", "Yellow", "Red", "Black"];
  return (
    <>
      {colours.map((colour) => (
        <Grid key={colour} size={{ xs: 12, md: 6, lg: 3 }}>
          <DeckMain
            decks={decks}
            isOathsworn={isOathsworn}
            executeFunction={executeFunction}
            deck={colour}
            cardsToDeal={cardsToDeal}
            deckCards={[
              decks.find(
                (deck) =>
                  deck.deckColour === colour && deck.isOathsworn === isOathsworn
              ),
            ]}
          />
        </Grid>
      ))}
    </>
  );
};

export default DecksArea;
