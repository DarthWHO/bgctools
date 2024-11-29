import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid2";
import DeckCard from "./DeckCard";
import DeckSummary from "./DeckSummary";
import DeckDraw from "./DeckDraw";
// import { useState } from "react";

export default function Deck({
  deck,
  deckCards,
  getActiveCards,
  isOathsworn,
  handleShuffle,
  cardsToDeal,
  updateCardsToDeal,
  handleDeal,
  handleSelected
}) {
  const deckBackground = "rgb(255, 255, 255, 0.2)";

  const DisplayCards = () => {
    const activeCards = getActiveCards(deck, isOathsworn).sort(
      (a, b) => a.drawOrder - b.drawOrder
    );
    return (
      <>
        {activeCards.map((card) => (
          <DeckCard
            key={card.cardID}
            card={card}
            // cardID={card.cardID}
            // value={card.value}
            // isCrit={card.isCrit}
            // isSelected={card.isSelected}
            colour={deck.toLowerCase()}
            handleSelected={handleSelected}
          />
        ))}
      </>
    );
  };

  return (
    <Card sx={{ minHeight: 0, backgroundColor: "rgb(230, 240, 250)" }}>
      <Grid sx={{ backgroundColor: deckBackground }}>
        <Grid
          container
          spacing={1}
          sx={{ backgroundColor: "rgb(255, 255, 255)" }}
        >
          <Grid size={{ xs: 6, md: 6 }}>
            <DeckSummary deck={deck} deckCards={deckCards} />
          </Grid>
          <Grid size={{ xs: 6, md: 6 }}>
            <DeckDraw
              deck={deck}
              deckCards={deckCards}
              isOathsworn={isOathsworn}
              handleShuffle={handleShuffle}
              cardsToDeal={cardsToDeal}
              updateCardsToDeal={updateCardsToDeal}
              handleDeal={handleDeal}
            />
          </Grid>
        </Grid>

        <Grid container rowSpacing={1} columnSpacing={2} p={1} pb={0}>
          <DisplayCards />
        </Grid>
      </Grid>
      <CardActions></CardActions>
    </Card>
  );
}
